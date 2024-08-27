import React from 'react';
import { ClassValue } from 'clsx';

import { cn } from '@/lib';

import { SuccessIcon } from './icon';
import { Button } from './ui';

interface Props {
  title: string;
  description: string;
  onOk?: () => void;
  className?: ClassValue;
}

const SuccessScreen = ({ title, description, onOk, className }: Props) => {
  return (
    <div className={cn('w-full inline-flex flex-col items-center', className)}>
      <SuccessIcon size={300} />
      <h1 className="text-[20px] font-medium">{title}</h1>
      <p className="text-center">{description}</p>
      <Button onClick={onOk} className="w-full md:w-[50%] lg:w-[30%] mt-8">
        Ok
      </Button>
    </div>
  );
};

export default SuccessScreen;
