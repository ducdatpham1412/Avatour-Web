import { useAppContext } from '@/app/provider';
import { useApi } from '@/hooks';

const useTour = (tourId: string | null) => {
  const [{ profile }] = useAppContext();

  const { data, loading, validating, error, mutate } = useApi<TypeTour>(
    tourId ? `/common/tours/${tourId}` : null,
    {
      config: {
        revalidateAll: true,
        authorize: !!profile,
      },
    },
  );

  return [{ data, loading, validating, error }, { mutate }] as const;
};

export default useTour;
