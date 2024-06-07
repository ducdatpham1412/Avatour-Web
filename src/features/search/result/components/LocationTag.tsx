'use client';
import { ReactElement, memo, useMemo } from 'react';

import { Dialog, DialogContent, DialogTrigger, Image } from '@/components/ui';
import { useRouter } from '@/hooks';
import { calcTravelDuration, cn, formatPrice } from '@/lib';

import { serviceDataDetail } from '../../constants';
import { TourQuickDetail } from './SearchResult';

type LocationTagProps = {
  isActive?: boolean;
  data: TypeTour;
  onHover?: (e: number | null) => void;
};

const LocationTag = memo(({ data, onHover, isActive }: LocationTagProps) => {
  const router = useRouter();

  const serviceCountMap = useMemo(() => {
    const serviceCount = 0;
    return data.schedule.reduce((c, v) => {
      v.forEach(profile => {
        profile.services.forEach(service => {
          if (c[service] && serviceCount <= 6) {
            c[service]++;
          } else if (!c[service]) {
            c[service] = 1;
          }
        });
      });
      return c;
    }, {} as Record<string, number>);
  }, [data.schedule]);

  const tourName = useMemo(
    () =>
      !data.name
        ? `${data.schedule[0]?.[0].name} -> ${data.schedule.at(-1)?.at(-1)?.name}`
        : data.name,
    [data.name],
  );

  const handleClick = () => {
    if (data.id) {
      router.push(`/tour/${data.id}`);
      return;
    }

    const timestamp = +new Date();
    localStorage.clear();
    localStorage.setItem(timestamp.toString(), JSON.stringify(data));
    router.push(`/tour/0?t=${timestamp}`);
  };

  return (
    <div
      className={cn(
        'flex py-2 md:p-2 rounded-2xl flex-col md:flex-row gap-0 md:gap-6 overflow-hidden max-h-[unset] md:max-h-[250px] md:hover:bg-[#F4F4F4] cursor-pointer',
        isActive ? 'bg-transparent md:bg-gray_100' : '',
      )}
      onMouseOver={() => {
        if (document.body.offsetWidth >= 1200) {
          onHover?.(data.id);
        }
      }}
      onClick={handleClick}
    >
      <div className="md:w-1/2 w-full shrink-0 rounded-xl overflow-hidden aspect-[3/2]">
        <Image src={data.schedule[0][0].avatar} className="h-full w-full [&_>_img]:!object-cover" />
      </div>
      <div className="flex flex-col justify-between py-[6px] gap-y-1">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-black/[0.36] text-[14px] leading-[24px] font-normal text-gray_500">
            {/* {data.tags.flatMap((tag, index) => {
              if (index % 2 == 1) {
                return [<span>|</span>, <span>{tag}</span>];
              }
              return <span>{tag}</span>;
            })} */}
            Văn hoá | Lịch sử
          </div>
          <div className="text-[18px] leading-[28px] font-medium line-clamp-2" title={tourName}>
            {tourName}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col" style={{ rowGap: '12px' }}>
            <div className="grid grid-cols-2 gap-x-9 gap-y-2">
              {Object.keys(serviceCountMap).map((tag, index) => (
                <TourService key={`${tag}-${index}`} name={tag} count={serviceCountMap[tag]} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] sm:text-[16px] leading-[24px] font-medium text-p_700">
                Khoảng {formatPrice((data.max_cost + data.min_cost) / 2)} đ
              </span>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" fill="#DDD" />
              </svg>
              <span className="text-[14px] leading-[24px] font-normal text-gray_500">
                {calcTravelDuration(data.schedule.length)}
              </span>
            </div>
          </div>

          <div className="block md:hidden">
            <LocationDetailDialog data={data}>
              <div className="h-10 w-10 flex rounded-full bg-p_200 justify-center items-center">
                <CalendarIcon />
              </div>
            </LocationDetailDialog>
          </div>
        </div>
      </div>
    </div>
  );
});

type TourServiceProps = {
  name: string;
  count: number;
};

const TourService = ({ name, count }: TourServiceProps) => {
  let serviceData = serviceDataDetail[name as keyof typeof serviceDataDetail];
  if (!serviceData) {
    serviceData = serviceDataDetail['other-service'];
  }
  const ServiceIcon = serviceData.icon;

  return (
    <div className="flex items-center gap-2 text-gray_500 text-[14px] font-normal">
      <ServiceIcon width="20px" height="20px" className="min-w-[24px]" strokeWidth={1.2} /> {count}{' '}
      {serviceData.name}
    </div>
  );
};

type LocationDetailDialogProps = {
  children: ReactElement;
  data: TypeTour;
};

const LocationDetailDialog = ({ children, data }: LocationDetailDialogProps) => (
  <Dialog>
    <DialogTrigger asChild onClick={e => e.stopPropagation()}>
      {children}
    </DialogTrigger>
    <DialogContent
      onClick={e => e.stopPropagation()}
      className="max-w-[unset] !w-[min-content] !p-0 !border-none !bg-transparent !rounded-[20px]"
    >
      <TourQuickDetail data={data} />
    </DialogContent>
  </Dialog>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.5 8.33333H17.5M5.83333 2.5V4.16667M14.1667 2.5V4.16667M5.16667 17.5H14.8333C15.7668 17.5 16.2335 17.5 16.59 17.3183C16.9036 17.1586 17.1586 16.9036 17.3183 16.59C17.5 16.2335 17.5 15.7668 17.5 14.8333V6.83333C17.5 5.89991 17.5 5.4332 17.3183 5.07668C17.1586 4.76308 16.9036 4.50811 16.59 4.34832C16.2335 4.16667 15.7668 4.16667 14.8333 4.16667H5.16667C4.23325 4.16667 3.76654 4.16667 3.41002 4.34832C3.09641 4.50811 2.84144 4.76308 2.68166 5.07668C2.5 5.4332 2.5 5.89991 2.5 6.83333V14.8333C2.5 15.7668 2.5 16.2335 2.68166 16.59C2.84144 16.9036 3.09641 17.1586 3.41002 17.3183C3.76654 17.5 4.23325 17.5 5.16667 17.5Z"
      stroke="#110B0B"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export type { LocationTagProps };
export default LocationTag;
