import { cn } from '@/lib';
import SearchInputBase from './components/SearchInputBase';

interface BodyProps {
  searchData: string;
}

const Body = ({ searchData }: BodyProps) => {
  const searched = !!searchData;

  return (
    <div className="flex flex-col items-center justify-between pt-[150px] gap-16">
      <div className={cn('flex flex-col items-center', searched ? 'hidden' : '')}>
        <span className="text-p_600 text-[20px] sm:text-[32px] font-semibold">
          Avatour xin chào,
        </span>
        <span className="text-[20px] sm:text-[32px] font-medium text-center">
          Bạn muốn khám phá địa điểm nào?
        </span>
      </div>
      <SearchInputBase searchData={searchData} />
    </div>
  );
};

export default Body;
