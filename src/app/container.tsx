'use client';
import { ClassValue } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement } from 'react';

import { Background, BackgroundSun, Navbar } from '@/components';
import { ButtonBack } from '@/components/buttons';
import { cn } from '@/lib';

import Metadata, { MetadataProps } from './metadata';
import { useAppContext } from './provider';

type Props = PropsWithChildren & {
  showHeader?: boolean;
  headerTitle?: string;
  HeaderRight?: ReactElement;
  background?: 'mountain' | 'sun' | null;
  contentContainer?: ClassValue;
  showFooter?: boolean;
  metaData?: MetadataProps;
};

export const Footer = () => {
  return (
    <div className="absolute px-[10%] w-full md:w-full h-[160px] md:h-[65px] bottom-0 bg-p_600 inline-flex items-start md:items-center justify-between flex-col md:flex-row py-6">
      <Link href="/about-us" target="_blank" className="text-[12px] hover-scale">
        Về chúng tôi
      </Link>
      <Link href="/tuyen-dung.pdf" target="_blank" className="text-[12px] hover-scale">
        Tuyển dụng
      </Link>
      <Link href="/policy" target="_blank" className="text-[12px] hover-scale">
        Chính sách bảo mật
      </Link>
      <Link href="/terms" target="_blank" className="text-[12px] hover-scale">
        Điều khoản sử dụng
      </Link>
      <div>
        <p className="text-[12px] hover-scale">
          SĐT: (+84) 886141200 | Email: service.avatour@gmail.com
        </p>
      </div>
    </div>
  );
};

const renderBackground = (background: Props['background'], showFooter: boolean) => {
  if (background === 'mountain') {
    return (
      <Background bottomClassName={showFooter ? 'bottom-[160px] md:bottom-[65px]' : 'bottom-0'} />
    );
  }

  if (background === 'sun') {
    return (
      <BackgroundSun
        bottomClassName={showFooter ? 'bottom-[160px] md:bottom-[65px]' : 'bottom-0'}
      />
    );
  }

  return null;
};

const Container = ({
  children,
  HeaderRight,
  headerTitle,
  showHeader = true,
  background = 'mountain',
  contentContainer,
  showFooter = true,
  metaData = {},
}: Props) => {
  const router = useRouter();
  const [
    {
      router: { canGoBack },
    },
  ] = useAppContext();

  return (
    <div className="relative w-full h-full min-h-[100vh] bg-white px-0">
      <Metadata {...metaData} />

      {renderBackground(background, showFooter)}

      <Navbar />

      <div className={cn('relative container pb-[250px] md:pb-[300px]', contentContainer)}>
        {showHeader && (
          <div className="w-full inline-flex justify-between items-center mt-[20px]">
            {canGoBack ? (
              <div className="inline-flex items-center">
                <ButtonBack onClick={() => router.back()} />
                {headerTitle && (
                  <h2 className="font-medium text-[18px] md:text-[30px] ml-2 md:ml-4">
                    {headerTitle}
                  </h2>
                )}
              </div>
            ) : (
              <div />
            )}
            {HeaderRight ?? <div />}
          </div>
        )}

        {children}
      </div>

      {showFooter && <Footer />}
    </div>
  );
};

export default Container;
