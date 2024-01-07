import { memo } from 'react';

import { cn } from '@/lib';
import { STATUS_JOIN_ESTIMATE } from '@/configs/constants';

type BadgeProps = {
  type?: number;
};

interface BadgeStyle {
  className: string;
  children: string;
}

const styleBase: Record<number, BadgeStyle> = {
  [STATUS_JOIN_ESTIMATE.notActive]: {
    className: 'bg-neutral-300 border-none text-neutral-500',
    children: 'Bị huỷ',
  },
  [STATUS_JOIN_ESTIMATE.active]: {
    className: 'border border-neutral-400 text-black',
    children: 'Chưa duyệt',
  },
  [STATUS_JOIN_ESTIMATE.adminConfirm]: {
    className: 'bg-p_100 border-none text-black',
    children: 'Đã duyệt',
  },
  [STATUS_JOIN_ESTIMATE.overtime]: {
    className: 'bg-gray_100 border-none text-black',
    children: 'Quá hẹn',
  },
  [STATUS_JOIN_ESTIMATE.consumerConfirmed]: {
    className: 'bg-blue/20 border-none text-blue',
    children: 'ND đã đến',
  },
  [STATUS_JOIN_ESTIMATE.supplierConfirmBought]: {
    className: 'border border-neutral-400 text-black',
    children: 'Chờ CH nhận',
  },
  [STATUS_JOIN_ESTIMATE.supplierConfirmed]: {
    className: 'bg-p_100 border-none text-black',
    children: 'CH đã nhận',
  },
  [STATUS_JOIN_ESTIMATE.supplierRejected]: {
    className: 'bg-red/20 border-none text-green',
    children: 'CH từ chối',
  },
};

const Badge = memo(({ type = 0 }: BadgeProps) => {
  const status = styleBase[type] ?? styleBase[0];

  return (
    <div
      className={cn(
        'min-w-[140px] h-[39px] px-[10px] flex items-center justify-center rounded-full whitespace-nowrap',
        status.className,
      )}
    >
      {status.children}
    </div>
  );
});

export default Badge;
