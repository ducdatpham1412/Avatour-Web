import { ReactElement, ReactNode, cloneElement, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  Divider,
  Image,
  ToastAction,
} from '@/components/ui';
import { Icon } from '@/components/icon';
import { REQUEST_STATUS } from '@/configs/constants';
import { confirmRequest } from '@/api/admin/requests';
import { useToast } from '@/hooks';
import { formatPrice } from '@/lib';

import Badge from './Badge';
import withRequest from '../hoc/withRequest';

const RequestUpdatePriceModal = withRequest<'update_price'>(
  ({ data, children, active, onConfirm, open, openOpenChange, submiting }) => (
    <>
      {cloneElement(children, { ...children.props, onClick: () => openOpenChange(true) })}
      <Dialog open={open} onOpenChange={e => openOpenChange(e)}>
        <DialogContent
          closeButton={
            <div className="p-[10px]">
              <Icon name="close" size={16} />
            </div>
          }
          className="!w-min min-w-[650px] h-min xl:max-h-[calc(100vh_-_40px)] xl max-w-full max-h-full bg-white gap-3 overflow-hidden !rounded-2xl"
        >
          <DialogHeader className="font-bold text-[18px]">Chi tiết yêu cầu</DialogHeader>
          <div className="w-full">
            <div className="h-[3px] w-[200%] -translate-x-1/3">
              <Divider size="md" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={data.creator_avatar}
                  className="w-[32px] h-[32px] min-w-[32px] rounded-full bg-gray_300 [&_>_img]:!object-cover"
                />
                <span className="font-bold">{data.creator_name}</span>
              </div>
              <Badge type={data.type} />
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-[600]">Yêu cầu cập nhật thông tin</span>
              <div className="flex gap-3 items-stretch">
                <UpdatePriceItem type="old" data={data.data} />
                <UpdatePriceItem type="new" data={data.data} />
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-2 !items-end !justify-center pt-[25px] pb-[5px]">
            <Button
              variant="secondary"
              className="rounded-full w-[180px] h-[39px] font-bold"
              onClick={() => openOpenChange(false)}
            >
              Quay lại
            </Button>
            {active && (
              <Button
                className="rounded-full w-[180px] h-[39px] font-bold"
                onClick={onConfirm}
                loading={submiting}
              >
                Duyệt yêu cầu
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  ),
);

const UpdatePriceItem = ({ data, type }: { data: UpdatePrice; type: 'old' | 'new' }) => (
  <div className="flex flex-col p-4 bg-gray-50 rounded-[16px] w-1/2 gap-2">
    <span className="font-bold">{type === 'new' ? 'Cập nhật' : 'Hiện tại'}</span>
    <div className="flex items-start gap-2">
      <Image
        src={data.sale.images[0]}
        className="w-[64px] h-[64px] rounded-[8px] overflow-hidden"
      />
      <div className="flex flex-col gap-2">
        <span className="font-bold">{data.sale.name}</span>
        <ul className="list-[disc] pl-[30px] flex flex-col gap-1">
          {(type === 'new' ? data : data.sale).prices?.map((price, index) => (
            <li key={index}>
              {price.number_people} suất - {formatPrice(price.price)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default RequestUpdatePriceModal;
