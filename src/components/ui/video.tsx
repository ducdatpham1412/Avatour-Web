'use client';
import { VideoIcon } from 'lucide-react';
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

import { loadUrl } from './image';
import { Show } from './show';
import { Skeleton } from './skeleton';

type VideoProps = React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

type VideoComponentProps = VideoProps & {
  src: string;
  defaultSrc?: string;
  videoClassName?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactElement | React.ReactElement[];
  fit?: CSSProperties['objectFit'];
};

const Video = memo(
  forwardRef((props: VideoComponentProps, imageRef: ForwardedRef<HTMLVideoElement>) => {
    const {
      src,
      defaultSrc,
      className,
      videoClassName,
      onClick,
      style,
      children,
      fit = 'cover',
      autoPlay = false,
      controls = true,
    } = props;

    const ref = useRef<HTMLVideoElement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
      setError(false);
      setLoading(true);
      if (ref.current) {
        loadUrl(ref.current, src)
          .catch(() => {
            setError(true);
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }, [src]);

    useImperativeHandle(imageRef, () => ref.current as HTMLVideoElement);

    return (
      <div
        className={cn('relative overflow-hidden bg-gray_100', className)}
        onClick={onClick}
        style={style}
      >
        <video
          ref={ref}
          src={src}
          className={cn(`w-full h-full`, videoClassName)}
          style={{ opacity: error ? 0 : 1, objectFit: fit }}
          controls={controls}
          autoPlay={autoPlay}
        />
        <Show.Const when={error}>
          {defaultSrc ? (
            <Video
              src={defaultSrc}
              className="absolute top-0 left-0 w-full h-full"
              videoClassName="w-full h-full"
            />
          ) : (
            <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center p-[20%] text-gray_500">
              <VideoIcon className="w-full h-full" />
            </div>
          )}
        </Show.Const>

        {/* TODO: Because function onload in ref of video take too many time => Temporary not show loading */}
        <Show.Const when={false}>
          <Skeleton className="absolute left-0 top-0 w-full h-full rounded-none" />
        </Show.Const>
        {children}
      </div>
    );
  }),
);

export default Video;
