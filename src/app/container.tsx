'use client';
import { ClassValue } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, ReactElement } from 'react';

import { Background, BackgroundSun, Navbar } from '@/components';
import { ButtonBack } from '@/components/buttons';
import { cn } from '@/lib';

type Props = PropsWithChildren & {
  showHeader?: boolean;
  HeaderRight?: ReactElement;
  background?: 'mountain' | 'sun' | null;
  contentContainer?: ClassValue;
  showFooter?: boolean;
};

export const Footer = () => {
  return (
    <div className="absolute px-[10%] w-full md:w-full h-[160px] md:h-[65px] bottom-0 bg-p_600 inline-flex items-start md:items-center justify-between flex-col md:flex-row py-6">
      <Link href="/about-us" target="_blank" className="text-[12px] hover-scale">
        Về chúng tôi
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

const Container = ({
  children,
  HeaderRight,
  showHeader = true,
  background = 'mountain',
  contentContainer,
  showFooter = true,
}: Props) => {
  const router = useRouter();

  const renderBackground = () => {
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

  return (
    <div className="relative w-full h-full min-h-[100vh] bg-white px-0">
      {renderBackground()}
      <Navbar />
      <div className={cn('relative container pb-[250px] md:pb-[300px]', contentContainer)}>
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

      {showFooter && <Footer />}
    </div>
  );
};

export default Container;
