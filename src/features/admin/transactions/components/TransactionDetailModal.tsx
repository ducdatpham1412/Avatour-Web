import dayjs from 'dayjs';
import { memo, useCallback, useMemo } from 'react';

import { Icon } from '@/components/icon';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Divider,
  Image,
  Show,
} from '@/components/ui';
import { STATUS_JOIN_ESTIMATE } from '@/configs/constants';
import { formatPrice } from '@/lib';

import { getTransactionDeposit, getTransactionPrice } from '../lib/transaction';
import { TransactionData } from '../types';
import Badge from './Badge';
import GroupSlider from './GroupSlider';
import TransactionConfirmModal from './TransactionConfirmModal';

interface TransactionDetailModalProps {
  open: boolean;
  data?: TransactionData['data'][number];
  onOpenChange?: (open: boolean) => void;
}

const TransactionDetailModal = memo(({ open, data, onOpenChange }: TransactionDetailModalProps) => {
  const toggleDialog = useCallback(() => onOpenChange && onOpenChange(!open), [open]);

  const closeButton = useMemo(
    () => (
      <div className="p-[10px]">
        <Icon name="close" size={16} />
      </div>
    ),
    [],
  );

  const canConfirm = useMemo(
    () => data?.status === STATUS_JOIN_ESTIMATE.active || data?.status === 7,
    [data?.status],
  );

  const timeWillBuy = useMemo(
    () => dayjs(data?.time_will_buy).format('DD/MM/YYYY'),
    [data?.time_will_buy],
  );

  const price = useMemo(() => getTransactionPrice(data), [data?.list_personals]);

  const deposit = useMemo(() => getTransactionDeposit(data, price), [price, data?.list_personals]);

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogContent
        closeButton={closeButton}
        className="!w-[700px] h-min min-h-[600px] xl:max-h-[calc(100vh_-_40px)] xl max-w-full max-h-full bg-background gap-3 overflow-hidden !rounded-2xl"
      >
        <DialogHeader className="font-bold">Chi tiết đơn hàng #{data?.hash}</DialogHeader>
        <div className="w-full">
          <div className="h-[3px] w-[200%] -translate-x-1/3">
            <Divider size="md" />
          </div>
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex">
            <div className="flex flex-col gap-1 flex-grow justify-center">
              <div className="font-bold">Người order: {data?.creator_name}</div>
              <div className="text-xs">Cửa hàng: {data?.sale?.creator_name}</div>
            </div>
            <div>
              <Badge type={data?.status} />
            </div>
          </div>
          <div className="flex gap-3">
            <div>
              <Image
                src={data?.sale?.images[0] ?? ''}
                className="w-[64px] h-[64px] border-[1px] rounded-lg [&_>_img]:!object-cover"
              />
            </div>
            <div className="flex flex-col justify-center flex-grow">
              <div className="flex justify-between [&_>_*]:font-bold">
                <div className="">{data?.sale?.name}</div>
                <div>x{data?.amount}</div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="w-full flex justify-between items-center">
            <div>Lịch hẹn</div>
            <div className="font-bold">{timeWillBuy}</div>
          </div>
          {/* <div className="w-full overflow-hidden">
            <div className="h-[1px] w-[200%] -translate-x-1/3 bg-gray_300/60"></div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div>Khoảng dự tính</div>
            <div>440,000 ~ 500,000 đ</div>
          </div> */}
          <Divider />
          {/* <div className="w-full flex justify-between items-center">
            <div>Khoảng dự tính</div>
            <div className="font-bold text-red">đ</div>
          </div>
          <div className="w-full overflow-hidden">
            <div className="h-[1px] w-[200%] -translate-x-1/3 bg-gray_300/60"></div>
          </div> */}
          <div className="w-full flex justify-between items-center">
            <div>Tổng hiện tại</div>
            <div className="font-bold text-red">{formatPrice(price)} đ</div>
          </div>
          <Divider />
          <div className="w-full flex justify-between items-center">
            <div>Đặt cọc (20%)</div>
            <div className="font-bold text-red">{formatPrice(deposit)} đ</div>
          </div>
          <Divider />
          <div className="font-bold">Bảng giá áp dụng</div>
          <GroupSlider data={data?.list_personals}></GroupSlider>
        </div>
        <DialogFooter className="flex-grow flex flex-row gap-4 !items-end !justify-center">
          <Button
            className="w-[185px] rounded-full font-semibold"
            variant="secondary"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            Quay lại
          </Button>
          <Show when={canConfirm}>
            <TransactionConfirmModal data={data}>
              <Button className="w-[185px] rounded-full font-semibold">Duyệt đơn</Button>
            </TransactionConfirmModal>
          </Show>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export type { TransactionDetailModalProps };
export default TransactionDetailModal;
