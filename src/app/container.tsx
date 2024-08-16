'use client';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, ReactElement } from 'react';
import { ClassValue } from 'clsx';

import { Navbar, Background, BackgroundSun } from '@/components';
import { ButtonBack } from '@/components/buttons';
import { cn } from '@/lib';

type Props = PropsWithChildren & {
  showHeader?: boolean;
  HeaderRight?: ReactElement;
  background?: 'mountain' | 'sun' | null;
  contentContainer?: ClassValue;
};

const Container = ({
  children,
  HeaderRight,
  showHeader = true,
  background = 'mountain',
  contentContainer,
}: Props) => {
  const router = useRouter();

  const renderBackground = () => {
    if (background === 'mountain') {
      return <Background />;
    }

    if (background === 'sun') {
      return <BackgroundSun />;
    }

    return null;
  };

  return (
    <div className="relative w-full h-full min-h-[100vh] bg-white">
      {renderBackground()}
      <Navbar />
      <div className={cn('relative container', contentContainer)}>
        {showHeader && (
          <div className="w-full inline-flex justify-between items-center mt-[20px]">
            {window.history.length > 1 ? (
              <ButtonBack className="self-start" onClick={() => router.back()} />
            ) : (
              <div />
            )}
            {HeaderRight ?? <div />}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default Container;
