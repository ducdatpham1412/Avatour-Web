'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { useAppContext } from '@/app/provider';
import { ACCOUNT_TYPE, CONTAINER_WIDTH } from '@/configs/constants';
import { ADMIN_ROUTES } from '@/configs/routes';
import { useWindowSize } from '@/hooks';
import { twColors } from '@/lib';

import Auth from './Auth';
import { BookUserIcon, IconAvatour, MapPinIcon } from './icon';
import LogoIcon from './icon/LogoIcon';
import TabElement from './TabElement';

const Navbar = () => {
  const [{ profile, initLoading }] = useAppContext();
  const pathname = usePathname();
  const { width } = useWindowSize();

  const colorSuggest = pathname === '/' ? twColors.p_700 : twColors.black;
  const colorBuddy = pathname === '/buddy' ? twColors.p_700 : twColors.black;

  const size = useMemo(() => {
    if (!width) {
      return {
        icon: 0,
        logo: 0,
      };
    }

    if (width >= CONTAINER_WIDTH.lg) {
      return {
        icon: 20,
        logo: 70,
      };
    }

    return {
      icon: 30,
      logo: 50,
    };
  }, [width]);

  return (
    <div className="relative inline-flex top-0 left-0 w-full items-center justify-between h-[68px] px-[10px] sm:px-[50px] z-20 flex-shrink-0">
      <Link href="/" className="hover-scale inline-flex flex-row items-center gap-[8px]">
        {!!size.logo && (
          <>
            <LogoIcon size={size.logo} />
            <IconAvatour className="hidden sm:block" />
          </>
        )}
      </Link>

      <div className="flex items-center gap-8">
        <TabElement loading={initLoading}>
          <Link
            href="/"
            className="hover-scale inline-flex gap-1 items-center"
            title="Gợi ý lịch trình"
          >
            <MapPinIcon size={size.icon} color={colorSuggest} />
            <p className="hidden md:block font-medium" style={{ color: colorSuggest }}>
              Gợi ý lịch trình
            </p>
          </Link>
        </TabElement>

        <TabElement loading={initLoading}>
          <Link
            href="/buddy"
            className="hover-scale inline-flex gap-1 items-center"
            title="Buddy bản địa"
          >
            <BookUserIcon size={size.icon} color={colorBuddy} />
            <p className="hidden md:block font-medium" style={{ color: colorBuddy }}>
              Buddy bản địa
            </p>
          </Link>
        </TabElement>

        {/* <TabElement loading={initLoading} className="hidden md:block">
          <Link href="/tuyen-dung.pdf" className="hidden lg:block hover-scale">
            Tuyển dụng
          </Link>
        </TabElement> */}

        {(profile?.account_type === ACCOUNT_TYPE.admin ||
          profile?.account_type === ACCOUNT_TYPE.holder) && (
          <TabElement loading={initLoading}>
            <Link href={ADMIN_ROUTES.suppliers} className="font-medium hidden md:block hover-scale">
              CMS
            </Link>
          </TabElement>
        )}

        <Auth className="flex" />
      </div>
    </div>
  );
};

export default Navbar;
