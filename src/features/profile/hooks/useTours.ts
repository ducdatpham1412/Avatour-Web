import useSWRMutation from 'swr/mutation';

import { apiCreateTour } from '@/api';
import { useAppContext } from '@/app/provider';
import { useApi } from '@/hooks';
import { estTourPrice } from '@/lib';

export type CreateTourForm = {
  name: string;
  schedule: Array<TypeProfile[]>;
  description: string;
};

const useTours = (userId?: number, type: 'list' | 'favorite' = 'list') => {
  const [{ profile }] = useAppContext();
  userId = userId ?? profile?.id;

  const { data, error, loading, mutate } = useApi<TypeTour[]>(userId ? '/common/tours' : null, {
    params: {
      type,
      user_id: userId,
    },
  });

  const { trigger: createTour, isMutating: loadingCreateTour } = useSWRMutation(
    'api.createTour',
    async (_, { arg }: { arg: CreateTourForm }) => {
      let duration = 0;
      arg.schedule.forEach(day => {
        day.forEach(loc => {
          duration += loc.info?.duration ?? 0;
        });
      });
      const cost = estTourPrice(arg.schedule);
      const resCreate = await apiCreateTour({
        name: arg.name,
        description: arg.description,
        duration,
        min_cost: cost.minCost,
        max_cost: cost.maxCost,
        schedule: arg.schedule.map(day => day.map(loc => loc.id)),
      });

      const res: TypeTour = {
        id: resCreate.data.id,
        name: arg.name,
        description: arg.description,
        duration,
        min_cost: cost.minCost,
        max_cost: cost.maxCost,
        schedule: arg.schedule,
      };

      return res;
    },
  );

  return [
    { data, error, loading, loadingCreateTour },
    { mutate, createTour },
  ] as const;
};

export default useTours;
