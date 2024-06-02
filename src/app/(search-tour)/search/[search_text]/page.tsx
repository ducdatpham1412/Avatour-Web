import { SearchPageResult } from '@/features/search';

export default function SearchPage(props: PageProps) {
  return Promise.resolve(<SearchPageResult {...props} />);
}
