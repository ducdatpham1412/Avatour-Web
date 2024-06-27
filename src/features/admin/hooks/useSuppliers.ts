import { useSearchParams } from 'next/navigation';

import { useAppContext } from '@/app/provider';
import { useApi } from '@/hooks';

type Params = {
  at?: string;
  dt?: string;
};

const useSuppliers = (params?: Params) => {
  const [{ profile }] = useAppContext();
  const query = useSearchParams();

  const { data, loading, validating, mutate } = useApi<TypeProfile[]>(
    profile ? '/admin/suppliers' : null,
    {
      params: params ?? {
        at: query.get('at'),
        dt: query.get('dt'),
      },
      config: {
        revalidateAll: true,
      },
    },
  );

  return [{ data, loading, validating }, { mutate }] as const;
};

export default useSuppliers;
