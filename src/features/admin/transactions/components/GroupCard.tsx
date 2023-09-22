import 'swiper/css';
import 'swiper/css/pagination';
import { Image } from '@/components/ui';
import { formatPrice } from '@/lib';

type GroupCardProps = {
  data: TypeJoinPersonal;
};

function GroupCard({ data }: GroupCardProps) {
  const groupName = data.group.id === null ? 'Dự tính' : data.group.name;
  return (
    <div className="flex flex-col gap-2 rounded-2xl border-[1px] border-gray_400 w-full h-full bg-white text-base p-4 cursor-grab [&_>_*]:cursor-grab">
      <div className="flex items-center justify-between">
        <span className="font-bold">Nhóm {groupName}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Nhóm tham gia</span>
        <div className="flex">
          <Image
            src={data.creator_avatar}
            className="rounded-full w-[24px] h-[24px] border-[1px] border-gray_200"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Số lượng</span>
        <span>x{data.amount}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Đơn giá</span>
        <span>{formatPrice(data.price / data.amount)} đ</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Tổng tiền</span>
        <span>{formatPrice(data.price)} đ</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Đã đặt cọc</span>
        <span>{formatPrice(data.deposit)} đ</span>
      </div>
    </div>
  );
}

export { type GroupCardProps, GroupCard as default };
