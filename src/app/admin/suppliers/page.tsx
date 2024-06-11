import { redirect } from 'next/navigation';

import { getProfile, getSuppliers } from '@/api';
import { ADMIN_ROUTES } from '@/configs/routes';
import { SuppliersScreen } from '@/features/admin/suppliers';

const Page = async ({ searchParams }: PageProps) => {
  const { error } = await getProfile();

  if (error) {
    redirect(ADMIN_ROUTES.login);
  }

  const suppliers = await getSuppliers(searchParams);

  return <SuppliersScreen data={suppliers} query={searchParams} />;
};

export default Page;
