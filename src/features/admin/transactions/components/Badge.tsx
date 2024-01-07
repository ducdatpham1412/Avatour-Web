import { memo } from 'react';

import { cn } from '@/lib';
import { STATUS_JOIN_ESTIMATE } from '@/configs/constants';

type BadgeProps = {
  type?: number;
};

interface BadgeStyle {
  className: string;
  content: string;
}

const styleBase: Record<number, BadgeStyle> = {
  [STATUS_JOIN_ESTIMATE.notActive]: {
    className: 'bg-neutral-300 border-none text-neutral-500',
    content: 'Bị huỷ',
  },
  [STATUS_JOIN_ESTIMATE.active]: {
    className: 'border border-neutral-400 text-black',
    content: 'Chưa duyệt',
  },
  [STATUS_JOIN_ESTIMATE.expired]: {
    className: 'bg-red/20 text-red',
    content: 'Chưa duyệt',
  },
  [STATUS_JOIN_ESTIMATE.adminConfirm]: {
    className: 'border border-neutral-400 text-black',
    content: 'Chờ CH nhận',
  },
  [STATUS_JOIN_ESTIMATE.supplierConfirm]: {
    className: 'bg-p_200 text-black',
    content: 'CH đã nhận',
  },
  [STATUS_JOIN_ESTIMATE.supplierRejected]: {
    className: 'bg-gray_300 border-[red] border-[1px] text-gray_500',
    content: 'CH từ chối',
  },
  [STATUS_JOIN_ESTIMATE.overtime]: {
    className: 'bg-gray_100 border-none text-black',
    content: 'Quá hẹn',
  },
  [STATUS_JOIN_ESTIMATE.consumerConfirmed]: {
    className: 'bg-blue/20 border-none text-blue',
    content: 'ND đã đến',
  },
  [STATUS_JOIN_ESTIMATE.checkedIn]: {
    className: 'bg-blue/20 border-none text-blue',
    content: 'ND đã đến',
  },
  [STATUS_JOIN_ESTIMATE.supplierConfirmBought]: {
    className: 'bg-green/20 border-none text-green',
    content: 'Thành công',
  },
  [STATUS_JOIN_ESTIMATE.checkedInAndConfirmedBought]: {
    className: 'bg-green/20 border-none text-green',
    content: 'Thành công',
  },
};

const Badge = memo(({ type = 0 }: BadgeProps) => {
  const status = styleBase[type] ?? styleBase[0];

  return (
    <div
      className={cn(
        'min-w-[140px] h-[39px] px-[10px] flex items-center justify-center rounded-full whitespace-nowrap font-[600]',
        status.className,
      )}
    >
      {status.content}
    </div>
  );
});

export default Badge;
