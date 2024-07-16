import { getTourList } from '@/api';

import { SearchError, SearchResult } from './screens';

const SearchPageResult = async ({ params }: PageProps) => {
  const searchText = decodeURIComponent(params.search_text as string) || '';
  const response = await getTourList({ text: searchText });

  if ('message' in response) {
    return <SearchError error={response} searchText={searchText} />;
  }

  if ('data' in response) {
    return (
      <SearchResult
        data={{
          text: searchText,
          tours: response.data,
        }}
      />
    );
  }

  return null;
};

export default SearchPageResult;
