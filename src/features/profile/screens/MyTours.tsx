import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { TourLoadingIcon } from '@/components';
import { TOUR_ROUTES } from '@/configs/routes';

import { ItemTour } from '../components';
import { useTours } from '../hooks';

interface Props {
  userId: number;
}

const MyTours = ({ userId }: Props) => {
  const [{ data, error, loading }] = useTours(userId);

  const content = () => {
    if (!data || loading || error) {
      return (
        <div className="inline-flex w-full justify-center mt-[100px]">
          <div className="w-[200px] h-[200px]">
            <TourLoadingIcon />
          </div>
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
        <p>Tour của tôi</p>
        <Link
          className="w-[32px] h-[32px] bg-p_600 inline-flex items-center justify-center rounded-full"
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
