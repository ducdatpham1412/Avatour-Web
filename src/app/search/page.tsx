import { SearchPage as SearchPageComponent } from '@/features/search';

function SearchPage(props: PageProps) {
  return Promise.resolve(<SearchPageComponent {...props} />);
}

export default SearchPage;
