import useSWRMutation from 'swr/mutation';

import { apiCreateTour, apiEditTour } from '@/api/common';
import { apiLikeTour } from '@/api/profile';
import { useAppContext } from '@/app/provider';
import { useApi } from '@/hooks';
import { estTourPrice } from '@/lib';

export type CreateTourForm = {
  name: string;
  schedule: Array<TypeProfile[]>;
  description: string;
  type?: 'favorite';
  tourId?: number | null;
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
      const schedule = arg.schedule.map(day => day.map(loc => loc.id));

      const resCreate = await apiCreateTour(
        {
          name: arg.name,
          description: arg.description,
          duration,
          min_cost: cost.minCost,
          max_cost: cost.maxCost,
          schedule,
        },
        arg.type
          ? {
              params: { type: 'favorite' },
            }
          : undefined,
      );

      const res: TypeTour = {
        id: resCreate.data.tour_id,
        name: arg.name,
        description: arg.description,
        duration,
        min_cost: cost.minCost,
        max_cost: cost.maxCost,
        schedule: arg.schedule,
        creator: null,
        creator_name: '',
        creator_avatar: '',
        total_reacts: 0,
        is_liked: arg.type === 'favorite' ? true : false,
      };

      return res;
    },
  );

  const { trigger: likeTour, isMutating: loadingLikeTour } = useSWRMutation(
    'api.likeTourInList',
    async (_, { arg: tourId }: { arg: number }) => {
      const res = await apiLikeTour(tourId);
      return res.data;
    },
  );

  const { trigger: editTour, isMutating: loadingEditTour } = useSWRMutation(
    'api.editTour',
    async (_, { arg }: { arg: { tourId: number; data: CreateTourForm } }) => {
      let duration = 0;
      arg.data.schedule.forEach(day => {
        day.forEach(loc => {
          duration += loc.info?.duration ?? 0;
        });
      });
      const cost = estTourPrice(arg.data.schedule);
      const schedule = arg.data.schedule.map(day => day.map(loc => loc.id));

      await apiEditTour(arg.tourId, {
        name: arg.data.name,
        description: arg.data.description,
        duration,
        min_cost: cost.minCost,
        max_cost: cost.maxCost,
        schedule,
      });
    },
  );

  return [
    { data, error, loading, loadingCreateTour, loadingLikeTour, loadingEditTour },
    { mutate, createTour, likeTour, editTour },
  ] as const;
};

export default useTours;
