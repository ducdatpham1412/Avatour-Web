import useSWRMutation from 'swr/mutation';

import { apiCreateTour, apiDeleteTour, apiEditTour, apiMakeTourBeMine } from '@/api/common';
import { apiLikeTour } from '@/api/profile';
import { useAppContext } from '@/app/provider';
import { useApi } from '@/hooks';
import { estTourPrice } from '@/lib';

export type CreateTourForm = {
  name: string;
  schedule: Array<TypeProfile[]>;
  description: string;
  type?: 'favorite';
  tourId?: string | null;
};

type Options = {
  revalidateAll?: boolean;
};

const handleTourForm = (arg: CreateTourForm) => {
  let duration = 0;
  arg.schedule.forEach(day => {
    day.forEach(loc => {
      duration += loc.info?.duration ?? 0;
    });
  });
  const cost = estTourPrice(arg.schedule);
  const schedule = arg.schedule.map(day => day.map(loc => loc.id));

  return {
    duration,
    cost,
    schedule,
  };
};

const useTours = (
  userId?: number,
  type: 'list' | 'favorite' | 'home' | 'of-location' = 'list',
  options?: Options,
) => {
  const [{ profile, initLoading }] = useAppContext();
  userId = userId ?? profile?.id;
  const shouldAuthorize = type === 'favorite';

  const { data, error, loading, mutate } = useApi<TypeTour[]>(
    (userId || !shouldAuthorize) && !initLoading ? '/common/tours' : null,
    {
      params: {
        type,
        user_id: userId,
      },
      config: {
        authorize: shouldAuthorize ? true : !!profile,
        revalidateAll: !!options?.revalidateAll,
      },
    },
  );

  const { trigger: createTour, isMutating: loadingCreateTour } = useSWRMutation(
    'api.createTour',
    async (_, { arg }: { arg: CreateTourForm }) => {
      const { duration, cost, schedule } = handleTourForm(arg);

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
    async (_, { arg: tourId }: { arg: string }) => {
      const res = await apiLikeTour(tourId);
      return res.data;
    },
  );

  const { trigger: editTour, isMutating: loadingEditTour } = useSWRMutation(
    'api.editTour',
    async (_, { arg }: { arg: { tourId: string; data: CreateTourForm } }) => {
      const { duration, cost, schedule } = handleTourForm(arg.data);

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

  const { trigger: makeTourBeMine, isMutating: loadingMakingTourBeMine } = useSWRMutation(
    'api.makeTourBeMine',
    async (_, { arg }: { arg: { tourId: string; data: CreateTourForm } }) => {
      const { duration, cost, schedule } = handleTourForm(arg.data);

      await apiMakeTourBeMine(arg.tourId, {
        name: arg.data.name,
        description: arg.data.description,
        duration,
        min_cost: cost.minCost,
        max_cost: cost.maxCost,
        schedule,
      });
    },
  );

  const { trigger: deleteTour, isMutating: loadingDeleteTour } = useSWRMutation(
    'api.deleteTour',
    async (_, { arg: tourId }: { arg: string }) => {
      await apiDeleteTour(tourId);
    },
  );

  return [
    {
      data,
      error,
      loading,
      loadingCreateTour,
      loadingLikeTour,
      loadingEditTour,
      loadingMakingTourBeMine,
      loadingDeleteTour,
    },
    { mutate, createTour, likeTour, editTour, makeTourBeMine, deleteTour },
  ] as const;
};

export default useTours;
