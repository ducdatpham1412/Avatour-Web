import { redirect } from 'next/navigation';

import { getProfile } from '@/api/admin/login';
import { ADMIN_ROUTES } from '@/configs/routes';
import AdminLogin from '@/features/admin/auth/Login';

const Page = async () => {
  const { data: userProfile } = await getProfile();

  if (userProfile) {
    redirect(ADMIN_ROUTES.suppliers);
  }
  return <AdminLogin />;
};

export default Page;
