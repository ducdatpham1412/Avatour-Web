import { PropsWithChildren } from 'react';

import { LocationIcon } from '@/components';
import { Avatar, Image } from '@/components/ui';
import { serviceDataDetail } from '@/features/search/constants';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib';

interface Props {
  isEmpty?: boolean;
  onClick?: () => void;
}

const Container = ({ children, isEmpty, onClick }: PropsWithChildren & Props) => {
  return (
    <button
      className={cn(
        'w-full sm:w-[48%] lg:w-[31%] inline-flex flex-col gap-[8px] rounded-[14px] pb-[20px]',
        isEmpty ? '' : 'hover-slow border-gray_200 border-[1px] ',
      )}
      disabled={isEmpty}
      onClick={onClick}
    >
      {!isEmpty && children}
    </button>
  );
};

const ItemBuddy = ({ isEmpty, onClick }: Props) => {
  return (
    <Container isEmpty={isEmpty} onClick={onClick}>
      <Image
        src="https://static.vinwonders.com/production/lang-lua-van-phuc-top-banner.jpg"
        className="w-full aspect-[4/2.5] rounded-t-[14px]"
      />
      <div className="w-full inline-flex flex-col items-start gap-[8px] px-[16px]">
        <p className="font-semibold text-left text-[16px]">Học và hát dân ca quan họ Bắc Ninh</p>

        <div className="w-full gap-[8px] inline-flex items-center">
          <Avatar src="https://cly.1cdn.vn/2022/05/10/anh-nen-avatar-dep_021652403.jpg" size={40} />
          <div className="flex flex-1 flex-col items-start">
            <p className="text-start">Nghệ sĩ ưu tú Phạm Thị Lưu</p>
            <div className="w-full inline-flex items-center">
              <LocationIcon size={14} />
              <p className="text-gray-500 text-[14px] text-left line-clamp-2">
                Làng Điềm, thành phố Bắc Ninh
              </p>
            </div>
          </div>
        </div>

        <div className="w-full inline-flex items-center gap-[8px]">
          <serviceDataDetail.coffee.icon size={16} />
          <p className="text-gray-500 text-[12px]">Văn hoá, lịch sử</p>
          <p className="text-gray-500 text-[12px]">・</p>
          <p className="text-gray-500 text-[12px]">Thời gian: 2h</p>
        </div>

        <div className="w-full inline-flex items-end justify-between">
          <p className="text-[18px] font-medium text-p_700">{formatPrice(600000)}vnd</p>
          <p className="text-[12px] text-gray_500">{12} lượt đặt</p>
        </div>
      </div>
    </Container>
  );
};

export default ItemBuddy;
