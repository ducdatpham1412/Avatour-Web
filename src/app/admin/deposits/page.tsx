import { redirect } from 'next/navigation';

import { getProfile } from '@/api';
import { getDeposits } from '@/api/admin/deposits';
import { TransactionsPage } from '@/features/admin/transactions';

const DepositsPage = async ({ searchParams }: PageProps) => {
  const { error } = await getProfile();

  if (error) {
    redirect('/admin/login');
  }

  return <TransactionsPage query={searchParams} />;
};

export default DepositsPage;
