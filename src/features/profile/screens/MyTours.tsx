import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { SuccessIcon, TourLoadingIcon } from '@/components';
import { Button } from '@/components/ui';
import { TOUR_ROUTES } from '@/configs/routes';

import { ItemTour } from '../components';
import { useTours } from '../hooks';

interface Props {
  userId: number;
}

const MyTours = ({ userId }: Props) => {
  const [{ data, error, loading }] = useTours(userId);

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

    if (!error || !data?.length) {
      return (
        <div className="flex flex-1 flex-col items-center">
          <SuccessIcon size={350} className="animate-zoom-out" />
          <p>Bạn chưa có tour nào</p>
          <p>Đi tới tạo tour của riêng mình nhé</p>
          <Button className="px-[70px] mt-[5vh]">
            <Link href={TOUR_ROUTES.createTour} className="text-[14px] font-medium">
              Tạo tour của tôi
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <>
        {data.map(tour => {
          return <ItemTour key={tour.id} item={tour} />;
        })}
      </>
    );
  };

  return (
    <>
      <div className="w-full inline-flex items-center justify-between mt-[20px]">
        <p className="text-[20px]">Tour của tôi</p>
        <Link
          className="w-[32px] h-[32px] bg-p_600 inline-flex items-center justify-center rounded-full scale-hover"
          href={TOUR_ROUTES.createTour}
        >
          <PlusIcon size={20} />
        </Link>
      </div>

      <div className="w-full flex flex-col flex-wrap md:flex-row justify-between gap-[24px] pb-[100px] mt-[16px]">
        {content()}
      </div>
    </>
  );
};

export default MyTours;
