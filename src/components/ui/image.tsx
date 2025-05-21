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

import { Icon } from '../icon';
import { Show } from './show';
import { Skeleton } from './skeleton';

export type ImageProps = {
  src: string;
  defaultSrc?: string;
  className?: string;
  imgClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  children?: React.ReactElement | React.ReactElement[];
  fit?: CSSProperties['objectFit'];
  onError?: () => void;
  onSuccess?: () => void;
};

export function loadUrl(element: HTMLImageElement | HTMLVideoElement, url: string) {
  return new Promise<void>((resolve, reject) => {
    element.onload = () => resolve();
    element.onerror = e => reject(e);
    element.src = url;
  });
}

const Image = memo(
  forwardRef((props: ImageProps, imageRef: ForwardedRef<HTMLDivElement>) => {
    const {
      src,
      defaultSrc,
      className,
      imgClassName,
      onClick,
      style,
      children,
      fit = 'cover',
      onError,
      onSuccess,
    } = props;
    const ref = useRef<HTMLImageElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      setError(false);
      setLoading(true);
      if (ref.current) {
        loadUrl(ref.current, src)
          .then(() => {
            setLoading(false);
            onSuccess?.();
          })
          .catch(() => {
            setError(true);
            setLoading(false);
            onError?.();
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
          className={cn(`w-full h-full`, imgClassName)}
          style={{ opacity: error ? 0 : 1, objectFit: fit }}
          alt="load failed"
        />
        <Show.Const when={error}>
          {defaultSrc ? (
            <Image
              src={defaultSrc}
              className="absolute top-0 left-0 w-full h-full"
              imgClassName="w-full h-full"
            />
          ) : (
            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center p-[20%] text-gray_500">
              <Icon name="image" className="w-full h-full" />
            </div>
          )}
        </Show.Const>
        <Show.Const when={loading}>
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
