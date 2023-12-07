import { ReactElement, useCallback, useMemo, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  ToastAction,
} from '@/components/ui';
import { formatPrice } from '@/lib';
import { confirmDeposit } from '@/api';
import { useToast } from '@/hooks';

import { TransactionData } from '../types';
import ModalHeadIcon from './ModalHeadIcon';
import { getTransactionPrice } from '../lib/transaction';

interface TransactionConfirmModalProps {
  data?: TransactionData['data'][number];
  children: ReactElement;
  onSubmitEnd?: () => Promise<void>;
}

const TransactionConfirmModal = ({ data, children, onSubmitEnd }: TransactionConfirmModalProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [submiting, setSubmiting] = useState(false);

  const toggleDialog = useCallback(() => setOpen(prev => !prev), []);

  const price = useMemo(() => data?.deposit ?? 0, [data?.deposit]);

  async function onConfirm() {
    if (!data || !data.id) {
      return;
    }
    setSubmiting(true);
    const { error } = await confirmDeposit(data.id);

    if (!error) {
      toast({
        title: 'Thông báo',
        description: 'Xác nhận đơn hàng thành công',
      });
      setOpen(false);
    } else {
      await onSubmitEnd?.();
      toast({
        title: 'Thông báo',
        description: 'Xác nhận đơn hàng thất bại',
        variant: 'destructive',
        action: (
          <ToastAction onClick={() => onConfirm()} altText="Thử lại">
            Thử lại
          </ToastAction>
        ),
      });
    }

    setSubmiting(false);
  }

  return (
    <Dialog open={open} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        closeButton={<></>}
        className="!w-[480px] h-min xl:max-h-[calc(100vh_-_40px)] xl max-w-full max-h-full bg-background gap-3 overflow-hidden !rounded-2xl !p-0"
      >
        <DialogHeader className="bg-p_600 h-[100px]" />
        <div className="bg-white -mt-6 rounded-2xl relative">
          <div className="absolute left-1/2 -top-0 -translate-x-1/2 -translate-y-1/2 mt-1">
            <ModalHeadIcon />
          </div>
          <div className="flex flex-col items-center gap-6 pt-[80px] px-[70px] pb-11">
            <div className="font-bold text-center">
              Bạn chắc chắn muốn duyệt đơn đặt cọc{' '}
              <span className="text-[#54B3E9]">{data?.hash}</span> với số tiền{' '}
              <span className="text-red">{formatPrice(price)} đ</span> không?
            </div>
            <div className="flex gap-4 w-full">
              <Button
                variant="outline"
                className="w-1/2 rounded-full font-semibold"
                onClick={toggleDialog}
              >
                Quay lại
              </Button>
              <Button
                loading={submiting}
                onClick={onConfirm}
                className="w-1/2 rounded-full font-semibold"
              >
                Duyệt
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export type { TransactionConfirmModalProps };
export default TransactionConfirmModal;
