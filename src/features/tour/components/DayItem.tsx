'use client';

import * as Accordion from '@radix-ui/react-accordion';

import { Icon } from '@/components/icon';
import { Image } from '@/components/ui';
import { PROFILE_ROUTES } from '@/configs/routes';
import { serviceDataDetail } from '@/features/search/constants';
import { formatTourPrice } from '@/lib/format';
import { cn, convertDecimalToTime } from '@/lib/utils';

import NameStars from './NameStars';
import TruncatedText from './TruncatedText';

interface DayItemProps {
  day: number;
  profiles?: TypeProfile[];
  onItemClick: (index: number) => void;
}

export const getElementLocId = (day: number, index: number) => {
  return `loc-${day}-${index}`;
};

const DayItem = ({ day, profiles, onItemClick }: DayItemProps) => {
  return (
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
          if (profile.account_type !== 'location' && profile.account_type !== 'shop') {
            return null;
          }

          const isLast = i === profiles.length - 1;

          const ServiceIcon =
            serviceDataDetail[profile.services.length ? profile.services[0] : 'other-service'].icon;

          const services = profile.services.map(s => serviceDataDetail[s].name || '').join(' • ');

          const time = (() => {
            const startTime = convertDecimalToTime(profile.info.start_time);
            const endTime = convertDecimalToTime(profile.info.end_time);
            const duration = convertDecimalToTime(profile.info.duration);
            const availableTime = startTime === endTime ? 'cả ngày' : `${startTime} - ${endTime}`;
            return `Mở cửa: ${availableTime} • Trải nghiệm: ${duration}p`;
          })();

          return (
            <section id={getElementLocId(day - 1, i)}>
              <Accordion.Item
                value={profile.name}
                key={i}
                className={cn('py-5 md:py-6 w-full overflow-hidden', isLast ? '' : 'border-b')}
                onClick={() => onItemClick(i)}
              >
                <Accordion.Header className="">
                  <div className="w-full inline-flex">
                    <div className="inline-flex items-start md:items-center justify-between">
                      <div className="flex flex-row items-center gap-x-2 gap-y-[6px]">
                        <ServiceIcon
                          width="24px"
                          height="24px"
                          className="min-w-[24px] min-h-[24px]"
                          strokeWidth={1.5}
                        />

                        <NameStars
                          name={profile.name}
                          stars={5}
                          ratings={0}
                          href={PROFILE_ROUTES.profileId(profile.id)}
                        />
                      </div>
                    </div>

                    <Accordion.Trigger className="group flex flex-1 justify-end">
                      <div className="rotate-180 group-data-[state=open]:rotate-0 duration-200">
                        <Icon name="arrow-up" size={24} />
                      </div>
                    </Accordion.Trigger>
                  </div>
                </Accordion.Header>

                <Accordion.Content className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden">
                  <div className="flex flex-col pt-3 gap-y-3">
                    <Image
                      src={profile.avatar}
                      className="w-full [&_>_img]:!object-cover aspect-[16/9] rounded-[16px]"
                    />

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-y-1 gap-x-9">
                      <div className="gap-x-[6px] flex items-center">
                        <ServiceIcon
                          width="20px"
                          height="20px"
                          className="min-w-[24px] min-h-[24px]"
                          strokeWidth={1.2}
                        />

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
                      <span className="text-p_700">
                        {formatTourPrice(profile.info.min_cost, profile.info.max_cost)}
                      </span>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </section>
          );
        })}
      </Accordion.Root>
    </div>
  );
};

export default DayItem;
