'use client';

import { useMemo, useState } from 'react';

import { cn } from '@/lib';

import LocationTag, { LocationTagProps } from './LocationTag';
import Timeline from './Timeline';
import { serviceDataDetail } from '../../constants';

type SearchResultProps = {
  data: TypeTour[];
};

const SearchResult = ({ data }: SearchResultProps) => {
  const [activeData, setActiveData] = useState<number>(-1);

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-[14px] sm:text-[16px] leading-[24px] text-black">{data.length} kết quả</span>

      <div className="relative flex items-start gap-x-8">
        <div className="flex-grow flex flex-col gap-y-6 md:gap-y-2">
          {data.map((location, index) => (
            <LocationTag
              key={location.id}
              data={location}
              isActive={activeData === index}
              onHover={() => setActiveData(index)}
            />
          ))}
        </div>
        <div className="min_lg:hidden contents">
          <TourQuickDetail key={activeData} data={data[activeData]} />
        </div>
      </div>

      {/* <button className="self-center text-[16px] leading-[24px] font-medium text-black p-[12px_24px] rounded-full bg-p_600 mt-12 w-[160px] md:w-[180px]">
        Xem thêm
      </button> */}
    </div>
  );
};

type TourQuickDetailProps = {
  data: LocationTagProps['data'] | undefined;
};

export const TourQuickDetail = ({ data }: TourQuickDetailProps) => {
  const [activeDay, setActiveDay] = useState(0);

  const tourName = useMemo(
    () =>
      data?.name === ''
        ? `${data.schedule[0]?.[0].name} -> ${data.schedule.at(-1)?.at(-1)?.name}`
        : data?.name,
    [data?.name],
  );

  return (
    <div className="w-[95vw] min-w-[95vw] md:w-[420px] md:min-w-[420px] sticky top-24 right-0 p-[28px_20px] md:p-[24px_28px] flex flex-col gap-y-3 rounded-[20px] border-[1px] border-gray_300 bg-white">
      <h4 className="text-[16px] leading-[24px] font-medium">
        {data ? tourName : 'Lịch trình du lịch'}
      </h4>

      <div className="gap-y-5 flex flex-col">
        <div className="flex flex-wrap items-center gap-4">
          {data?.schedule?.map((_, i) => (
            <div
              key={i}
              role="button"
              onClick={() => setActiveDay(i)}
              className={cn(
                'p-[3px_12px] bg-gray_200 rounded-full whitespace-nowrap text-[14px] leading-[24px] font-normal',
                (data.schedule.length <= activeDay && i === 0) || activeDay === i ? 'bg-p_600' : '',
              )}
            >
              Ngày {i + 1}
            </div>
          ))}
        </div>

        {!data ? (
          <div className="flex flex-col gap-4 items-center justify-center h-52">
            <span className="text-gray_500 text-[14px] leading-[24px] font-normal">
              Di chuột vào kết quả để xem lịch trình
            </span>
            <SearchResulIcon />
          </div>
        ) : (
          <>
            <Timeline
              steps={data.schedule[activeDay < data.schedule?.length ? activeDay : 0].map(t => ({
                description: serviceDataDetail[t.services[0]]?.name || t.services[0],
                duration: t.duration * 1000000,
                image: t.avatar,
                title: t.name,
              }))}
            />{' '}
          </>
        )}
      </div>
    </div>
  );
};

const SearchResulIcon = () => (
  <svg width="77" height="69" viewBox="0 0 77 69" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="0.585938"
      y="15.1885"
      width="57"
      height="54.6003"
      rx="8"
      transform="rotate(-12.6413 0.585938 15.1885)"
      fill="white"
    />
    <rect
      x="1.48189"
      y="15.7562"
      width="55.5"
      height="53.1003"
      rx="7.25"
      transform="rotate(-12.6413 1.48189 15.7562)"
      stroke="black"
      strokeOpacity="0.4"
      strokeWidth="1.5"
    />
    <g clipPath="url(#clip0_349_768)">
      <rect
        width="24"
        height="22.9896"
        transform="translate(20.7383 27.3579) rotate(-12.6413)"
        fill="white"
      />
      <path
        d="M28.0679 46.3298L45.6316 42.3906M27.439 43.5258L45.0027 39.5865M30.3663 42.8693L29.3181 38.1959M34.2694 41.994L33.2212 37.3205M38.1724 41.1186L37.1242 36.4452M42.0754 40.2432L41.0273 35.5698M43.3256 32.1091L35.3373 27.9023C34.4631 27.4419 34.026 27.2118 33.5852 27.186C33.1969 27.1633 32.8081 27.2505 32.4667 27.4369C32.0792 27.6484 31.7823 28.0432 31.1884 28.8328L25.7619 36.0483L43.3256 32.1091Z"
        stroke="black"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <rect
      x="19.7031"
      width="57"
      height="57"
      rx="8"
      transform="rotate(5.75549 19.7031 0)"
      fill="white"
    />
    <rect
      x="20.3741"
      y="0.821432"
      width="55.5"
      height="55.5"
      rx="7.25"
      transform="rotate(5.75549 20.3741 0.821432)"
      stroke="black"
      strokeOpacity="0.4"
      strokeWidth="1.5"
    />
    <rect
      width="24"
      height="24"
      transform="translate(34.9141 18.6191) rotate(5.75549)"
      fill="white"
    />
    <path
      d="M35.7933 39.8137L53.7025 41.6189M36.0941 36.8289L54.0034 38.634M39.079 37.1298L39.5804 32.1551M43.0588 37.531L43.5602 32.5562M47.0386 37.9321L47.5401 32.9573M51.0185 38.3333L51.5199 33.3585M54.8056 30.6743L48.579 23.9055C47.8976 23.1648 47.5569 22.7944 47.1474 22.6255C46.7865 22.4767 46.3901 22.4368 46.0068 22.5106C45.5718 22.5943 45.164 22.8893 44.3485 23.4791L36.8964 28.8692L54.8056 30.6743Z"
      stroke="black"
      strokeOpacity="0.4"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <clipPath id="clip0_349_768">
        <rect
          width="24"
          height="22.9896"
          fill="white"
          transform="translate(20.7383 27.3579) rotate(-12.6413)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SearchResult;
