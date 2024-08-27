'use client';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import Container from '@/app/container';
import { useAppContext } from '@/app/provider';
import { SuccessScreen } from '@/components';
import { Button, Checkbox, Input, Textarea } from '@/components/ui';
import { toast } from '@/hooks';
import { parseErrorMessage } from '@/lib';
import { formatUTCTime } from '@/lib/format';
import { getPhone, setPhone as setPhoneStorage } from '@/lib/storage';

import { useBuddies } from '../buddy/hooks';
import { useProfile } from './hooks';

type Props = PageProps<{ buddy_id: number }>;

const OrderBuddy = ({ params }: Props) => {
  const router = useRouter();
  const [{ profile }, { setProfile }] = useAppContext();
  const [{ data }] = useProfile(params.buddy_id);
  const [{ loadingOrderBuddy }, { orderBuddy }] = useBuddies();

  const [people, setPeople] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs>();
  const [hour, setHour] = useState<dayjs.Dayjs>();
  const [phone, setPhone] = useState(profile?.phone ?? getPhone() ?? '');
  const [checked, setChecked] = useState(true);
  const note = useRef('');
  const [success, setSuccess] = useState(false);

  const isValid = people && date && hour && phone;

  const onOrder = async () => {
    // if (1 === 1) {
    //   const element = document.getElementById('scrollTop');
    //   if (element) {
    //     element.scrollTo({ top: 0, behavior: 'instant' });
    //   }
    //   return;
    // }

    if (isValid && data) {
      try {
        await orderBuddy({
          time: formatUTCTime(date.hour(hour.hour()).minute(hour.minute())),
          phone,
          is_save: checked,
          note: note.current,
          supplier: data.id,
          number_people: Number(people),
        });
        if (checked) {
          setPhoneStorage(phone);
          setProfile(pre => {
            if (pre) {
              return {
                ...pre,
                phone,
              };
            }
          });
        }
        const element = document.getElementById('scrollTop');
        if (element) {
          element.scrollTo({ top: 0 });
        }
        setSuccess(true);
      } catch (err) {
        toast({
          variant: 'destructive',
          description: parseErrorMessage(err),
        });
      }
    }
  };

  const content = () => {
    if (data) {
      if (success) {
        return (
          <SuccessScreen
            title="Đặt lịch thành công"
            description={`Chúng tôi sẽ liên hệ lại với bạn qua số ${phone}, Avatour xin chân thành cảm ơn bạn đã quan tâm đến dịch vụ của chúng tôi`}
            onOk={() => router.back()}
          />
        );
      }

      const [activity, name] = data.name.split(', ');

      return (
        <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto pb-[100px]">
          <div className="w-full inline-flex flex-col gap-8">
            <p className="text-[20px]">
              Đặt lịch <span className="font-semibold">{activity}</span> cùng{' '}
              <span className="font-semibold">{name}</span>
            </p>

            <div className="w-full inline-flex flex-col gap-2">
              <p className="font-semibold text-[16px]">
                <span className="text-red">* </span>
                Bạn đi bao nhiêu người?
              </p>
              <div className="w-full inline-flex flex-col md:flex-row gap-2 items-start md:items-center">
                <Input
                  className="w-full md:w-[30%] border-gray_400 h-12 text-[16px]"
                  type="tel"
                  placeholder="Số người"
                  value={people}
                  onChange={e => {
                    const value = e.target.value;
                    if (isNumber(Number(value))) {
                      setPeople(value);
                    }
                  }}
                />
                <p className="text-[12px]">{data.info?.info_cost}</p>
              </div>
            </div>

            <div className="w-full inline-flex flex-col gap-2">
              <p className="font-semibold text-[16px]">
                <span className="text-red">* </span>
                Chọn thời gian
              </p>
              <div className="w-full inline-flex flex-col md:flex-row gap-4">
                <DatePicker
                  minDate={dayjs()}
                  value={date}
                  onChange={v => {
                    if (v) {
                      setDate(v);
                    }
                  }}
                  label="Ngày đặt lịch"
                  format="dddd, DD/MM/YY"
                  className="flex flex-1"
                />
                <TimePicker
                  value={hour}
                  label="Giờ đến"
                  className="flex flex-2"
                  onChange={v => {
                    if (v) {
                      setHour(v);
                    }
                  }}
                />
              </div>
            </div>

            <div className="w-full inline-flex flex-col gap-2">
              <p className="font-semibold text-[16px]">
                <span className="text-red">* </span>
                Số điện thoại liên hệ
              </p>
              <Input
                defaultValue={profile?.phone ?? getPhone() ?? ''}
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
                placeholder="Ghi chú thêm để chúng tôi giúp bạn trải nghiệm chuyến đi tốt hơn"
                onChange={e => {
                  note.current = e.target.value;
                }}
              />
            </div>

            <Button loading={loadingOrderBuddy} disabled={!isValid} onClick={onOrder}>
              Đặt lịch
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

export default OrderBuddy;
