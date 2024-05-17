import { Image } from '@/components/ui';
import { cn, formatPrice } from '@/lib';
import { memo } from 'react';

type LocationTagProps = {
  isActive?: boolean;
  data: {
    id: string;
    image: string;
    title: string;
    tags: string[];
    details: string[];
    price: number;
    timeline: {
      title: string;
      tag: string;
      image: string;
      duration: number;
    }[][];
  };
  onHover?: (e: string) => void;
};

const LocationTag = memo(({ data, onHover, isActive }: LocationTagProps) => {
  return (
    <div
      className={cn(
        'flex p-[8px] rounded-2xl gap-6 overflow-hidden max-h-[250px]',
        isActive ? 'bg-[#F4F4F4]' : '',
      )}
      onMouseOver={() => onHover?.(data.id)}
    >
      <div className="w-1/2 rounded-xl overflow-hidden aspect-[3/2]">
        <Image src={data.image} className="h-full w-full [&_>_img]:!object-cover" />
      </div>
      <div className="flex flex-col justify-between py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-black/[0.36] text-[14px]">
            {data.tags.flatMap((tag, index) => {
              if (index % 2 == 1) {
                return [<span>|</span>, <span>{tag}</span>];
              }
              return <span>{tag}</span>;
            })}
          </div>
          <div className="text-[18px]">{data.title}</div>
        </div>
        <div className="flex flex-col" style={{ rowGap: '16px' }}>
          <div className="grid grid-cols-2 gap-4 text-black/[0.40]">
            {data.details.map((tag, index) => {
              if (index % 2 == 1) {
                return <span>{tag}</span>;
              }
              return <span>{tag}</span>;
            })}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[18px] text-primary">Khoảng {formatPrice(data.price)}</span>
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
              <circle cx="3" cy="3" r="3" fill="#CECECE" />
            </svg>

            <span className="text-[14px] text-black/[0.4]">2N1D</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export type { LocationTagProps };
export default LocationTag;
