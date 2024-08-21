import { ClassValue } from 'clsx';

import { ButtonAbsolute } from '@/components';
import { Avatar, Image } from '@/components/ui';
import { cn } from '@/lib';
import { formatTourDuration, formatTourName, formatTourPrice } from '@/lib/format';

interface Props {
  item: TypeTour;
  onClick?: () => void;
  onLike?: () => void;
  className?: ClassValue;
  showAvatar?: boolean;
}

const ItemTour = ({ item, onClick, onLike, className, showAvatar = false }: Props) => {
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
        {!!item.creator && showAvatar && (
          <div
            className="absolute bottom-2 left-2 inline-flex items-center gap-[8px] backdrop-blur-[2px] rounded-full pl-[2px] pr-[12px] py-[2px] max-w-[70%]"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.70)' }}
          >
            <Avatar src={item.creator_avatar} size={30} />
            <p className="text-[12px] line-clamp-1">{item.creator_name}</p>
          </div>
        )}
      </div>

      <p className="text-[16px] line-clamp-2 font-medium mt-[8px]">{formatTourName(item)}</p>

      <p className="text-[14px]">
        <span className="text-p_700 ">{formatTourPrice(item.min_cost, item.max_cost)}</span>
        <span className="text-gray_400 ">・</span>
        <span className="text-gray_500 ">{formatTourDuration(item.schedule.length)}</span>
      </p>
    </div>
  );
};

export default ItemTour;
