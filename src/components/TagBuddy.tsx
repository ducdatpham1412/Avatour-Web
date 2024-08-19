import React from 'react';

import { cn } from '@/lib';

const TagBuddy = ({ className }: PropsWithClassName) => {
  return (
    <div
      className={cn('text-[12px] rounded-full bg-blue text-white px-[16px] py-[2px]', className)}
    >
      Buddy
    </div>
  );
};

export default TagBuddy;
