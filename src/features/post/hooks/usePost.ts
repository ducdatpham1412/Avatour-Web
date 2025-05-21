import useSWRMutation from 'swr/mutation';

import { TypeItemPost } from '@/api/interface/post';
import { useApi } from '@/hooks';

const usePost = (postId: string) => {
  const { data, loading, error, mutate } = useApi<TypeItemPost>('/profile/posts', {
    params: {
      post_id: postId,
    },
  });

  const { isMutating: loadingUpdate, trigger: updatePost } = useSWRMutation(
    'api.updatePost',
    async (_, { arg }: { arg: TypeItemPost }) => {
      await new Promise(resolve => {
        resolve(1);
      });
    },
  );

  const generateImage = async () => {
    await new Promise(resolve => {
      resolve(1);
    });
  };

  return [
    { data, loading, error, loadingUpdate },
    { mutate, updatePost, generateImage },
  ] as const;
};

export default usePost;
