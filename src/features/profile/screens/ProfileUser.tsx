import { ElementRef, useRef } from 'react';

import { TabView } from '@/components';
import { BagIcon, CameraIcon } from '@/components/icon';

import { InfoProfile } from '../components';
import CheckIn from './CheckIn';
import MyTours from './MyTours';

interface Props {
  profile: TypeProfile;
}

const ProfileUser = ({ profile }: Props) => {
  const tabRef = useRef<ElementRef<typeof TabView>>(null);
  const firstName = profile.name.split(' ')[0];

  return (
    <main className="w-full inline-flex flex-col lg:flex-row pt-6">
      <InfoProfile
        profile={profile}
        onGoToCheckIn={() => {
          tabRef.current?.navigate('check_in');
        }}
      />

      <div className="w-[180px] h-[24px] md:h-[40px]" />

      <TabView
        ref={tabRef}
        tabs={[
          {
            id: 'my_tour',
            title: `Tour của ${firstName || '...'}`,
            icon: <BagIcon size={16} />,
            children: <MyTours userId={profile.id} />,
          },
          {
            id: 'check_in',
            title: 'Check-in',
            icon: <CameraIcon size={16} />,
            children: <CheckIn userId={profile.id} />,
          },
        ]}
      />
    </main>
  );
};

export default ProfileUser;
