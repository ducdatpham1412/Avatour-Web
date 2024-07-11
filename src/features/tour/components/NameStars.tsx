import { ClassValue } from 'clsx';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { StarIcon } from '@/components/icon';
import { cn } from '@/lib';

interface Props {
  name: string;
  stars: number;
  ratings: number;
  className?: ClassValue;
  nameClassName?: ClassValue;
  href?: string;
}

const H2 = ({ children, className }: PropsWithClassName & PropsWithChildren) => {
  return <h2 className={className}>{children}</h2>;
};

const NameStars = ({ name, stars, className, nameClassName, href }: Props) => {
  const NameComp = href ? Link : H2;

  return (
    <div className={cn('flex flex-row items-center gap-x-2', className)}>
      <NameComp
        className={cn(
          'text-[16px] text-black leading-[24px] md:text-[18px] md:leading-[28px] font-medium text-left',
          href ? 'hover:underline' : '',
          nameClassName,
        )}
        href={href ?? ''}
        // target="_blank"
      >
        {name}
      </NameComp>
      <div className="hidden md:block w-[1px] h-7 bg-gray_300" />
      <StarIcon size={24} />
      <div className="text-[14px] text-black leading-[24px] font-light">{stars}</div>
      {/* <div className="text-black text-[14px] leading-[24px] font-light"> • </div>
      <div className="text-[14px] text-black leading-[24px] font-light underline">2k+ đánh giá</div> */}
    </div>
  );
};

export default NameStars;
