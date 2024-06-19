'use client';
import Link from 'next/link';
import { ElementRef, useRef } from 'react';

import { useAppContext } from '@/app/provider';
import LogoIcon from '@/components/icon/LogoIcon';
import { PROFILE_ROUTES } from '@/configs/routes';

import { DialogAuth } from './dialogs';
import { Icon } from './icon';
import { Image } from './ui';

const Navbar = () => {
  const [{ profile, initLoading }] = useAppContext();
  const dialogModal = useRef<ElementRef<typeof DialogAuth>>(null);

  const renderAuth = () => {
    if (!profile) {
      return (
        <>
          <div
            role="button"
            onClick={() => {
              dialogModal.current?.open({
                mode: 'sign-up',
              });
            }}
          >
            Đăng ký
          </div>
          <div
            role="button"
            className="bg-p_600 px-[24px] py-[8px] rounded-full"
            onClick={() => {
              dialogModal.current?.open({
                mode: 'sign-in',
              });
            }}
          >
            Đăng nhập
          </div>
        </>
      );
    }

    return (
      <Link
        className="px-[10px] py-[6px] border-[1.5px] border-gray_300 rounded-full flex gap-[10px] items-center"
        href={PROFILE_ROUTES.myProfile}
      >
        <Image src={profile.avatar} className="w-[36px] h-[36px] rounded-full" />
        <Icon name="bag" />
      </Link>
    );
  };

  return (
    <nav className="relative flex top-0 left-0 w-full items-center justify-between h-[68px] px-[20px] sm:px-[50px] z-20">
      <Link href="/">
        <LogoIcon className="w-[142px] h-[36px]" />
      </Link>
      {!initLoading && (
        <div className="flex items-center gap-7">
          <Link href="/about-us">Về chúng tôi</Link>
          {renderAuth()}
          <DialogAuth ref={dialogModal} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
