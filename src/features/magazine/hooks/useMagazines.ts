import useSWRMutation from 'swr/mutation';

import { useApi } from '@/hooks';
import { apiCreateMagazine, apiDeleteMagazine, apiEditMagazine } from '@/api/profile';

const useMagazines = () => {
  const { data, loading, mutate } = useApi<TypeMagazine[]>('/profile/magazines', {
    config: {
      authorize: false,
    },
  });

  const { trigger: create, isMutating: loadingCreate } = useSWRMutation(
    'api.createMagazine',
    async (
      _,
      {
        arg,
      }: { arg: Pick<TypeMagazine, 'title' | 'description' | 'keywords' | 'content' | 'buddies'> },
    ) => {
      const res = await apiCreateMagazine(arg);
      return res;
    },
  );

  const { trigger: edit, isMutating: loadingEdit } = useSWRMutation(
    'api.editMagazine',
    async (
      _,
      {
        arg,
      }: {
        arg: Pick<TypeMagazine, 'title' | 'description' | 'keywords' | 'content' | 'buddies'> & {
          magazineId: string;
        };
      },
    ) => {
      const { magazineId, ...rest } = arg;

      await apiEditMagazine(magazineId, rest);
    },
  );

  const { trigger: deleteMagazine, isMutating: loadingDelete } = useSWRMutation(
    'api.deleteMagazine',
    async (
      _,
      {
        arg,
      }: {
        arg: {
          magazineId: string;
        };
      },
    ) => {
      await apiDeleteMagazine(arg.magazineId);
    },
  );

  return [
    { data, loading, loadingCreate, loadingEdit, loadingDelete },
    { create, mutate, edit, deleteMagazine },
  ] as const;
};

export default useMagazines;
