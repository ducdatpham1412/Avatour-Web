'use client';
import { MouseEventHandler, useMemo } from 'react';

import { Icon } from '@/components';
import { Image } from '@/components/ui';
import { CONTAINER_WIDTH } from '@/configs/constants';
import { cn, getCategoriesByServices } from '@/lib';
import { formatTourDuration, formatTourName, formatTourPrice } from '@/lib/format';

import { serviceDataDetail } from '../../constants';

type Props = {
  isActive?: boolean;
  item: TypeTour;
  onHover?: () => void;
  onPreview?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

type TourServiceProps = {
  name: Service;
  count: number;
};

const TourService = ({ name, count }: TourServiceProps) => {
  let serviceData = serviceDataDetail[name];
  if (!serviceData) {
    serviceData = serviceDataDetail['other-service'];
  }
  const ServiceIcon = serviceData.icon;

  return (
    <div className="flex items-center gap-2 text-gray_500 text-[14px] font-normal">
      <ServiceIcon
        width="20px"
        height="20px"
        className="min-w-[24px] min-h-[24px]"
        strokeWidth={1.2}
      />{' '}
      {count} {serviceData.name}
    </div>
  );
};

const ItemTour = ({ item, onHover, isActive, onPreview, onClick }: Props) => {
  const serviceCountMap = useMemo(() => {
    const record = item.schedule.reduce((pre, cur) => {
      cur.forEach(profile => {
        profile.services.forEach(s => {
          if (pre[s]) {
            pre[s] += 1;
          } else if (!pre[s]) {
            pre[s] = 1;
          }
        });
      });
      return pre;
    }, {} as Record<Service, number>);

    const list = Object.keys(record).reduce((pre, cur) => {
      pre.push({
        service: cur as Service,
        count: record[cur as Service],
      });
      return pre;
    }, [] as Array<{ service: Service; count: number }>);

    list.sort((pre, cur) => {
      if (pre.count > cur.count) {
        return -1;
      }
      if (pre.count === cur.count) {
        return 0;
      }
      return 1;
    });

    return list;
  }, [item.schedule]);

  const tourName = formatTourName(item);

  const categories = useMemo(() => {
    const services = item.schedule.flatMap(profile => profile.flatMap(p => p.services));
    return getCategoriesByServices(services);
  }, []);

  return (
    <div
      className={cn(
        'inline-flex py-2 lg:p-2 rounded-2xl flex-col lg:flex-row gap-0 lg:gap-6 overflow-hidden max-h-[unset] lg:max-h-[250px] hover:bg-gray_100 cursor-pointer hover-slow hover:scale-[1.001]',
        isActive ? 'bg-transparent lg:bg-gray_100' : '',
      )}
      onMouseOver={() => {
        if (document.body.offsetWidth >= CONTAINER_WIDTH.lg) {
          onHover?.();
        }
      }}
      onClick={onClick}
    >
      <div className="lg:w-1/2 w-full shrink-0 rounded-xl overflow-hidden aspect-[3/2]">
        <Image src={item.schedule[0][0].avatar} className="h-full w-full [&_>_img]:!object-cover" />
      </div>
      <div className="flex flex-col justify-between py-[6px] gap-y-1 px-2 lg:px-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-black/[0.36] text-[14px] leading-[24px] font-normal text-gray_500">
            {categories.join(' | ')}
          </div>
          <div className="text-[18px] leading-[28px] font-medium line-clamp-2" title={tourName}>
            {tourName}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col" style={{ rowGap: '12px' }}>
            <div className="grid grid-cols-2 gap-x-9 gap-y-2">
              {serviceCountMap.slice(0, 4).map(cm => {
                return (
                  <TourService
                    key={`${cm.service}-${cm.count}`}
                    name={cm.service}
                    count={cm.count}
                  />
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] sm:text-[16px] leading-[24px] font-medium text-p_700">
                {formatTourPrice(item.min_cost, item.max_cost)}
              </span>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" fill="#DDD" />
              </svg>
              <span className="text-[14px] leading-[24px] font-normal text-gray_500">
                {formatTourDuration(item.schedule.length)}
              </span>
            </div>
          </div>

          <div className="block lg:hidden">
            <button
              className="h-10 w-10 flex rounded-full bg-p_200 justify-center items-center"
              onClick={onPreview}
            >
              <Icon name="calendar" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemTour;
