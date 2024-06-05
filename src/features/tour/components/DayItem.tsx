'use client';

import * as Accordion from '@radix-ui/react-accordion';

import { Icon } from '@/components/icon';
import { Image } from '@/components/ui';
import { serviceDataDetail } from '@/features/search/constants';

import TruncatedText from './TruncatedText';
import { convertDecimalToTime, formatCurrency } from '../utils';

interface DayItemProps {
  day: number;
  profiles?: TypeProfile[];
  onItemClick: (index: number) => void;
}

const DayItem = ({ day, profiles, onItemClick }: DayItemProps) => (
  <div className="flex flex-col">
    <div className="flex gap-x-3 items-center">
      <div className="w-3 h-3 rounded-full bg-p_600" />
      <div className="text-p_700 text-[18px] font-medium leading-[28px]">Ngày {day}</div>
    </div>

    <Accordion.Root
      className="flex flex-col w-full"
      type="multiple"
      defaultValue={day === 1 ? [profiles?.[0]?.name ?? ''] : undefined}
    >
      {profiles?.map((profile, i) => {
        const ServiceIcon =
          serviceDataDetail[profile.services.length ? profile.services[0] : 'other-service'].icon;

        const services = profile.services.map(s => serviceDataDetail[s]?.name || '').join(' • ');

        const cost = (() => {
          const minCost = formatCurrency(profile.min_cost);
          const maxCost = formatCurrency(profile.max_cost);
          if (minCost === maxCost) return minCost;
          return `${minCost} - ${maxCost}`;
        })();

        const time = (() => {
          const startTime = convertDecimalToTime(profile.start_time);
          const endTime = convertDecimalToTime(profile.end_time);
          const duration = convertDecimalToTime(profile.duration);
          const availableTime = startTime === endTime ? 'cả ngày' : `${startTime} - ${endTime}`;
          return `Mở cửa ${availableTime} • Trải nghiệm ${duration}`;
        })();

        return (
          <Accordion.Item
            value={profile?.name}
            key={i}
            className="py-5 md:py-6 border-b w-full overflow-hidden"
            onClick={() => onItemClick(i)}
          >
            <Accordion.Header className="">
              <Accordion.Trigger className="group w-full">
                <div className="flex items-start md:items-center justify-between w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-x-2 gap-y-[6px]">
                    <div className="flex items-center gap-x-2">
                      <Icon name="museum" size={24} />
                      <h2 className="text-[16px] text-black leading-[24px] md:text-[18px] md:leading-[28px] font-medium">
                        {profile?.name}
                      </h2>
                    </div>

                    <div className="hidden md:block w-[1px] h-7 bg-gray_300" />

                    <div className="flex items-center gap-x-2">
                      <div className="flex items-center gap-x-[2px]">
                        <Icon name="star" size={24} />
                        <div className="text-[14px] text-black leading-[24px] font-light">
                          {profile?.average_stars}
                        </div>
                      </div>
                      <div className="text-black text-[14px] leading-[24px] font-light"> • </div>
                      <div className="text-[14px] text-black leading-[24px] font-light underline">
                        2k+ đánh giá
                      </div>
                    </div>
                  </div>

                  <div className="rotate-180 group-data-[state=open]:rotate-0 duration-200">
                    <Icon name="arrow-up" size={24} />
                  </div>
                </div>
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
              <div className="flex flex-col pt-3 gap-y-3">
                <Image
                  src={profile.avatar}
                  className="w-full [&_>_img]:!object-cover aspect-[16/9] rounded-[16px]"
                />

                <div className="flex flex-col md:flex-row items-start md:items-center gap-y-1 gap-x-9">
                  <div className="gap-x-[6px] flex items-center">
                    <ServiceIcon />

                    <div className="text-gray_500 text-[14px] leading-[24px] font-light">
                      {services}
                    </div>
                  </div>

                  <div className="gap-x-[6px] flex items-center">
                    <Icon name="clock" size={20} />

                    <div className="text-gray_500 text-[14px] leading-[24px] font-light">
                      {time}
                    </div>
                  </div>
                </div>

                <TruncatedText className="text-black whitespace-pre-line font-light text-[15px] leading-[24px] md:text-[16px] md:leading-[28px]">
                  {profile.description}
                </TruncatedText>

                <div className="text-black font-medium text-[15px] md:text-[16px] leading-[24px]">
                  {'Chi phí: '}
                  <span className="text-p_700">{cost}</span>
                </div>
              </div>
            </Accordion.Content>
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  </div>
);

export default DayItem;
