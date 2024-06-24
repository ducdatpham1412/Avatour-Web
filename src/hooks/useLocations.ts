import useApi from './useApi';

const useLocations = () => {
  const { data, loading, error, validating, mutate } = useApi<TypeProfile[]>('/admin/suppliers', {
    params: {
      at: 'location',
    },
  });

  return [{ data, loading, validating, error }, { mutate }] as const;
};

export default useLocations;
