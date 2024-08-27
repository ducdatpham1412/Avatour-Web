'use client';
import { useRouter } from 'next/navigation';

import Container from '@/app/container';
import { TourLoadingIcon } from '@/components';
import { PROFILE_ROUTES } from '@/configs/routes';

import { ItemBuddy } from './components';
import { useBuddies } from './hooks';

const BuddyScreen = () => {
  const router = useRouter();
  const [{ data, loading }] = useBuddies();

  const content = () => {
    if (loading || !data) {
      return <TourLoadingIcon className="w-[200px] h-[200px] mx-auto mt-[10vh]" />;
    }

    return (
      <div className="w-full inline-flex flex-wrap justify-between gap-y-7 sm:gap-y-12 mt-8">
        {data.map(buddy => {
          return (
            <ItemBuddy
              item={buddy}
              onClick={() => {
                router.push(PROFILE_ROUTES.profileId(buddy.id));
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Container
      showHeader={false}
      metaData={{
        title: 'Avatour Buddy',
        keywords: 'Buddy, Buddy bản địa, Buddy Avatour, Hướng dẫn viên du lịch bản địa',
      }}
    >
      <div className="inline-flex flex-col items-start mt-[12px]">
        <p className="text-black text-[22px] font-medium">Buddy là gì nhỉ?</p>
        <p>
          Buddy là một người dân bản địa, đồng hành cùng bạn trên một chặng đường, giúp bạn trải
          nghiệm đậm nét văn hoá địa phương.
        </p>
      </div>

      {content()}
    </Container>
  );
};

export default BuddyScreen;
