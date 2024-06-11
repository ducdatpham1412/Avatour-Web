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
  headerTitle?: string;
}

const TruncatedText = ({
  children,
  className,
  fullContentInModal = false,
  headerTitle,
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
        <>
          {fullContentInModal ? (
            <TourContentModal
              title={headerTitle || ''}
              content={typeof children === 'string' ? children : ''}
            >
              <span className="cursor-pointer font-normal underline">
                {isShowingMore ? 'Rút gọn' : 'Xem thêm'}
              </span>
            </TourContentModal>
          ) : (
            <span onClick={toggleIsShowingMore} className="cursor-pointer font-normal underline">
              {isShowingMore ? 'Rút gọn' : 'Xem thêm'}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default TruncatedText;
