import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import { ButtonBack } from '@/components/buttons';
import { HeartFillIcon, HeartIcon, PencilIcon } from '@/components/icon';
import { TOUR_ROUTES } from '@/configs/routes';
import { getCategoriesByServices, getTourName, twConfigs } from '@/lib';
import { formatTourDuration, formatTourPrice } from '@/lib/format';
import { setTourCreate } from '@/lib/storage';

import TruncatedText from './TruncatedText';

interface TourHeaderProps {
  tour: TypeTour;
  onLike: () => void;
}

const TourHeader = ({ tour, onLike }: TourHeaderProps) => {
  const router = useRouter();

  const categories = useMemo(() => {
    const services = tour.schedule.flatMap(profile => profile.flatMap(p => p.services));
    return getCategoriesByServices(services);
  }, []);

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
        </div>
      </div>

      <section className="flex flex-col md:flex-row items-start gap-y-6 md:gap-x-[min(20%,_80px)] justify-between mt-[20px]">
        <div className="flex flex-col gap-y-5">
          <div>
            <h1 className="text-[24px] leading-[36px] md:text-[32px] md:leading-[44px] font-normal text-black">
              {getTourName(tour)}
            </h1>
            <p className="text-gray_500">{categories.join(' | ')}</p>
          </div>
          {!!tour.description && (
            <TruncatedText
              headerTitle={tour.name}
              fullContentInModal
              className="text-black whitespace-pre-line font-light text-[15px] leading-[24px] md:text-[16px] md:leading-[28px]"
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
