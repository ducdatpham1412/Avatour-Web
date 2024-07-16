import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { SuccessIcon, TourLoadingIcon } from '@/components';
import { TOUR_ROUTES } from '@/configs/routes';
import { toast } from '@/hooks';
import { logger, parseErrorMessage } from '@/lib';

import { ItemTour } from '../components';
import { useTours } from '../hooks';

interface Props {
  userId: number;
}

const deletedTourIds: number[] = [];

const FavoriteTours = ({ userId }: Props) => {
  const router = useRouter();
  const [{ data, error, loading }, { mutate, likeTour }] = useTours(userId, 'favorite');

  useEffect(() => {
    return () => {
      if (deletedTourIds.length) {
        mutate(
          pre => {
            if (pre) {
              return pre.filter(item => !deletedTourIds.includes(item.id ?? 0));
            }
          },
          {
            revalidate: false,
          },
        )
          .then(() => {
            deletedTourIds.length = 0;
          })
          .catch(logger.log);
      }
    };
  }, [mutate]);

  if (loading) {
    return (
      <div className="flex justify-center mt-[100px]">
        <div className="w-[200px] h-[200px]">
          <TourLoadingIcon />
        </div>
      </div>
    );
  }

  if (error || !data?.length) {
    return <SuccessIcon size={350} className="mx-auto mt-[10vh] animate-zoom-out" />;
  }

  const onLikeTour = async (tourId: number) => {
    try {
      const res = await likeTour(tourId);
      if (res.status === 'like') {
        const index = deletedTourIds.indexOf(tourId);
        if (index >= 0) {
          deletedTourIds.splice(index, 1);
        }
      } else {
        const index = deletedTourIds.indexOf(tourId);
        if (index < 0) {
          deletedTourIds.push(tourId);
        }
      }
      await mutate(
        pre => {
          if (pre) {
            return pre.map(item => {
              if (item.id !== tourId) {
                return item;
              }

              return {
                ...item,
                is_liked: res.status === 'like',
              };
            });
          }
        },
        { revalidate: false },
      );
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  return (
    <>
      <div className="w-full inline-flex items-center justify-between mt-[20px]">
        <p className="text-[20px]">Tour yêu thích</p>
      </div>
      <div className="w-full flex flex-col flex-wrap md:flex-row justify-between gap-[24px] pb-[100px] mt-[16px]">
        {data.map(tour => {
          return (
            <ItemTour
              key={tour.id}
              item={tour}
              onClick={() => router.push(TOUR_ROUTES.tourDetail(tour.id))}
              onLike={() => onLikeTour(tour.id ?? 0)}
            />
          );
        })}
      </div>
    </>
  );
};

export default FavoriteTours;
