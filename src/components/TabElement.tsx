import { ReactElement } from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from './ui';

interface TabElementProps {
  loading: boolean;
  children: ReactElement;
  className?: string;
}

const TabElement = ({ loading, children, className }: TabElementProps) => {
  if (loading) {
    return (
      <Skeleton
        className={cn('w-[30px] h-[30px] md:w-[100px] md:h-[20px] rounded-full', className)}
      />
    );
  }

  return children;
};

export default TabElement;
