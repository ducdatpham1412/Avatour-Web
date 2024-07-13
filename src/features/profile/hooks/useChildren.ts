import { useApi } from '@/hooks';

const useChildren = (userId: number) => {
  const { data, loading, validating, mutate } = useApi<TypeProfile[]>('/profile/children', {
    params: {
      user_id: userId,
    },
    config: {
      authorize: false,
    },
  });

  return [{ data, loading, validating }, { mutate }] as const;
};

export default useChildren;
