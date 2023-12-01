import RequestPage from '@/features/admin/requests/RequestPage';

const Requests = ({ searchParams }: PageProps) =>
  Promise.resolve(<RequestPage query={searchParams} />);

export default Requests;
