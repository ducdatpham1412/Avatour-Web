'use client';
import { useRouter } from '@/hooks';
import { cn } from '@/lib';
import {
  useCallback,
  useEffect,
  experimental_useOptimistic as useOptimistic,
  useRef,
  useState,
} from 'react';

interface SearchInputProps {
  searchData: string;
  className?: string;
}

const SearchInput = ({ searchData, className }: SearchInputProps) => {
  const [value, setValue] = useState(searchData);
  const router = useRouter();
  const searched = !!searchData;
  const timeout = useRef<NodeJS.Timeout>();

  const search = useCallback(() => {
    router.push(`/search/${value}`);
    clearTimeout(timeout.current);
  }, [value]);

  useEffect(() => {
    if (value) {
      timeout.current = setTimeout(() => {
        router.push(`/search/${value}`);
      }, 2000);

      return () => {
        clearTimeout(timeout.current);
      };
    }
  }, [value]);

  return (
    <input
      placeholder="Tìm địa điểm ở đây"
      value={value}
      onKeyPress={e => {
        if (e.which === 13) {
          search();
        }
      }}
      className={cn(
        'w-full focus:outline-none outline-none border-b-[2px] duration-200 border-transparent h-[40px] bg-transparent',
        searched
          ? 'text-[14px] sm:text-[16px]'
          : 'text-[16px] sm:text-[20px] focus:border-[#000000] [&:not(:placeholder-shown)]:border-[#000000]',
      )}
      onChange={e => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
