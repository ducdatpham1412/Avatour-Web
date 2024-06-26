'use client';

import { ChevronRight, LogOutIcon } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useAppContext } from '@/app/provider';
import { TabView } from '@/components';
import { BagIcon, BookMarkIcon, CameraIcon, LocationIcon, PencilIcon } from '@/components/icon';
import { Image } from '@/components/ui';
import { parseErrorMessage, twConfigs } from '@/lib';
import { apiLogOut } from '@/api/auth';
import { toast } from '@/hooks';
import { PROFILE_ROUTES } from '@/configs/routes';

import { serviceDataDetail } from '../search/constants';
import { CheckIn, FavoriteTours, MyTours } from './screens';

const Border = () => {
  return <div className="w-full border-t-[1px] border-t-gray_300" />;
};

const Profile = () => {
  const route = useRouter();
  const [{ profile }, { setProfile }] = useAppContext();
  const tabRef = useRef<ElementRef<typeof TabView>>(null);

  if (!profile) {
    return null;
  }

  const onLogOut = async () => {
    try {
      await apiLogOut();
      setProfile(undefined);
      route.replace('/');
    } catch (err) {
      toast({
        variant: 'destructive',
        description: parseErrorMessage(err),
      });
    }
  };

  const renderServices = () => {
    if (profile.services.length) {
      return (
        <>
          <Border />
          <div className="inline-flex flex-col gap-[10px]">
            {profile.services.map(s => {
              const sData = serviceDataDetail[s];

              if (sData) {
                return (
                  <div className="inline-flex items-center gap-[8px]">
                    <sData.icon />
                    <p>{sData.name}</p>
                  </div>
                );
              }
            })}
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="container flex flex-col lg:flex-row pt-4">
      <div className="w-full self-start lg:w-[460px] lg:sticky lg:top-6">
        <div className="w-[200px] mx-auto lg:w-full shadow-all p-[8px] pb-[14px] lg:p-[16px] lg:pb-[28px]">
          <Image
            src={profile.avatar}
            defaultSrc="https://vietflag.vn/ckfinder/userfiles/images/tin-tuc/quoc-ky-viet-nam-1.jpg"
            imgClassName="aspect-square"
          />
          <div className="w-full mt-[12px] inline-flex items-center">
            <div className="flex flex-1 flex-wrap">
              <p className="text-[18px] font-medium">{profile.name}</p>
            </div>
            <button onClick={() => route.push(PROFILE_ROUTES.editProfile)}>
              <PencilIcon />
            </button>
          </div>
          <div className="flex gap-[2px] items-center">
            <LocationIcon size={17} />
            <p className="text-gray_500">{profile.location}</p>
          </div>
        </div>

        <div className="w-full rounded-[16px] border-[1px] border-gray_300 mt-[24px] p-[16px] inline-flex flex-col gap-[12px]">
          <div
            className="w-full inline-flex items-center justify-between hover-scale"
            role="button"
            onClick={() => tabRef.current?.navigate('check_in')}
          >
            <div className="inline-flex items-center gap-[8px]">
              <CameraIcon size={20} />
              Check-in
            </div>
            <ChevronRight />
          </div>

          {!!profile.description && (
            <>
              <Border />
              <p>{profile.description}</p>
            </>
          )}

          {renderServices()}
        </div>

        <button
          className="inline-flex items-center self-start gap-[4px] mt-[24px]"
          onClick={onLogOut}
        >
          <LogOutIcon size={13} color={twConfigs.theme?.colors?.gray_500 as string} />
          <p className="text-[12px] text-gray_500">Đăng xuất</p>
        </button>
      </div>

      <div className="w-[180px] h-[24px] md:h-[40px]" />

      <TabView
        ref={tabRef}
        tabs={[
          {
            id: 'my_tour',
            title: 'Tour của tôi',
            icon: <BagIcon size={16} />,
            children: <MyTours userId={profile.id} />,
          },
          {
            id: 'favorite',
            title: 'Tour yêu thích',
            icon: <BookMarkIcon size={16} />,
            children: <FavoriteTours userId={profile.id} />,
          },
          {
            id: 'check_in',
            title: 'Check-in',
            icon: <CameraIcon size={16} />,
            children: <CheckIn />,
          },
        ]}
      />
    </div>
  );
};

export default Profile;
