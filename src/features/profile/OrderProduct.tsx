'use client';
import { isNumber } from 'lodash';
import { useRouter } from 'next/navigation';
import { useMemo, useRef, useState } from 'react';

import Container from '@/app/container';
import { useAppContext } from '@/app/provider';
import { SuccessScreen } from '@/components';
import { Button, Checkbox, Image, Input, Textarea } from '@/components/ui';
import { getPhone } from '@/lib/storage';
import { formatPrice } from '@/lib/format';
import { toastErr } from '@/hooks';

import { useProduct } from './hooks';

type Props = PageProps<{ product_id: string }>;

const OrderProduct = ({ params }: Props) => {
  const router = useRouter();
  const [{ profile }, { setProfile }] = useAppContext();
  const [{ data, loadingOrderProduct }, { orderProduct }] = useProduct(params.product_id);

  const defaultPhone = useMemo(() => profile?.phone ?? getPhone() ?? '', []);

  const [numberOrder, setNumberOrder] = useState('1');
  const [address, setAddress] = useState(profile?.location ?? '');
  const [phone, setPhone] = useState(defaultPhone);
  const [checked, setChecked] = useState(true);
  const note = useRef('');

  const [success, setSuccess] = useState(false);

  const isValid = numberOrder && address && phone;

  const onOrder = async () => {
    if (data) {
      try {
        await orderProduct({
          product_id: data.id,
          number_order: Number(numberOrder),
          address,
          phone,
          is_save: checked,
          note: note.current,
        });

        setProfile(pre => {
          if (pre) {
            return {
              ...pre,
              location: address,
              phone,
            };
          }
        });

        setSuccess(true);
      } catch (err) {
        toastErr(err);
      }
    }
  };

  const content = () => {
    if (data) {
      if (success) {
        return (
          <SuccessScreen
            title="Đặt mua thành công"
            description={`Chúng tôi sẽ liên hệ lại với bạn qua số ${phone}, Avatour xin chân thành cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi`}
            onOk={() => router.back()}
          />
        );
      }

      return (
        <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto pb-[100px]">
          <div className="w-full inline-flex flex-col gap-8">
            <div className="w-full inline-flex gap-x-2 overflow-x-auto overflow-y-hidden beautiful-scrollbar">
              {data.images.map((img, i) => {
                return (
                  <Image
                    key={i}
                    src={img}
                    className="w-[150px] h-[150px] rounded-[14px] hover-slow"
                  />
                );
              })}
            </div>

            <p className="text-[20px]">
              Đặt mua <span className="font-semibold">{data.name}</span>
            </p>

            <div className="w-full inline-flex flex-col gap-2">
              <p className="font-semibold text-[16px]">
                <span className="text-red">* </span>
                Số lượng mua
              </p>
              <div className="w-full inline-flex flex-col md:flex-row gap-2 items-start md:items-center">
                <Input
                  className="w-full md:w-[30%] border-gray_400 h-12 text-[16px]"
                  type="tel"
                  placeholder="Số người"
                  value={numberOrder}
                  onChange={e => {
                    const value = e.target.value;
                    if (isNumber(Number(value))) {
                      setNumberOrder(value);
                    }
                  }}
                />
                <p>
                  Tổng giá: {}
                  <span className="text-p_700 font-semibold">
                    {formatPrice(data.price * Number(numberOrder))}đ
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full inline-flex flex-col gap-2">
              <p className="font-semibold text-[16px]">
                <span className="text-red">* </span>
                Chọn địa chỉ nhận hàng
              </p>
              <Input
                className="border-gray_400 text-[14px] h-12"
                placeholder="Địa chỉ"
                defaultValue={address}
                onChange={e => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className="w-full inline-flex flex-col gap-2">
              <p className="font-semibold text-[16px]">
                <span className="text-red">* </span>
                Số điện thoại liên hệ
              </p>
              <Input
                defaultValue={defaultPhone}
                className="border-gray_400 text-[14px] h-12"
                placeholder="00"
                type="tel"
                onChange={e => {
                  setPhone(e.target.value);
                }}
              />
              <div className="w-full inline-flex gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={v => {
                    setChecked(v as boolean);
                  }}
                />
                <p className="text-[12px]">Lưu số điện thoại vào thông tin cá nhân cho lần sau</p>
              </div>
            </div>

            <div className="w-full inline-flex flex-col gap-2">
              <p className="font-semibold text-[16px]">Thêm ghi chú</p>
              <Textarea
                className="border-gray_400 text-[14px]"
                placeholder="Bạn có gì cần ghi chú thêm không?"
                onChange={e => {
                  note.current = e.target.value;
                }}
              />
            </div>

            <Button loading={loadingOrderProduct} disabled={!isValid} onClick={onOrder}>
              Đặt mua
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <Container background="sun" showFooter={false}>
      {content()}
    </Container>
  );
};

export default OrderProduct;
