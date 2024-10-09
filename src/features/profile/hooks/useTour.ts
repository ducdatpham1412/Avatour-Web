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

  return [{ data, loading, validating, error }, { mutate }] as const;
};

export default useTour;
