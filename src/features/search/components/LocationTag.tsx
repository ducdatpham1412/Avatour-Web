'use client';
import { ReactElement, memo, useMemo } from 'react';

import { Dialog, DialogContent, DialogTrigger, Image } from '@/components/ui';
import { cn, formatPrice } from '@/lib';
import { useRouter } from '@/hooks';

import { serviceDataDetail } from '../constants';
import { TourQuickDetail } from './SearchResult';

type LocationTagProps = {
  isActive?: boolean;
  data: TypeTour;
  onHover?: (e: number | null) => void;
};

const LocationTag = memo(({ data, onHover, isActive }: LocationTagProps) => {
  const router = useRouter();

  const serviceCountMap = useMemo(() => {
    let serviceCount = 0;
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
      data.name === ''
        ? `${data.schedule[0]?.[0].name} -> ${data.schedule.at(-1)?.at(-1)?.name}`
        : data.name,
    [data.name],
  );

  const handleClick = () => {
    router.push(`/tour/${data.id}`);
  };

  return (
    <LocationDetailDialog data={data}>
      <div
        className={cn(
          'flex p-[8px] rounded-2xl max_ssm:flex-col max_ssm:gap-0 gap-6 overflow-hidden max_ssm:max-h-[unset] max-h-[250px] hover:bg-[#F4F4F4] min_lg:cursor-pointer',
          isActive ? 'min_lg:bg-transparent bg-[#F4F4F4]' : '',
        )}
        onMouseOver={() => {
          if (document.body.offsetWidth >= 1200) {
            onHover?.(data.id);
          }
        }}
        onClick={e => {
          if (document.body.offsetWidth >= 1200) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <div className="w-1/2 max_ssm:w-full shrink-0 rounded-xl overflow-hidden aspect-[3/2]">
          <Image
            src={data.schedule[0][0].avatar}
            className="h-full w-full [&_>_img]:!object-cover"
          />
        </div>
        <div className="flex flex-col justify-between py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-black/[0.36] text-[14px]">
              {/* {data.tags.flatMap((tag, index) => {
              if (index % 2 == 1) {
                return [<span>|</span>, <span>{tag}</span>];
              }
              return <span>{tag}</span>;
            })} */}
              Văn hoá | Lịch sử
            </div>
            <div className="text-[18px]">{tourName}</div>
          </div>
          <div className="flex flex-col" style={{ rowGap: '16px' }}>
            <div className="grid grid-cols-2 max_ssm:gap-2 gap-4 text-black/[0.40]">
              {Object.keys(serviceCountMap).map((tag, index) => (
                <TourService key={`${tag}-${index}`} name={tag} count={serviceCountMap[tag]} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="max_ssm:text-[16px] text-[18px]  text-primary">
                Khoảng {formatPrice((data.max_cost + data.min_cost) / 2)}
              </span>
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                <circle cx="3" cy="3" r="3" fill="#CECECE" />
              </svg>
              <span className="max_ssm:text-[12px] text-[14px] text-black/[0.4]">
                {data.schedule.length} ngày
              </span>
            </div>
          </div>
        </div>
      </div>
    </LocationDetailDialog>
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
    <div className="flex items-center gap-2">
      <ServiceIcon width="24px" height="24px" className="min-w-[24px]" /> {count} {serviceData.name}
    </div>
  );
};

type LocationDetailDialogProps = {
  children: ReactElement;
  data: TypeTour;
};

const LocationDetailDialog = ({ children, data }: LocationDetailDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="max-w-[unset] !w-[min-content] p-0 !rounded-[12px]">
      <TourQuickDetail data={data} />
    </DialogContent>
  </Dialog>
);
export type { LocationTagProps };
export default LocationTag;
