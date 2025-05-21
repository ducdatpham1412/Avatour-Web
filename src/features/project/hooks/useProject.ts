import useSWRMutation from 'swr/mutation';

import { Project } from '@/api/interface/project';
import { useApi } from '@/hooks';
import { apiCreateTopic, CreateTopicBody } from '@/api/projects';

const useProject = (projectId: string) => {
  const { data, loading, validating, mutate, error } = useApi<Project>('/profile/projects', {
    params: {
      project_id: projectId,
    },
  });

  const { isMutating: loadingCreateTopic, trigger: createTopic } = useSWRMutation(
    'api.createTopic',
    async (_, { arg }: { arg: CreateTopicBody }) => {
      const res = await apiCreateTopic(arg);
      return res;
    },
  );

  return [
    { data, loading, validating, error, loadingCreateTopic },
    { mutate, createTopic },
  ] as const;
};

export default useProject;
