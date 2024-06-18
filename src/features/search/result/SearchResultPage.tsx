import { getTourList } from '@/api';

import { SearchError, SearchResult } from './screens';

const SearchPageResult = async ({ params }: PageProps) => {
  const searchText = decodeURIComponent(params.search_text as string) || '';
  const response = await getTourList({ text: searchText });

  if ('message' in response) {
    return <SearchError error={response} searchText={searchText} />;
  }

  return <SearchResult data={'data' in response ? response.data : []} />;
};

export default SearchPageResult;
