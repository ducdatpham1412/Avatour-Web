import { SearchPage as SearchPageComponent } from '@/features/search';

export default function SearchPage(props: PageProps) {
  return Promise.resolve(<SearchPageComponent {...props} />);
}
