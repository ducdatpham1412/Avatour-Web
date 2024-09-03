'use client';
import { ClassValue } from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { cn } from '@/lib';

interface Props<T> {
  data: Array<T>;
  renderItem: (item: T, index: number) => ReactElement;
  className?: ClassValue;
  showIndicator?: boolean;
  showArrow?: boolean;
  showTotalImages?: boolean;
  onClickTotalImages?: () => void;
  duration?: number;
}

const Carousel = <T extends any>({
  className,
  data,
  renderItem,
  showIndicator = true,
  showArrow = true,
  showTotalImages = false,
  onClickTotalImages,
  duration = 2000,
}: Props<T>) => {
  const [index, setIndex] = useState(0);

  return (
    <div className={cn('slide-container relative w-full', className)}>
      <Slide
        transitionDuration={450}
        // indicators={showIndicator}
        duration={duration}
        pauseOnHover
        prevArrow={
          showArrow ? (
            <div
              className="rounded-full ml-[10px] p-2"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)' }}
            >
              <ArrowLeftIcon color="white" size={20} className="opacity-80" />
            </div>
          ) : (
            <div />
          )
        }
        nextArrow={
          showArrow ? (
            <div
              className="rounded-full mr-[10px] p-2"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)' }}
            >
              <ArrowRightIcon color="white" size={20} className="opacity-80" />
            </div>
          ) : (
            <div />
          )
        }
        onChange={(_, to) => {
          setIndex(to);
        }}
      >
        {data.map((d, i) => (
          <div key={i} className="w-full">
            {renderItem(d, i)}
          </div>
        ))}
      </Slide>

      {showIndicator && (
        <div className="absolute bottom-[10px] inline-flex justify-center gap-1 left-0 right-0">
          {data.map((_, i) => {
            return (
              <div
                key={i}
                className="w-[7px] h-[7px] rounded-full"
                style={{ backgroundColor: i === index ? 'white' : 'rgba(255, 255, 255, 0.30)' }}
              />
            );
          })}
        </div>
      )}

      {showTotalImages && (
        <button
          className="px-[20px] py-[10px] absolute right-[10px] bottom-[10px] md:right-[20px] md:bottom-[20px] rounded-full hover-scale font-medium"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.80)' }}
          onClick={e => {
            e.stopPropagation();
            onClickTotalImages?.();
          }}
        >
          {data.length} ảnh
        </button>
      )}
    </div>
  );
};

export default Carousel;
