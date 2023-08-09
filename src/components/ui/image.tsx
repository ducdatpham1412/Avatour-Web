'use client';
import {
  CSSProperties,
  ForwardedRef,
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { cn } from '@/lib';

import { Skeleton } from './skeleton';
import { Icon } from '../icon';
import { Show } from './show';

export type ImageProps = {
  src: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  children?: React.ReactElement | React.ReactElement[];
  fit?: CSSProperties['objectFit'];
};

const Image = memo(
  forwardRef((props: ImageProps, imageRef: ForwardedRef<HTMLDivElement>) => {
    const { src, className, onClick, style, children, fit = 'contain' } = props;
    const ref = useRef<HTMLImageElement | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    function loadUrl(element: HTMLImageElement, url: string) {
      return new Promise<void>((resolve, reject) => {
        element.onload = () => resolve();
        element.onerror = e => reject(e);
        element.src = url;
      });
    }

    useEffect(() => {
      setError(false);
      setLoading(true);
      if (ref.current) {
        loadUrl(ref.current, src)
          .then(() => setLoading(false))
          .catch(() => {
            setError(true);
            setLoading(false);
          });
      }
    }, [src]);

    useImperativeHandle(imageRef, () => ref.current as HTMLImageElement);

    return (
      <div
        className={cn('relative overflow-hidden bg-gray_100', className)}
        onClick={onClick}
        style={style}
      >
        <img
          ref={ref}
          className={`w-full h-full`}
          style={{ opacity: error ? 0 : 1, objectFit: fit }}
          alt="load failed"
        />
        <Show.Const when={error}>
          <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center p-[20%] text-gray_500">
            <Icon name="image" className="w-full h-full" />
          </div>
        </Show.Const>
        <Show.Const when={isLoading}>
          <Skeleton className="absolute left-0 top-0 w-full h-full rounded-none" />
        </Show.Const>
        {children}
      </div>
    );
  }),
);

// const Placeholder = styled('div', {
//   baseStyle: {
//     position: 'absolute',
//     left: 0,
//     top: 0,
//     width: '100%',
//     h: '100%',
//     background: '#F5F5F5',

//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '10%',
//     color: 'gray',
//   },
// });

Image.displayName = 'ImageLoader';

export { Image };
