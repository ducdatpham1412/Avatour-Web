import { memo } from 'react';

import { Image } from '@/components/ui';
import { cn } from '@/lib';

interface TimelineColumnProps {
  steps: {
    title: string;
    duration: number;
    description: string;
    image: string;
  }[];
  className?: string;
  timeFormat?: string;
}

const Timeline = memo(({ steps, className }: TimelineColumnProps) => (
  <div className={cn('flex flex-col gap-4 items-start', className)}>
    {steps.map((step, index) => (
      <div className="relative flex items-start gap-4 w-full" title={step.title} key={index}>
        <div className="flex-col h-full hidden md:flex">
          <div className="relative -top-[4px] -left-[4px] z-10 p-[4px] bg-white rounded-full">
            <div className="flex items-center justify-center w-[30px] h-[30px] bg-gray_200 text-[16px] font-normal rounded-full">
              {index + 1}
            </div>
          </div>
          {index !== steps.length - 1 ? (
            <div className="absolute w-[1px] h-full top-[15px] left-[14px] bg-gray_300"></div>
          ) : (
            <></>
          )}
        </div>

        <div className='flex gap-x-4 flex-1'>
          <Image
            src={step.image}
            className="w-[48px] h-[48px] [&_>_img]:!object-cover rounded-[8px]"
          />
          <div className="flex flex-col gap-2 items-start flex-1">
            <h4 className="text-[16px] leading-[24px] font-normal line-clamp-1">{step.title}</h4>
            <div className="flex flex-wrap items-center gap-2 text-[14px] text-black/[0.4]">
              <span className="whitespace-nowrap text-[14px] leading-[24px] font-normal text-gray_500">{step.description}</span>
              <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="4" fill="#CECECE" />
              </svg>
              <span className="whitespace-nowrap text-[14px] leading-[24px] font-normal text-gray_500">
                Trải nghiệm: {convertDuration(step.duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
));

function convertDuration(duration: number) {
  duration /= 1000;
  if (duration < 3600) {
    return `${Math.floor(duration / 60)}p`;
  }

  return `${Math.floor(duration / 3600)}h${Math.floor(duration / 60)}p`;
}

export default Timeline;
