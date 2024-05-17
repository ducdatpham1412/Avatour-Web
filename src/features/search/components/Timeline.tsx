import { Image } from '@/components/ui';
import { cn } from '@/lib';
import dayjs from 'dayjs';
import { Fragment, memo, useEffect, useMemo, useState } from 'react';

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

const Timeline = memo(({ steps, className }: TimelineColumnProps) => {
  return (
    <div className={cn('flex flex-col gap-4 items-start', className)}>
      {steps.map((step, index) => (
        <div className="relative flex items-start gap-4" key={index}>
          <div className="flex flex-col h-full">
            <div className="relative -top-[4px] -left-[4px] z-10 p-[4px] bg-white rounded-full">
              <div className="flex items-center justify-center w-[30px] h-[30px] bg-gray_200 rounded-full">
                {index + 1}
              </div>
            </div>
            {index !== steps.length - 1 ? (
              <div className="absolute w-[2px] h-full top-[15px] left-[14px] bg-black"></div>
            ) : (
              <></>
            )}
          </div>
          <Image
            src={step.image}
            className="w-[48px] h-[48px] [&_>_img]:!object-cover rounded-[8px]"
          />
          <div className="flex flex-col gap-2 items-start">
            <h4 className="text-[16px]">{step.title}</h4>
            <div className="flex items-center gap-2 text-[14px] text-black/[0.4]">
              <span className="whitespace-nowrap">{step.description}</span>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" fill="#CECECE" />
              </svg>
              <span className="whitespace-nowrap">
                Trải nghiệm: {convertDuration(step.duration)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

function convertDuration(duration: number) {
  duration /= 1000;
  if (duration < 3600) {
    return `${Math.floor(duration / 60)}p`;
  }

  return `${Math.floor(duration / 3600)}h${Math.floor(duration / 60)}p`;
}

export default Timeline;
