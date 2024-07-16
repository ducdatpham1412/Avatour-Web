'use client';
import { useRouter } from 'next/navigation';

import { TourLoadingIcon } from '@/components';
import { ButtonBack } from '@/components/buttons';
import { ACCOUNT_TYPE } from '@/configs/constants';

import { useProfile } from './hooks';
import { ProfileLoc, ProfileUser } from './screens';

interface Props {
  userId: number;
}

const OtherProfile = ({ userId }: Props) => {
  const router = useRouter();

  const [{ data, loading }] = useProfile(userId);

  const content = () => {
    if (loading || !data) {
      return <TourLoadingIcon className="w-[300px] mt-[10vh] self-center" />;
    }

    if (data.account_type === ACCOUNT_TYPE.location) {
      return <ProfileLoc userId={data.id} />;
    }

    return <ProfileUser />;
  };

  return (
    <div className="container inline-flex flex-col">
      {window.history.length > 1 && (
        <ButtonBack className="self-start mt-[20px]" onClick={() => router.back()} />
      )}
      {content()}
    </div>
  );
};

export default OtherProfile;
