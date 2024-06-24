'use client';

import { SearchIcon } from '@/components';
import { cn } from '@/lib';

interface SearchInputProps {
  defaultValue?: string;
  value?: string;
  onChangeValue?: (v: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  onSearch?: () => void;
}

const SearchInputBase = ({
  value,
  defaultValue,
  onChangeValue,
  className,
  placeholder,
  inputClassName,
  onSearch,
}: SearchInputProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 bg-gray_100 w-[min(813px,_90%)] rounded-full p-[16px_16px] sm:p-[16px_24px]',
        className,
      )}
    >
      <div className="flex items-center w-full gap-4">
        <SearchIcon />
        <input
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder ?? 'Khám phá nét đẹp Hà Nội 2 ngày'}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSearch?.();
            }
          }}
          className={cn(
            'w-full focus:outline-none outline-none duration-200 bg-transparent text-ellipsis text-[16px] sm:text-[18px] sm:leading-[28px] font-normal',
            inputClassName,
          )}
          onChange={e => onChangeValue?.(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchInputBase;
