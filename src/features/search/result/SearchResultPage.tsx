import { getTourList } from '@/api/search/list';

import { SearchResult } from './components';

const SearchPageResult = async ({ params }: PageProps) => {
  const response = await getTourList({ text: decodeURIComponent(params.search_text as string) });

  return <SearchResult data={'data' in response ? response.data : []} />;
};

export default SearchPageResult;
