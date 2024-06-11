import { redirect } from 'next/navigation';

import { getProfile } from '@/api';
import { ADMIN_ROUTES } from '@/configs/routes';
import { TransactionsPage } from '@/features/admin/transactions';

const DepositsPage = async ({ searchParams }: PageProps) => {
  const { error } = await getProfile();

  if (error) {
    redirect(ADMIN_ROUTES.login);
  }

  return <TransactionsPage query={searchParams} />;
};

export default DepositsPage;
