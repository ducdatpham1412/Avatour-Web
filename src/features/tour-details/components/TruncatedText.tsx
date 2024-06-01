'use client';

import {
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

import { cn } from '@/lib';

import TourContentModal from './TourContentModal';

interface TruncatedTextProps extends HTMLAttributes<HTMLParagraphElement> {
  fullContentInModal?: boolean;
}

const TruncatedText = ({
  children,
  className,
  fullContentInModal = false,
  ...props
}: PropsWithChildren<TruncatedTextProps>) => {
  const ref = useRef<HTMLParagraphElement | null>(null);

  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = ref.current || {};

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, []);

  const toggleIsShowingMore = () => setIsShowingMore(prev => !prev);

  return (
    <div>
      <p
        {...props}
        ref={ref}
        className={cn(`break-words text-xl ${!isShowingMore && 'line-clamp-3'}`, className)}
      >
        {children}
      </p>

      {isTruncated && (
        <TourContentModal title="" content="">
          <span
            onClick={fullContentInModal ? undefined : toggleIsShowingMore}
            className="cursor-pointer font-normal underline"
          >
            {isShowingMore ? 'Rút gọn' : 'Xem thêm'}
          </span>
        </TourContentModal>
      )}
    </div>
  );
};

export default TruncatedText;
