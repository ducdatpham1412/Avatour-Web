import type { PropsWithChildren } from 'react';

import { SearchInputBase } from '../components';
import { Background } from './components';
import { parseSearchData } from './utils';

const SearchResultLayout = ({
  children,
  params,
}: PropsWithChildren<{ params: { search_text: string } }>) => (
  <div className="px-5 pb-[92px] sm:px-40 pt-4 sm:pt-[2px] w-full flex flex-col gap-7">
    <Background />
    <div className="z-20 py-4 sticky top-0 left-0 right-0 bg-background">
      <SearchInputBase searchData={parseSearchData(params.search_text)} className="w-full" />
    </div>
    {children}
  </div>
);

export default SearchResultLayout;
