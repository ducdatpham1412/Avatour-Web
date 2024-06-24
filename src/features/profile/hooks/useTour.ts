import { useApi } from '@/hooks';

const useTour = (tourId: number | null) => {
  const { data, loading, validating, error, mutate } = useApi<TypeTour>(
    tourId ? `/common/tours/${tourId}` : null,
  );

  return [{ data, loading, validating, error }, { mutate }] as const;
};

export default useTour;
