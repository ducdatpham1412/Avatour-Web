import { redirect } from 'next/navigation';

import { getProfile } from '@/api';
import { getDeposits } from '@/api/admin/deposits';
import { TransactionsPage } from '@/features/admin/transactions';

const DepositsPage = async ({ searchParams }: PageProps) => {
  const { data: depositsData, error: getDepositsError } = await getDeposits(searchParams);
  const { error } = await getProfile();

  if (error || getDepositsError) {
    redirect('/admin/login');
  }

  return <TransactionsPage data={depositsData} query={searchParams} />;
};

export default DepositsPage;
