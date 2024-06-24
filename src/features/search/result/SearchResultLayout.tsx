'use client';
import { useRouter } from 'next/navigation';
import { useRef, type PropsWithChildren } from 'react';

import { SEARCH_ROUTES } from '@/configs/routes';
import { cn } from '@/lib';

import { SearchInputBase } from '../components';
import { Background } from './components';
import { parseSearchData } from './utils';

const SearchResultLayout = ({
  children,
  params,
}: PropsWithChildren<{ params: { search_text: string } }>) => {
  const router = useRouter();
  const search = useRef(parseSearchData(params.search_text));

  return (
    <div className="px-5 pb-[92px] sm:px-40 pt-4 sm:pt-[2px] w-full flex flex-col gap-7">
      <Background />
      <div className="z-20 py-4 sticky top-0 left-0 right-0 bg-background">
        <SearchInputBase
          inputClassName="text-[15px] sm:text-[16px] leading-[24px]"
          className={cn('w-full', 'p-[12px_16px] sm:p-[16px_24px]')}
          onSearch={() => router.push(SEARCH_ROUTES.searchResult(search.current))}
          onChangeValue={v => (search.current = v)}
          defaultValue={search.current}
        />
      </div>
      {children}
    </div>
  );
};

export default SearchResultLayout;
