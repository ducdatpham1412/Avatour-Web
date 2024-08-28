import { ClassValue } from 'clsx';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ReactElement } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import { cn } from '@/lib';

interface Props<T> {
  data: Array<T>;
  renderItem: (item: T) => ReactElement;
  className?: ClassValue;
  showIndicator?: boolean;
  showArrow?: boolean;
  duration?: number;
}

const Carousel = <T extends any>({
  className,
  data,
  renderItem,
  showIndicator = true,
  showArrow = true,
  duration = 2000,
}: Props<T>) => {
  return (
    <div className={cn('slide-container w-full', className)}>
      <Slide
        transitionDuration={450}
        indicators={showIndicator}
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
      >
        {data.map((d, index) => (
          <div key={index} className="w-full">
            {renderItem(d)}
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Carousel;
