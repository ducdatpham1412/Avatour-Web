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

import Badge from './Badge';
import withRequest from '../hoc/withRequest';

const RequestChangeAccountModal = withRequest<'upgrade_to_shop'>(
  ({ data, children, active, onConfirm, open, openOpenChange, submiting }) => (
    <>
      {console.log('open', open)}
      {cloneElement(children, { ...children.props, onClick: () => openOpenChange(true) })}
      <Dialog open={open} onOpenChange={e => openOpenChange(e)}>
        <DialogContent
          closeButton={
            <div className="p-[10px]">
              <Icon name="close" size={16} />
            </div>
          }
          className="!w-min min-w-[550px] h-min xl:max-h-[calc(100vh_-_40px)] xl max-w-full max-h-full bg-background gap-3 overflow-hidden !rounded-2xl"
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
              <span className="font-[500]">Chuyển đổi thành tài khoản cửa hàng theo thông tin</span>
              <ul className="list-[disc] pl-[30px] flex flex-col gap-4">
                <li>
                  <span className="font-bold">Tên cửa hàng:</span> <span>{data.data.name}</span>
                </li>
                <li>
                  <span className="font-bold">Địa chỉ:</span> <span>{data.data.location}</span>
                </li>
                <li>
                  <span className="font-bold">Số điện thoại:</span> <span>{data.data.phone}</span>
                </li>
                <li>
                  <span className="font-bold">Ngân hàng:</span> <span>{data.data.bank_code}</span>
                </li>
                <li>
                  <span className="font-bold">Tài khoản ngân hàng:</span>{' '}
                  <span>{data.data.bank_account}</span>
                </li>
              </ul>
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

export default RequestChangeAccountModal;
