'use client';

import { ElementRef, useRef } from 'react';

import Container from '@/app/container';
import { useAppContext } from '@/app/provider';
import { TabView } from '@/components';
import { BagIcon, BookMarkIcon, CameraIcon } from '@/components/icon';

import { InfoProfile } from './components';
import { CheckIn, FavoriteTours, MyTours } from './screens';

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
  const [{ profile }] = useAppContext();
  const tabRef = useRef<ElementRef<typeof TabView>>(null);

  if (!profile) {
    return null;
  }

  return (
    <Container showHeader={false} contentContainer="flex flex-col lg:flex-row pt-6">
      <InfoProfile
        profile={profile}
        onGoToCheckIn={() => {
          tabRef.current?.navigate('check_in');
        }}
      />

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
