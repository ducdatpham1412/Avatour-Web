'use client';
import { useRouter } from 'next/navigation';

import Container from '@/app/container';
import { PROFILE_ROUTES } from '@/configs/routes';

import { ItemBuddy } from './components';

const BuddyScreen = () => {
  const router = useRouter();
  //   const [] = useBuddies();

  const onGotoBuddy = () => {
    router.push(PROFILE_ROUTES.profileId(509));
  };

  return (
    <Container showHeader={false}>
      <div className="relative pb-[200px]">
        <div className="inline-flex flex-col items-start mt-[12px]">
          <p className="text-black text-[22px] font-medium">Buddy là gì nhỉ?</p>
          <p>
            Buddy là một người dân bản địa, đồng hành cùng bạn trên một chặng đường, giúp bạn trải
            nghiệm đậm nét văn hoá địa phương.
          </p>
        </div>

        <div className="w-full inline-flex flex-wrap justify-between gap-y-7 sm:gap-y-12 mt-8">
          <ItemBuddy onClick={onGotoBuddy} />
          <ItemBuddy />
          <ItemBuddy />
          <ItemBuddy />
          <ItemBuddy />
          <ItemBuddy isEmpty />
        </div>
      </div>
    </Container>
  );
};

export default BuddyScreen;
