import { useRouter } from 'next/navigation';

import { useAppContext } from '@/app/provider';
import { DialogAuth } from '@/components/dialogs';
import { TOUR_ROUTES } from '@/configs/routes';
import { toast, useAllTours } from '@/hooks';
import { parseErrorMessage } from '@/lib';

import { ItemTour } from '../components';
import { useTours } from '../hooks';

interface Props {
  userId: number;
}

const ToursHaveProfile = ({ userId }: Props) => {
  const router = useRouter();
  const [{ profile }] = useAppContext();
  const { mutateLikeTour } = useAllTours();

  const [{ data }, { likeTour, mutate }] = useTours(userId, 'of-location', { revalidateAll: true });

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
      await mutate(
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
      await mutateLikeTour(tourId, isLiked);
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
