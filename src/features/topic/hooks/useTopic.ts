import { Topic } from '@/api/interface/topic';
import { useApi } from '@/hooks';

const useTopic = (topicId: string) => {
  const { data, loading, mutate, error } = useApi<Topic>('/profile/topics', {
    params: {
      topic_id: topicId,
    },
  });

  return [{ data, loading, error }, { mutate }] as const;
};

export default useTopic;
