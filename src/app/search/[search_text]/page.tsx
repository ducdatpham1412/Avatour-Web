import { SearchResultPage as SearchResultPageComponent } from '@/features/search';

export default function SearchResultPage(props: PageProps) {
  return Promise.resolve(<SearchResultPageComponent {...props} />);
}
