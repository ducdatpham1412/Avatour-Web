import { ClassValue } from 'clsx';

import { ButtonAbsolute } from '@/components';
import { Image } from '@/components/ui';
import { cn } from '@/lib';
import { formatTourDuration, formatTourName, formatTourPrice } from '@/lib/format';

interface Props {
  item: TypeTour;
  onClick?: () => void;
  onLike?: () => void;
  className?: ClassValue;
}

const ItemTour = ({ item, onClick, onLike, className }: Props) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className={cn(
        'w-full md:w-[48%] lg:w-full xl:w-[48%] hover:scale-[1.01] duration-500',
        className,
      )}
    >
      <div className="relative w-full">
        <Image
          src={item.schedule[0][0].avatar}
          className="w-full aspect-[306/204] rounded-[14px] hover:shadow-all"
        />
        <ButtonAbsolute isLiked={item.is_liked} onClick={onLike} />
      </div>
      <p className="text-[16px] mt-[8px] line-clamp-2 font-medium">{formatTourName(item)}</p>
      <p className="text-[14px]">
        <span className="text-p_700 ">{formatTourPrice(item.min_cost, item.max_cost)}</span>
        <span className="text-gray_400 ">・</span>
        <span className="text-gray_500 ">{formatTourDuration(item.schedule.length)}</span>
      </p>
    </div>
  );
};

export default ItemTour;
