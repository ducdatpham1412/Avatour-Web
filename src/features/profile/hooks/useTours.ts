import { useApi } from '@/hooks';

const useTours = (userId: number, type: 'list' | 'favorite' = 'list') => {
  const { data, error, loading, mutate } = useApi<TypeTour[]>('/common/tours', {
    params: {
      type,
      user_id: userId,
    },
  });

  return [{ data, error, loading }, { mutate }] as const;
};

export default useTours;
