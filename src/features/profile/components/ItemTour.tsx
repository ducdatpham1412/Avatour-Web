import { Image } from '@/components/ui';

interface Props {
  item?: TypeTour;
  onClick?: () => void;
}

const ItemTour = ({ item, onClick }: Props) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="w-full md:w-[48%] lg:w-full xl:w-[48%] pt-[16px]"
    >
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB_lU-KaMEni6n0q-CbMePlma0RsaNcKQUFw&usqp=CAU"
        className="w-full aspect-[306/204] rounded-[14px]"
      />
      <p className="text-[16px] mt-[8px] line-clamp-2 font-medium">BlackPink in your area</p>
      <p className="text-[14px]">
        <span className="text-p_700 ">Khoảng 400 nghìn</span>
        <span className="text-gray_400 ">・</span>
        <span className="text-gray_500 ">Trong ngày</span>
      </p>
    </div>
  );
};

export default ItemTour;
