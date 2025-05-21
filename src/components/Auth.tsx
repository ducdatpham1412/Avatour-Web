'use client';
import { MenuIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { apiLogOut } from '@/api/auth';
import { useAppContext } from '@/app/provider';
import { PROFILE_ROUTES } from '@/configs/routes';
import { toast } from '@/hooks/useToast';
import { logger } from '@/lib';
import { cn, parseErrorMessage } from '@/lib/utils';

import DropDown from './DropDown';
import TabElement from './TabElement';
import DialogAuth from './dialogs/DialogAuth';
import Avatar from './ui/avatar';

const Auth = ({ className }: PropsWithClassName) => {
  const router = useRouter();
  const pathname = usePathname();
  const [{ profile, initLoading, loadingLogin }, { setProfile }] = useAppContext();

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
      <div
        className={cn(
          'px-[10px] py-[6px] border-[1px] border-gray_300 rounded-full gap-[10px] items-center',
          className,
        )}
      >
        {/* <Link href={PROFILE_ROUTES.myProfile}>
          <Avatar src={profile.avatar} className="w-[36px] h-[36px] rounded-full hover-scale" />
        </Link> */}
        <Avatar src={profile.avatar} className="w-[36px] h-[36px] rounded-full hover-scale" />

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
    <TabElement loading={initLoading || loadingLogin} className={className}>
      {renderAuth()}
    </TabElement>
  );
};

export default Auth;
