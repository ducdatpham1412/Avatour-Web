import { useApi } from '@/hooks';

const useProfile = (userId: number) => {
  const { data, loading, validating, mutate } = useApi<TypeProfile>(`/profile/${userId}`);

  return [{ data, loading, validating }, { mutate }] as const;
};

export default useProfile;
