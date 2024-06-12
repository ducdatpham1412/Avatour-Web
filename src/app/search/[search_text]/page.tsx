import { SearchResultPage as SearchResultPageComponent } from '@/features/search';

function SearchResultPage(props: PageProps) {
  return Promise.resolve(<SearchResultPageComponent {...props} />);
}

export default SearchResultPage;
