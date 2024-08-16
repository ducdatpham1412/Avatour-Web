'use client';
import { useRouter } from 'next/navigation';

import Container from '@/app/container';
import { BookUserIcon, TourLoadingIcon } from '@/components';
import { Button } from '@/components/ui';
import { ACCOUNT_TYPE } from '@/configs/constants';
import { ORDER_ROUTES } from '@/configs/routes';

import { useProfile } from './hooks';
import { ProfileLoc, ProfileUser } from './screens';

interface Props {
  userId: number;
}

const OtherProfile = ({ userId }: Props) => {
  const router = useRouter();
  const [{ data, loading }] = useProfile(userId);
  const isBuddy = data?.account_type === 'buddy';

  const content = () => {
    if (loading || !data) {
      return <TourLoadingIcon className="w-[300px] mt-[10vh] self-center" />;
    }

    if (data.account_type === ACCOUNT_TYPE.location || data.account_type === ACCOUNT_TYPE.buddy) {
      return <ProfileLoc userId={data.id} />;
    }

    return <ProfileUser />;
  };

  return (
    <Container
      HeaderRight={
        isBuddy ? (
          <Button
            className="px-[50px] inline-flex gap-2"
            onClick={() => {
              router.push(ORDER_ROUTES.buddy(data.id));
            }}
          >
            <BookUserIcon size={20} />
            <p className="font-medium">Đặt lịch ngay</p>
          </Button>
        ) : (
          <div />
        )
      }
      background="sun"
    >
      {content()}
    </Container>
  );
};

export default OtherProfile;
