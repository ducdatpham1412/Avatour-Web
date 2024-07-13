/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import useSWR, { SWRConfiguration } from 'swr';

import { apiGetSWR } from '@/api';

interface TypeParamsApi<T> {
  params?: Record<string, any>;
  config?: SWRConfiguration<T> & {
    revalidateAll?: boolean;
    authorize?: boolean;
  };
}

export const defaultSWRConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
  revalidateIfStale: false,
};

const useApi = <T>(path: string | null | undefined, options?: TypeParamsApi<T>) => {
  const { config, params } = options ?? {};

  const moreConfig: SWRConfiguration = config?.revalidateAll
    ? { revalidateOnFocus: true, revalidateIfStale: true }
    : {};

  const { data, error, isLoading, isValidating, mutate } = useSWR<T, Error>(
    path ? [path, params, 'useApi'] : null,
    async ([_path, _params]) => {
      const res = await apiGetSWR<T>(_path as string, _params as typeof params, {
        authorize: config?.authorize ?? true,
        cache: 'no-store',
        next: {
          revalidate: 0,
        },
      });
      return res.data;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      ...config,
      ...moreConfig,
    },
  );

  return {
    data,
    error,
    loading: isLoading,
    mutate,
    validating: isValidating,
  };
};

export default useApi;
