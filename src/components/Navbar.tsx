'use client';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { apiLogOut } from '@/api/auth';
import { useAppContext } from '@/app/provider';
import LogoIcon from '@/components/icon/LogoIcon';
import { ACCOUNT_TYPE, CONTAINER_WIDTH } from '@/configs/constants';
import { ADMIN_ROUTES, PROFILE_ROUTES } from '@/configs/routes';
import { toast, useWindowSize } from '@/hooks';
import { logger, parseErrorMessage, twColors } from '@/lib';

import { DialogAuth } from './dialogs';
import DropDown from './DropDown';
import { BookUserIcon, IconAvatour, MapPinIcon } from './icon';
import { Image } from './ui';

const Navbar = () => {
  const [{ profile, initLoading }, { setProfile }] = useAppContext();
  const pathname = usePathname();
  const { width } = useWindowSize();
  const router = useRouter();

  const colorSuggest = pathname === '/search' ? twColors.p_700 : twColors.black;
  const colorBuddy = pathname === '/' ? twColors.p_700 : twColors.black;

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

  const onLogOut = async () => {
    try {
      await apiLogOut();
      setProfile(undefined);
      if (pathname === PROFILE_ROUTES.myProfile) {
        router.replace('/');
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  const renderAuth = () => {
    if (!profile) {
      return (
        <>
          {/* <div
            role="button"
            onClick={() => {
              DialogAuth.open({ mode: 'sign-up' });
            }}
            className="font-medium hidden md:block hover-scale"
          >
            Đăng ký
          </div> */}
          <div
            role="button"
            className="bg-p_600 px-[24px] py-[8px] rounded-full font-medium hover-scale"
            onClick={() => {
              DialogAuth.open({ mode: 'sign-in' });
            }}
          >
            Đăng nhập
          </div>
        </>
      );
    }

    return (
      <div className="px-[10px] py-[6px] border-[1px] border-gray_300 rounded-full flex gap-[10px] items-center">
        <Link href={PROFILE_ROUTES.myProfile}>
          <Image
            src={profile.avatar}
            defaultSrc="https://vietflag.vn/ckfinder/userfiles/images/tin-tuc/quoc-ky-viet-nam-1.jpg"
            className="w-[36px] h-[36px] rounded-full hover-scale"
          />
        </Link>
        <DropDown
          trigger={<MenuIcon size={18} className="hover-scale" />}
          options={[
            {
              value: 'about-us',
              label: 'Về chúng tôi',
              type: 'menu-item',
            },
            {
              value: 'log-out',
              label: 'Đăng xuất',
              type: 'menu-item',
            },
          ]}
          onCheck={v => {
            if (v === 'about-us') {
              router.push('/about-us');
            } else {
              onLogOut().catch(logger.log);
            }
          }}
        />
      </div>
    );
  };

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
      {!initLoading && (
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="hover-scale inline-flex gap-1 items-center"
            title="Buddy bản địa"
          >
            <BookUserIcon size={size.icon} color={colorBuddy} />
            <p className="hidden md:block font-medium" style={{ color: colorBuddy }}>
              Buddy bản địa
            </p>
          </Link>

          <Link
            href="/search"
            className="hover-scale inline-flex gap-1 items-center"
            title="Gợi ý lịch trình"
          >
            <MapPinIcon size={size.icon} color={colorSuggest} />
            <p className="hidden md:block font-medium" style={{ color: colorSuggest }}>
              Gợi ý lịch trình
            </p>
          </Link>

          <Link href="/tuyen-dung.pdf" className="hidden lg:block hover-scale">
            Tuyển dụng
          </Link>

          {(profile?.account_type === ACCOUNT_TYPE.admin ||
            profile?.account_type === ACCOUNT_TYPE.superAdmin) && (
            <Link href={ADMIN_ROUTES.suppliers} className="font-medium hidden md:block hover-scale">
              CMS
            </Link>
          )}
          {renderAuth()}
        </div>
      )}
    </div>
  );
};

export default Navbar;
