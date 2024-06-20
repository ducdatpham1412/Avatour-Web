import { Image } from '@/components/ui';
import { formatTourDuration, formatTourName, formatTourPrice } from '@/lib/format';

interface Props {
  item: TypeTour;
  onClick?: () => void;
}

const ItemTour = ({ item, onClick }: Props) => {
  return (
    <div role="button" onClick={onClick} className="w-full md:w-[48%] lg:w-full xl:w-[48%]">
      <Image src={item.schedule[0][0].avatar} className="w-full aspect-[306/204] rounded-[14px]" />
      <p className="text-[16px] mt-[8px] line-clamp-2 font-medium">{formatTourName(item)}</p>
      <p className="text-[14px]">
        <span className="text-p_700 ">{formatTourPrice(item.min_cost, item.max_cost)}</span>
        <span className="text-gray_400 ">・</span>
        <span className="text-gray_500 ">{formatTourDuration(item.schedule.length)}</span>
      </p>
    </div>
  );
};

export default ItemTour;
