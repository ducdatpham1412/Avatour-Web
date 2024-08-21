import { KeyedMutator } from 'swr';
import { useRouter } from 'next/navigation';

import { useAppContext } from '@/app/provider';
import { DialogAuth } from '@/components/dialogs';
import { toast } from '@/hooks';
import { logger, parseErrorMessage } from '@/lib';
import { TOUR_ROUTES } from '@/configs/routes';

import { useTours } from '../hooks';
import { ItemTour } from '../components';

interface Props {
  userId: number;
}

const mutateHook = async (
  mutateFunc: KeyedMutator<TypeTour[]>,
  tourId: string,
  isLiked: boolean,
) => {
  await mutateFunc(
    pre => {
      if (pre) {
        return pre.map(item => {
          if (item.id !== tourId) {
            return item;
          }

          return {
            ...item,
            is_liked: isLiked,
          };
        });
      }
    },
    { revalidate: false },
  );
};

const ToursHaveProfile = ({ userId }: Props) => {
  const router = useRouter();
  const [{ profile }] = useAppContext();

  const [{ data }, { likeTour, mutate }] = useTours(userId, 'of-location', { revalidateAll: true });

  const [, { mutate: mutateHome }] = useTours(undefined, 'home');
  const [, { mutate: mutateList }] = useTours(undefined, 'list');
  const [, { mutate: mutateFavorite }] = useTours(undefined, 'favorite');

  if (!data?.length) {
    return null;
  }

  const onLikeTour = async (tourId: string) => {
    if (!profile) {
      DialogAuth.open({
        mode: 'sign-in',
      });
      return;
    }
    try {
      const res = await likeTour(tourId);
      const isLiked = res.status === 'like';
      await mutateHook(mutate, tourId, isLiked);
      await mutateHook(mutateHome, tourId, isLiked);
      await mutateHook(mutateList, tourId, isLiked);
      mutateFavorite().catch(logger.log);
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  return (
    <div className="w-full inline-flex flex-wrap gap-8 mt-[24px]">
      {data.map(tour => {
        return (
          <ItemTour
            item={tour}
            key={tour.id}
            className="w-full md:w-[48%] lg:w-[32%] xl:w-[32%]"
            showAvatar
            onClick={() => router.push(TOUR_ROUTES.tourDetail(tour.id ?? ''))}
            onLike={() => onLikeTour(tour.id ?? '')}
          />
        );
      })}
    </div>
  );
};

export default ToursHaveProfile;
