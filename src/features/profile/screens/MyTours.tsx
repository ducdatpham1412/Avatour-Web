import { PlusIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { SuccessIcon, TourLoadingIcon } from '@/components';
import { Button } from '@/components/ui';
import { TOUR_ROUTES } from '@/configs/routes';
import { toast, useAllTours } from '@/hooks';
import { parseErrorMessage } from '@/lib/utils';
import { useAppContext } from '@/app/provider';

import { ItemTour } from '../components';
import { useTours } from '../hooks';

interface Props {
  userId: number;
}

const MyTours = ({ userId }: Props) => {
  const router = useRouter();
  const [{ profile }] = useAppContext();
  const { mutateLikeTour } = useAllTours();
  const [{ data, error, loading }, { likeTour, mutate }] = useTours(userId, 'list');

  const isMyProfile = userId === profile?.id;

  const content = () => {
    if (loading) {
      return (
        <div className="inline-flex w-full justify-center mt-[100px]">
          <div className="w-[200px] h-[200px]">
            <TourLoadingIcon />
          </div>
        </div>
      );
    }

    if (error || !data?.length) {
      return (
        <div className="flex flex-1 flex-col items-center">
          <SuccessIcon size={350} className="animate-zoom-out" />
          {isMyProfile && (
            <>
              <p>Bạn chưa có tour nào</p>
              <p>Đi tới tạo tour của riêng mình nhé</p>
              <Button
                className="px-[70px] mt-[5vh]"
                onClick={() => router.push(TOUR_ROUTES.createTour)}
              >
                <p className="text-[14px] font-medium">Tạo tour của tôi</p>
              </Button>
            </>
          )}
        </div>
      );
    }

    const onLikeTour = async (tourId: string) => {
      try {
        const res = await likeTour(tourId);
        const isLiked = res.status === 'like';
        if (!isMyProfile) {
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
        }
        await mutateLikeTour(tourId, isLiked);
      } catch (err) {
        toast({
          variant: 'destructive',
          description: parseErrorMessage(err),
        });
      }
    };
    return (
      <>
        {data.map(tour => {
          return (
            <ItemTour
              key={tour.id}
              item={tour}
              onClick={() => router.push(TOUR_ROUTES.tourDetail(tour.id))}
              onLike={() => onLikeTour(tour.id ?? '')}
            />
          );
        })}
      </>
    );
  };

  return (
    <>
      {isMyProfile && (
        <div className="w-full inline-flex items-center justify-between mt-[20px]">
          <p className="text-[20px]">Tour của tôi</p>
          <Link
            className="w-[32px] h-[32px] bg-p_600 inline-flex items-center justify-center rounded-full hover-scale hover:scale-[1.1]"
            href={TOUR_ROUTES.createTour}
          >
            <PlusIcon size={20} />
          </Link>
        </div>
      )}

      <div className="w-full flex flex-col flex-wrap md:flex-row justify-between gap-[24px] pb-[100px] mt-[16px]">
        {content()}
      </div>
    </>
  );
};

export default MyTours;
