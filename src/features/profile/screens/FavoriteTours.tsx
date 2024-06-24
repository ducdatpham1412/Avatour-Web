import { SuccessIcon, TourLoadingIcon } from '@/components';

import { ItemTour } from '../components';
import { useTours } from '../hooks';

interface Props {
  userId: number;
}

const FavoriteTours = ({ userId }: Props) => {
  const [{ data, error, loading }] = useTours(userId, 'favorite');

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

  return (
    <div className="w-full flex flex-col flex-wrap md:flex-row justify-between gap-[24px] mt-0  pb-[100px]">
      {data.map(tour => {
        return <ItemTour key={tour.id} item={tour} />;
      })}
    </div>
  );
};

export default FavoriteTours;
