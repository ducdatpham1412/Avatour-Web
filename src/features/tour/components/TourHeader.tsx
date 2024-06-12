import { useMemo } from 'react';

import { getCategoriesByServices } from '@/lib';
import { formatTourDuration, formatTourPrice } from '@/lib/format';

import TruncatedText from './TruncatedText';

interface TourHeaderProps {
  tour: TypeTour;
}

const TourHeader = ({ tour }: TourHeaderProps) => {
  const categories = useMemo(() => {
    const services = tour.schedule.flatMap(profile => profile.flatMap(p => p.services));
    return getCategoriesByServices(services);
  }, []);

  const name = useMemo(
    () =>
      !tour.name
        ? `${tour.schedule[0]?.[0].name} -> ${tour.schedule.at(-1)?.at(-1)?.name}`
        : tour.name,
    [tour.name],
  );

  return (
    <header className="flex flex-col">
      <div className="text-gray_500 text-[14px] font-normal leading-[24px]">
        {categories.join(' | ')}
      </div>

      <section className="flex flex-col md:flex-row items-start gap-y-6 md:gap-x-[min(20%,_254px)] justify-between">
        <div className="flex flex-col gap-y-5">
          <h1 className="text-[24px] leading-[36px] md:text-[32px] md:leading-[44px] font-normal text-black">
            {name}
          </h1>
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
