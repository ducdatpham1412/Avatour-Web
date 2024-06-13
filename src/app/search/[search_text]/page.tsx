import { SearchResultPage as SearchResultPageComponent } from '@/features/search';

const SearchResultPage = (props: PageProps) => {
  return Promise.resolve(<SearchResultPageComponent {...props} />);
};

export default SearchResultPage;
