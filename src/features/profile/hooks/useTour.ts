import useSWRMutation from 'swr/mutation';

import { apiLikeTour } from '@/api/profile';
import { useApi } from '@/hooks';

const useTour = (tourId: string | null) => {
  const { data, loading, validating, error, mutate } = useApi<TypeTour>(
    tourId ? `/common/tours/${tourId}` : null,
    {
      config: {
        revalidateAll: true,
      },
    },
  );

  const { trigger: likeTour, isMutating: loadingLikeTour } = useSWRMutation(
    tourId ? 'api.likeATour' : null,
    async () => {
      const res = await apiLikeTour(tourId ?? '');
      return res.data;
    },
  );

  return [
    { data, loading, validating, error, loadingLikeTour },
    { mutate, likeTour },
  ] as const;
};

export default useTour;
