import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { useAppContext } from '@/app/provider';
import { ButtonBack } from '@/components/buttons';
import { HeartFillIcon, HeartIcon, PencilIcon } from '@/components/icon';
import { Avatar } from '@/components/ui';
import { PROFILE_ROUTES, TOUR_ROUTES } from '@/configs/routes';
import { getCategoriesByServices, getTourName, twConfigs } from '@/lib';
import { formatTourDuration, formatTourPrice } from '@/lib/format';
import { setTourCreate } from '@/lib/storage';
import { DropDown } from '@/components';

import TruncatedText from './TruncatedText';

interface TourHeaderProps {
  tour: TypeTour;
  onLike: () => void;
  onDelete?: () => void;
}

const TourHeader = ({ tour, onLike, onDelete }: TourHeaderProps) => {
  const router = useRouter();
  const [{ profile: myProfile }] = useAppContext();

  const categories = useMemo(() => {
    const services = tour.schedule.flatMap(profile => profile.flatMap(p => p.services));
    return getCategoriesByServices(services);
  }, []);

  const isMyTour = myProfile && tour.creator === myProfile.id;

  return (
    <header className="flex flex-col">
      <div className="w-full inline-flex justify-between">
        {window.history.length > 1 && (
          <ButtonBack onClick={() => router.back()} className="self-start" />
        )}
        <div className="inline-flex items-center gap-x-[20px]">
          <button className="hover-scale" title="Thêm vào tour yêu thích" onClick={onLike}>
            {!tour.is_liked ? (
              <HeartIcon size={28} strokeWidth={1.2} />
            ) : (
              <HeartFillIcon color={twConfigs.theme?.colors?.red as string} size={28} />
            )}
          </button>

          <button
            className="inline-flex items-center gap-x-2 border-[1.2px] border-black rounded-full px-[12px] py-[6px] hover-scale"
            title="Chỉnh sửa lại theo ý thích của bạn"
            onClick={() => {
              setTourCreate(tour);
              router.push(TOUR_ROUTES.createTour);
            }}
          >
            <PencilIcon size={17} />
            <p className="text-[12px]">Chỉnh sửa</p>
          </button>

          {isMyTour && (
            <DropDown
              trigger={<EllipsisVertical strokeWidth={1.4} size={20} />}
              options={[
                {
                  value: 'edit',
                  label: 'Chỉnh sửa',
                  type: 'menu-item',
                },
                {
                  value: 'delete',
                  label: 'Xoá tour',
                  type: 'menu-item',
                },
              ]}
              onCheck={v => {
                if (v === 'delete') {
                  onDelete?.();
                } else {
                  setTourCreate(tour);
                  router.push(TOUR_ROUTES.createTour);
                }
              }}
            />
          )}
        </div>
      </div>

      <section className="flex flex-col md:flex-row items-start gap-y-6 md:gap-x-[min(20%,_80px)] justify-between mt-[20px]">
        <div className="flex flex-col gap-y-5">
          <div>
            <h1 className="text-[24px] md:text-[32px] font-normal text-black">
              {getTourName(tour)}
            </h1>
            <p className="text-gray_500">{categories.join(' | ')}</p>
          </div>
          {!!tour.creator && (
            <button
              className="inline-flex items-center self-start gap-2"
              onClick={() => router.push(PROFILE_ROUTES.profileId(tour.creator ?? 0))}
            >
              <Avatar src={tour.creator_avatar} size={32} />
              <p>{tour.creator_name}</p>
            </button>
          )}
          {!!tour.description && (
            <TruncatedText
              headerTitle={tour.name}
              className="text-black whitespace-pre-line font-light text-[14px]"
            >
              {tour.description}
            </TruncatedText>
          )}
        </div>

        <div className="flex flex-col items-start md:items-end p-4 gap-y-0.5 border border-p_600 rounded-[16px] bg-p_50 w-full md:w-auto">
          <span className="whitespace-nowrap text-[16px] leading-[24px] md:text-[24px] md:leading-[36px] font-medium text-p_700">
            {formatTourPrice(tour.min_cost, tour.max_cost)}
          </span>
          <span className="text-[16px] text-black leading-[24px] md:text-[20px] font-medium md:leading-[28px]">
            {formatTourDuration(tour.schedule.length)}
          </span>
        </div>
      </section>
    </header>
  );
};

export default TourHeader;
