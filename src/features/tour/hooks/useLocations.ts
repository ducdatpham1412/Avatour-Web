import { useApi } from '@/hooks';

const useLocations = () => {
  const { data, loading, validating, mutate } = useApi('/admin/suppliers', {
    params: {
      at: 'location',
    },
  });

  return [{ data, loading, validating }, { mutate }] as const;
};

export default useLocations;
