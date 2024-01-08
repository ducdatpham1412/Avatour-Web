import { memo } from 'react';

import { cn } from '@/lib';
import { TYPE_AUTH_REQUEST } from '@/configs/constants';

type BadgeProps = {
  type?: number;
};

interface BadgeStyle {
  className: string;
  children: string;
}

const styleBase: Record<number, BadgeStyle> = {
  [TYPE_AUTH_REQUEST.upgrade_to_shop]: {
    className: 'bg-p_200 border-none text-black',
    children: 'Chuyển đổi tài khoản',
  },
  [TYPE_AUTH_REQUEST.suggest_location]: {
    className: 'bg-blue/30 text-black',
    children: 'Gợi ý địa điểm',
  },
  [TYPE_AUTH_REQUEST.update_bank]: {
    className: 'bg-green/20 border-none text-black',
    children: 'Cập nhật thông tin',
  },
  [TYPE_AUTH_REQUEST.update_price]: {
    className: 'bg-p_900/30 text-black',
    children: 'Cập nhật mặt hàng',
  },
};

const Badge = ({ type }: BadgeProps) => {
  const status = styleBase[type ?? 2] ?? styleBase[0];

  if (!type) {
    return <></>;
  }

  return (
    <div
      className={cn(
        'h-[39px] flex items-center justify-center rounded-full whitespace-nowrap px-[20px] font-semibold',
        status?.className,
      )}
    >
      {status?.children}
    </div>
  );
};

export default memo(Badge);
