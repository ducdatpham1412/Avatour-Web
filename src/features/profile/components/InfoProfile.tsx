import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAppContext } from '@/app/provider';
import { CameraIcon, PencilIcon } from '@/components/icon';
import { Image } from '@/components/ui';
import { PROFILE_ROUTES } from '@/configs/routes';
import { serviceDataDetail } from '@/features/search/constants';

interface Props {
  profile: TypeProfile;
  onGoToCheckIn: () => void;
}

const Border = () => {
  return <div className="w-full border-t-[1px] border-t-gray_300" />;
};

const InfoProfile = ({ profile, onGoToCheckIn }: Props) => {
  const router = useRouter();
  const [{ profile: myProfile }] = useAppContext();

  const isMyProfile = profile.id === myProfile?.id;

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
          {isMyProfile && (
            <button onClick={() => router.push(PROFILE_ROUTES.editProfile)}>
              <PencilIcon className="hover-scale" />
            </button>
          )}
        </div>
        {/* <div className="flex gap-[2px] items-center">
          <LocationIcon size={17} />
          <p className="text-gray_500">{profile.location}</p>
        </div> */}
      </div>

      <div className="w-full rounded-[16px] border-[1px] border-gray_300 mt-[24px] p-[16px] inline-flex flex-col gap-[12px]">
        <div
          className="w-full inline-flex items-center justify-between hover-scale"
          role="button"
          onClick={onGoToCheckIn}
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
  );
};

export default InfoProfile;
