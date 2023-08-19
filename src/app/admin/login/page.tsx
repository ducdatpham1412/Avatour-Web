import { redirect } from 'next/navigation';

import { getProfile } from '@/api/admin/login';
import AdminLogin from '@/features/admin/auth/Login';

const Page = async ({ searchParams }: PageProps) => {
  const { data: userProfile } = await getProfile();
  if (userProfile) {
    redirect('/admin/suppliers');
  }
  return <AdminLogin />;
};

export default Page;
