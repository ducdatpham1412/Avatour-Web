import { TypeItemProject } from '@/api/interface/project';
import { useApi } from '@/hooks';

const useProjects = () => {
  const { data, loading, validating, mutate } = useApi<TypeItemProject[]>('/profile/projects');

  return [{ data, loading, validating }, { mutate }] as const;
};

export default useProjects;
