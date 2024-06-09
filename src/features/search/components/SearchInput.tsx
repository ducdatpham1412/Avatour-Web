'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from '@/hooks';
import { cn } from '@/lib';

interface SearchInputProps {
  searchData?: string;
}

const SearchInput = ({ searchData = '' }: SearchInputProps) => {
  const [value, setValue] = useState(searchData);
  const router = useRouter();
  const searched = !!searchData;
  const timeout = useRef<NodeJS.Timeout>();

  const search = useCallback(() => {
    router.push(`/search/${value}`);
    clearTimeout(timeout.current);
  }, [value]);

  // useEffect(() => {
  //   if (value) {
  //     timeout.current = setTimeout(() => {
  //       router.push(`/search/${value}`);
  //     }, 2000);

  //     return () => {
  //       clearTimeout(timeout.current);
  //     };
  //   }
  // }, [value]);

  return (
    <input
      placeholder="Khám phá nét đẹp Hà Nội 2 ngày"
      value={value}
      onKeyPress={e => {
        if (e.which === 13) {
          search();
        }
      }}
      className={cn(
        'w-full font-normal focus:outline-none outline-none duration-200 bg-transparent text-ellipsis',
        searched
          ? 'text-[15px] sm:text-[16px] leading-[24px] font-normal'
          : 'text-[16px] sm:text-[18px] sm:leading-[28px] font-normal',
      )}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
