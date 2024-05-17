import { useRouter } from '@/hooks';
import { cn } from '@/lib';
import { useEffect, experimental_useOptimistic as useOptimistic, useState } from 'react';
import SearchInput from './SearchInput';

interface SearchInputProps {
  searchData: string;
  className?: string;
}

const SearchInputBase = ({ searchData, className }: SearchInputProps) => {
  const searched = !!searchData;

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 bg-[#F9F9F9] w-[min(813px,_90%)] rounded-[20px] sm:rounded-[36px]',
        className,
        searched ? 'p-[10px_16px] sm:p-[16px_24px]' : 'p-[20px_20px] sm:p-[36px_36px]',
      )}
    >
      <div className="flex items-center w-full gap-4">
        {searchIcon}
        <SearchInput searchData={searchData} />
      </div>
    </div>
  );
};

const searchIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
      stroke="#1E1E1E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SearchInputBase;
