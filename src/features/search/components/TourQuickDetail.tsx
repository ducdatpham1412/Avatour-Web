'use client';
import { CSSProperties, useMemo } from 'react';

import { Icon } from '@/components';
import { cn } from '@/lib';

import Timeline from './Timeline';

export type TourQuickDetailFocusing = {
  day: number;
  index: number | undefined;
};

type Props = {
  tour: TypeTour | undefined;
  formatDescription: (loc: TypeProfile) => string;
  focusing?: TourQuickDetailFocusing;
  onChangeFocusing?: (v: TourQuickDetailFocusing) => void;
  className?: string;
  style?: CSSProperties;
};

const TourQuickDetail = ({
  tour,
  formatDescription,
  focusing,
  onChangeFocusing,
  className,
  style,
}: Props) => {
  const tourName =
    tour?.name === ''
      ? `${tour.schedule[0]?.[0].name} -> ${tour.schedule.at(-1)?.at(-1)?.name}`
      : tour?.name;

  const renderContent = () => {
    if (!tour) {
      return (
        <div className="flex flex-col gap-4 items-center justify-center h-52">
          <span className="text-gray_500 text-[14px] leading-[24px] font-normal">
            Di chuột vào kết quả để xem lịch trình
          </span>
          <Icon name="searchResult" />
        </div>
      );
    }

    return (
      <Timeline
        steps={tour.schedule[focusing?.day ?? 0].map(loc => {
          return {
            title: loc.name,
            description: formatDescription(loc),
            image: loc.avatar,
          };
        })}
        indexFocusing={focusing?.index}
        onChangeIndex={v => {
          onChangeFocusing?.({
            day: focusing?.day ?? 0,
            index: v,
          });
        }}
      />
    );
  };

  return (
    <div
      className={cn(
        'sticky top-24 p-[28px_20px] md:p-[24px_28px] flex flex-col gap-y-3 rounded-[20px] border-[1px] border-gray_300 bg-white',
        className,
      )}
      style={style}
    >
      <h4 className="text-[16px] leading-[24px] font-medium">
        {tour ? tourName : 'Lịch trình du lịch'}
      </h4>

      <div className="gap-y-5 flex flex-col">
        <div className="flex flex-wrap items-center gap-4">
          {tour?.schedule.map((_, i) => (
            <div
              key={i}
              role="button"
              onClick={() =>
                onChangeFocusing?.({
                  day: i,
                  index: undefined,
                })
              }
              className={cn(
                'p-[3px_12px] bg-gray_200 rounded-full whitespace-nowrap text-[14px] leading-[24px] font-normal',
                (focusing?.day ?? 0) === i ? 'bg-p_600' : '',
              )}
            >
              Ngày {i + 1}
            </div>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default TourQuickDetail;
