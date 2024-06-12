import dayjs from 'dayjs';
import { Fragment, ReactElement, memo, useCallback, useMemo } from 'react';

import { Image } from '@/components/ui';
import { REQUEST_STATUS, TYPE_AUTH_REQUEST } from '@/configs/constants';

import Badge from './Badge';
import RequestChangeAccountModal from './RequestChangeAccountModal';
import RequestSuggestLocationModal from './RequestSuggestLocationModal';
import RequestUpdateBankModal from './RequestUpdateBankModal';
import RequestUpdatePriceModal from './RequestUpdatePrice';

export interface TransactionItemProps {
  data: TypeGetRequestResponse;
  onSubmitEnd: () => Promise<void>;
}

const TransactionItem = memo(({ data, onSubmitEnd }: TransactionItemProps) => {
  const requestName = useMemo(() => {
    switch (data.type) {
      case TYPE_AUTH_REQUEST.upgrade_to_shop:
        return `Tên cửa hàng: ${data.data.name}`;

      case TYPE_AUTH_REQUEST.suggest_location:
        return data.data.location;

      case TYPE_AUTH_REQUEST.update_bank:
        return 'Cập nhật thông tin ngân hàng';

      case TYPE_AUTH_REQUEST.update_price:
        return (
          <span>
            Cập nhật mặt hàng <span className="font-bold">{data.data.sale.name}</span>
          </span>
        );

      default:
        break;
    }
  }, [data.type]);

  const requestStatus = useMemo(() => {
    switch (data.status) {
      case REQUEST_STATUS.active:
        return <span className="text-black">Chưa duyệt</span>;

      case REQUEST_STATUS.confirmed:
        return <span className="text-green">Đã duyệt</span>;

      case REQUEST_STATUS.rejected:
        return <span className="text-red">Từ chối</span>;

      case REQUEST_STATUS.notActive:
        return <span className="text-red">Đã hủy</span>;

      default:
        break;
    }
  }, [data.status]);

  const Modal = useCallback(
    ({ children }: { children: ReactElement }) => {
      switch (data.type) {
        case TYPE_AUTH_REQUEST.upgrade_to_shop:
          return (
            <RequestChangeAccountModal data={data} onUpdate={onSubmitEnd}>
              {children}
            </RequestChangeAccountModal>
          );
        case TYPE_AUTH_REQUEST.update_price:
          return data.data.sale.id ? (
            <RequestUpdatePriceModal data={data} onUpdate={onSubmitEnd}>
              {children}
            </RequestUpdatePriceModal>
          ) : (
            <></>
          );
        case TYPE_AUTH_REQUEST.suggest_location:
          return (
            <RequestSuggestLocationModal data={data} onUpdate={onSubmitEnd}>
              {children}
            </RequestSuggestLocationModal>
          );
        case TYPE_AUTH_REQUEST.update_bank:
          return (
            <RequestUpdateBankModal data={data} onUpdate={onSubmitEnd}>
              {children}
            </RequestUpdateBankModal>
          );
        default:
          return <Fragment>{children}</Fragment>;
      }
    },
    [data.type, data.status],
  );

  return (
    <Modal>
      <tr className="h-[70px] [&>td>div]:!h-[58px] cursor-pointer">
        <td className="bg-white rounded-[30px_0_0_30px]">
          <div className="flex items-center gap-1 min-h-[40px] p-[0_10px]">
            <span className="text-center inline-block w-full font-bold">
              {dayjs(timeParse(data.created)).format('DD/MM/YYYY HH:MM')}
            </span>
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px] gap-2">
            <Image
              src={data.creator_avatar}
              className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-gray_300 [&_>_img]:!object-cover"
            />
            {data.creator_name}
          </div>
        </td>
        <td className="bg-white">
          <div className="flex flex-col justify-center items-start min-h-[40px] p-[0_10px] border-l-[1px]">
            <span>{requestName}</span>
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            <Badge type={data.type} />
          </div>
        </td>
        <td className="bg-white rounded-[0_30px_30px_0]">
          <div className="flex items-center min-h-[40px] p-[0_10px] ">
            <span>{requestStatus}</span>
          </div>
        </td>
      </tr>
    </Modal>
  );
});

function timeParse(time = '') {
  return time.split('.')[0];
}

export default TransactionItem;
