import SearchResultPageComponent from '@/features/search/result/SearchResultPage';

export default function SearchResultPage(props: PageProps) {
  return Promise.resolve(<SearchResultPageComponent {...props} />);
}
