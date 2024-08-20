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
}

const Carousel = <T extends any>({ className, data, renderItem }: Props<T>) => {
  return (
    <div className={cn('slide-container w-full', className)}>
      <Slide
        transitionDuration={450}
        indicators
        pauseOnHover
        prevArrow={
          <div
            className="rounded-full ml-[10px] p-2"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)' }}
          >
            <ArrowLeftIcon color="white" size={20} className="opacity-80" />
          </div>
        }
        nextArrow={
          <div
            className="rounded-full mr-[10px] p-2"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.20)' }}
          >
            <ArrowRightIcon color="white" size={20} className="opacity-80" />
          </div>
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
