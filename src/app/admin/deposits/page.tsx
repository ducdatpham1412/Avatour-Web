import { TransactionsPage } from '@/features/admin/transactions';

const DepositsPage = ({ searchParams }: PageProps) => {
  return <TransactionsPage query={searchParams} />;
};

export default DepositsPage;
