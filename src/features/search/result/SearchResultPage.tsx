import { getTourList, getResource } from '@/api';

import { SearchError, SearchResult } from './components';

const SearchPageResult = async ({ params }: PageProps) => {
  const searchText = decodeURIComponent(params.search_text as string) || '';
  const response = await getTourList({ text: searchText });

  if ('message' in response) {
    const resourceResponse = await getResource();
    const suggestSearch =
      'data' in resourceResponse ? resourceResponse.data.top_searches : [];

    return <SearchError error={response} searchText={searchText} suggestSearch={suggestSearch} />;
  }

  return <SearchResult data={'data' in response ? response.data : []} />;
};

export default SearchPageResult;
