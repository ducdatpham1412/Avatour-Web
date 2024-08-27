import { PropsWithChildren } from 'react';

import { LocationIcon } from '@/components';
import { Avatar, Image } from '@/components/ui';
import { serviceDataDetail } from '@/features/search/constants';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib';

interface Props {
  item: TypeProfile;
  isEmpty?: boolean;
  onClick?: () => void;
}

const Container = ({
  children,
  isEmpty,
  onClick,
}: PropsWithChildren & Pick<Props, 'isEmpty' | 'onClick'>) => {
  return (
    <button
      className={cn(
        'w-full sm:w-[48%] lg:w-[31%] inline-flex flex-col gap-[8px] rounded-[14px] pb-[20px]',
        isEmpty ? '' : 'hover-slow border-gray_200 border-[1px]',
      )}
      disabled={isEmpty}
      onClick={onClick}
    >
      {!isEmpty && children}
    </button>
  );
};

const ItemBuddy = ({ isEmpty, onClick, item }: Props) => {
  const [activity, name] = item.name.split(', ');
  const ServiceIcon = serviceDataDetail[item.services[0]].icon;

  return (
    <Container isEmpty={isEmpty} onClick={onClick}>
      <Image src={item.link[0]?.img} className="w-full aspect-[4/2.5] rounded-t-[14px]" />
      <div className="w-full inline-flex flex-col items-start gap-[12px] px-[16px]">
        <p className="font-semibold text-left text-[16px]">{activity}</p>

        <div className="w-full gap-[8px] inline-flex items-center">
          <Avatar src={item.avatar || item.link[0]?.img} size={40} />
          <div className="flex flex-1 flex-col items-start">
            <p className="text-start">{name}</p>
            <div className="w-full inline-flex items-center gap-1">
              <LocationIcon size={16} />
              <p className="text-gray-500 text-[12px] text-left line-clamp-2">{item.location}</p>
            </div>
          </div>
        </div>

        <div className="w-full inline-flex items-center gap-[8px]">
          <ServiceIcon size={16} />
          {item.services.map((s, i) => {
            const isLast = i === item.services.length - 1;
            const sName = serviceDataDetail[s].name;
            return (
              <p key={i} className="text-gray-500 text-[12px]">
                {sName}
                {isLast ? '' : ', '}
              </p>
            );
          })}
        </div>

        <p className="text-gray-500 text-[12px]">Thời gian: {item.info?.duration ?? ''}h</p>

        <div className="w-full inline-flex items-end justify-between">
          <p className="text-[18px] font-medium text-p_700">
            {formatPrice(item.info?.min_cost ?? 0)}vnd
          </p>
          <p className="text-[12px] text-gray_500">{item.info?.total_orders} lượt đặt</p>
        </div>
      </div>
    </Container>
  );
};

export default ItemBuddy;
