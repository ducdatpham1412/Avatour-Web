import Navbar from '@/components/Navbar';

import Background from './Background';
import SearchInputBase from './components/SearchInputBase';

type SearchLayoutProps = {
  children: React.ReactNode;
  params: Record<string, string | undefined>;
};

const SearchLayout = ({ children, params }: SearchLayoutProps) => {
  console.log('params', params);

  return (
    <div className="relative w-full min-h-[100vh] bg-white">
      <Background />
      <Navbar />
      {children}
    </div>
  );
};

const SearchLayoutResult = ({ children, params }: SearchLayoutProps) => (
    <div className="relative max_ssm:px-10 px-24 pb-80 sm:px-40 pt-[150px] w-full flex flex-col gap-6">
      <div className="w-full">
        <SearchInputBase searchData={parseSearchData(params.search_text)} className="w-full" />
      </div>
      {children}
    </div>
  );

function parseSearchData(search: string | string[] | undefined) {
  return decodeURIComponent(search ? (Array.isArray(search) ? search[0] : search) : '');
}

export { SearchLayoutResult };
export default SearchLayout;
