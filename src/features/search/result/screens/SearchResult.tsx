'use client';

import { useState } from 'react';

import { formatDuration } from '@/lib/format';
import { useWindowSize } from '@/hooks';

import { TourQuickDetail, TourQuickDetailFocusing } from '../../components';
import { serviceDataDetail } from '../../constants';
import { ItemTour } from '../components';

type SearchResultProps = {
  data: TypeTour[];
};

const SearchResult = ({ data }: SearchResultProps) => {
  const { width } = useWindowSize();
  const [index, setIndex] = useState<number>();
  const [focusing, setFocusing] = useState<TourQuickDetailFocusing>();

  return (
    <div className="flex flex-col gap-y-2">
      <span className="text-[14px] sm:text-[16px] leading-[24px] text-black">
        {data.length} kết quả
      </span>

      <div className="relative flex items-start gap-x-8">
        <div className="flex-grow flex flex-col gap-y-6 lg:gap-y-2 pb-[100px]">
          {data.map((location, idx) => (
            <ItemTour
              key={location.id}
              item={location}
              isActive={index === idx}
              onHover={() => {
                setFocusing(undefined);
                setIndex(idx);
              }}
            />
          ))}
        </div>
        <div className="hidden lg:contents">
          <TourQuickDetail
            tour={index !== undefined ? data[index] : undefined}
            formatDescription={loc =>
              `${serviceDataDetail[loc.services[0]].name || loc.services[0]}・${formatDuration(
                loc.duration,
              )}`
            }
            focusing={focusing}
            onChangeFocusing={v => setFocusing(v)}
            className={`w-[30vw] lg:w-[25vw]`}
            style={{ minWidth: width * 0.25 }}
          />
        </div>
      </div>

      {/* <button className="self-center text-[16px] leading-[24px] font-medium text-black p-[12px_24px] rounded-full bg-p_600 mt-12 w-[160px] md:w-[180px]">
        Xem thêm
      </button> */}
    </div>
  );
};

export default SearchResult;
