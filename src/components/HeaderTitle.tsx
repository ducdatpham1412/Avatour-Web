'use client';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/navigation';
import { ClassValue } from 'clsx';

import { useAppContext } from '@/app/provider';
import { cn } from '@/lib/utils';

import { ButtonBack } from './buttons';

interface Props {
  title: string;
  canGoBack?: boolean;
  titleClass?: ClassValue;
  RightComponent?: ReactElement;
}

const HeaderTitle = ({ title, canGoBack: canGoBackParams, titleClass, RightComponent }: Props) => {
  const router = useRouter();
  const [
    {
      router: { canGoBack },
    },
  ] = useAppContext();

  return (
    <div className="w-full inline-flex items-center gap-x-4 md:gap-y-6">
      {(canGoBackParams ?? canGoBack) && <ButtonBack onClick={() => router.back()} />}
      <h2 className={cn('flex-1 font-medium text-[30px]', titleClass)}>{title}</h2>
      {RightComponent}
    </div>
  );
};

export default HeaderTitle;
