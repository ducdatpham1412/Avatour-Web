'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef } from 'react';

import { useAppContext } from '@/app/provider';
import { TabView } from '@/components';
import { BagIcon, BookMarkIcon, CameraIcon, LocationIcon, PencilIcon } from '@/components/icon';
import { Image } from '@/components/ui';
import { PROFILE_ROUTES } from '@/configs/routes';
import Container from '@/app/container';

import { serviceDataDetail } from '../search/constants';
import { CheckIn, FavoriteTours, MyTours } from './screens';

const Border = () => {
  return <div className="w-full border-t-[1px] border-t-gray_300" />;
};

let cacheTab: string;
const getLocalTab = () => {
  const storage = localStorage.getItem('tab_profile');
  if (storage) {
    localStorage.removeItem('tab_profile');
    return storage;
  }
  return cacheTab;
};

const Profile = () => {
  const route = useRouter();
  const [{ profile }] = useAppContext();
  const tabRef = useRef<ElementRef<typeof TabView>>(null);

  if (!profile) {
    return null;
  }

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
    <Container showHeader={false} contentContainer="flex flex-col lg:flex-row pt-6 pb-[100px]">
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
              <PencilIcon className="hover-scale" />
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
      </div>

      <div className="w-[180px] h-[24px] md:h-[40px]" />

      <TabView
        ref={tabRef}
        defaultTab={getLocalTab()}
        onChangeTabId={v => (cacheTab = v)}
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
    </Container>
  );
};

export default Profile;
