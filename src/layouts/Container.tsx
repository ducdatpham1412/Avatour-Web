'use client';
import { ClassValue } from 'clsx';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import Metadata, { MetadataProps } from '@/app/metadata';
import { Auth, HeaderTitle } from '@/components';
import { cn } from '@/lib';
import { useAppContext } from '@/app/provider';

import ToolLeft from './ToolLeft';

type Props = PropsWithChildren & {
  headerTitle?: string;
  contentContainer?: ClassValue;
  metaData?: MetadataProps;
};

const Container = ({ children, headerTitle, contentContainer, metaData = {} }: Props) => {
  const [, { resetHistory }] = useAppContext();

  return (
    <>
      <Metadata {...metaData} />
      <div className="relative w-full h-full flex flex-row min-h-[100vh] bg-background px-0">
        <ToolLeft />

        <div className="relative px-10 gap-[100px] w-full bg-background flex flex-row">
          <div className="sticky top-3 h-[50px]">
            <Link href="/" className="text-[16px] hover-scale" onClick={resetHistory}>
              MCTAuto
            </Link>
          </div>

          <div className={cn('flex-1 pt-3 pb-10', contentContainer)}>
            {headerTitle && <HeaderTitle title={headerTitle} />}
            {children}
          </div>

          <Auth className="sticky top-3 w-[85px] h-[50px] inline-flex" />
        </div>
      </div>
    </>
  );
};

export default Container;
