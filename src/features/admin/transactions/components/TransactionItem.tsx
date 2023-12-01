import { memo, useMemo, useState } from 'react';
import dayjs from 'dayjs';

import { Icon } from '@/components/icon';
import { Image, Show } from '@/components/ui';
import { formatPrice } from '@/lib';
import { STATUS_JOIN_ESTIMATE } from '@/configs/constants';

import Badge from './Badge';
import { TransactionData } from '../types';
import TransactionDetailModal from './TransactionDetailModal';
import { getTransactionDeposit, getTransactionPrice } from '../lib/transaction';

export interface TransactionItemProps {
  data: TransactionData['data'][number];
  onSubmitEnd?: () => void;
}

const TransactionItem = memo(({ data }: TransactionItemProps) => {
  const [open, setOpen] = useState(false);

  const status = useMemo(() => {
    const expired = new Date(timeParse(data.expired)).getTime() < Date.now();
    if (data.status === STATUS_JOIN_ESTIMATE.active && expired) return 7;
    return data.status;
  }, [data.status]);

  const price = useMemo(() => getTransactionPrice(data), [data?.list_personals]);

  const deposit = data.deposit ?? 0;

  const transactionDetail = useMemo(() => ({ ...data, status }), [status, data]);

  return (
    <>
      <tr className="h-[85px] [&>td>div]:!h-[58px] cursor-pointer" onClick={() => setOpen(true)}>
        <td className="bg-white rounded-[20px_0_0_20px]">
          <div className="p-4 flex items-center">{data.hash}</div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px] gap-2">
            <Image
              src={data.sale?.images[0] ?? ''}
              className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-gray_300 [&_>_img]:!object-cover"
            />
            {data.creator_name}
          </div>
        </td>
        <td className="bg-white">
          <div className="flex flex-col justify-center items-start min-h-[40px] p-[0_10px] border-l-[1px]">
            <h4 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis">
              {data.sale?.creator_name}
            </h4>
            <span className="text-gray_600">
              x{data?.amount ?? 0} <span className="ml-2">{data.sale?.name}</span>
            </span>
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            {formatPrice(price)}đ
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            {formatPrice(deposit ?? 0)}đ
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center gap-1 min-h-[40px] p-[0_10px] border-l-[1px]">
            <span className="hidden">{dayjs(timeParse(data.created)).format('YYYY-MM-DD')}</span>
            <span>{dayjs(timeParse(data.created)).format('DD/MM/YYYY')}</span>
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            <Badge type={transactionDetail.status} />
          </div>
        </td>
        <td className="bg-white rounded-[0_20px_20px_0]">
          <div className="flex items-center min-h-[40px] p-[0_10px] ">
            <Show.Const when={status === 7 || status === STATUS_JOIN_ESTIMATE.active}>
              <button>
                <Icon name="transaction-active" size={36} />
              </button>
            </Show.Const>
          </div>
        </td>
      </tr>
      <TransactionDetailModal open={open} data={transactionDetail} onOpenChange={setOpen} />
    </>
  );
});

function timeParse(time = '') {
  return time.split('.')[0];
}

export default TransactionItem;
