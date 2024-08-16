import { ClassValue } from 'clsx';

import { StarIcon } from '@/components/icon';
import { cn } from '@/lib';

interface Props {
  name: string;
  stars: number;
  ratings: number;
  className?: ClassValue;
  nameClassName?: ClassValue;
  onClickName?: () => void;
}

const NameStars = ({ name, stars, className, nameClassName, onClickName }: Props) => {
  return (
    <div className={cn('flex flex-row items-center gap-x-2', className)}>
      <h2
        className={cn(
          'text-[16px] text-black md:text-[18px] font-medium text-left',
          onClickName ? 'hover:underline' : '',
          nameClassName,
        )}
        role={onClickName ? 'button' : undefined}
        onClick={onClickName}
      >
        {name}
      </h2>
      <div className="hidden md:block w-[1px] h-7 bg-gray_300" />
      <StarIcon size={24} />
      <div className="text-[14px] text-black leading-[24px] font-light">{stars}</div>
      {/* <div className="text-black text-[14px] leading-[24px] font-light"> • </div>
      <div className="text-[14px] text-black leading-[24px] font-light underline">2k+ đánh giá</div> */}
    </div>
  );
};

export default NameStars;
