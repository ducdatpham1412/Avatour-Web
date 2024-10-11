import React from 'react';
import { CheckIcon } from 'lucide-react';

import { Avatar } from '@/components/ui';
import { cn, twColors } from '@/lib';

import VoucherBackground from './VoucherBackground';

interface Props {
  item: TypeVoucher;
  onClick?: () => void;
  hasChosen?: boolean;
  status?: 'disable' | 'chosen';
  showBackground?: boolean;
}

const ItemVoucher = ({
  item,
  onClick,
  status,
  hasChosen = false,
  showBackground = true,
}: Props) => {
  const disabled = status === 'disable';
  const isChosen = status === 'chosen';

  return (
    <button
      className={cn(
        'relative bg-white py-[12px] px-[16px] rounded-[14px] border-[1px] border-gray_200 shrink-0 w-[270px] sm:w-[330px] overflow-hidden',
        disabled ? '' : 'hover-scale',
      )}
      style={{
        backgroundColor: disabled
          ? twColors.gray_200
          : isChosen
          ? 'rgba(52, 149, 41, 0.1)'
          : twColors.white,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {showBackground && (
        <VoucherBackground className="absolute top-0 left-0 rounded-[14px]" size={360} />
      )}

      <div className="relative w-full inline-flex gap-4">
        <Avatar src={item.avatar} />
        <div className="flex-1">
          <p className="font-medium text-[14px] text-start">{item.title}</p>
          <p className="text-[12px] font-light text-start">{item.description}</p>
        </div>

        {hasChosen && (
          <div
            className="w-[30px] h-[30px] border-gray_500 rounded-full inline-flex items-center justify-center"
            style={{
              backgroundColor: isChosen ? twColors.green : 'transparent',
              borderWidth: isChosen ? 0 : 1,
            }}
          >
            {isChosen && <CheckIcon size={20} color={twColors.white} />}
          </div>
        )}
      </div>

      <div className="relative border-t-[1px] border-t-white border-dashed my-[12px]" />

      <div className="relative w-full inline-flex justify-between">
        <p className="text-[12px] font-light">Số lượt sử dụng: {item.max_number}</p>
        <p className="text-[12px] font-light">Còn lại: {item.max_number - item.used_number}</p>
      </div>

      {item.status === 'used' && (
        <p className="relative text-[12px] text-start mt-[12px]">(Đã sử dụng)</p>
      )}
    </button>
  );
};

export default ItemVoucher;
