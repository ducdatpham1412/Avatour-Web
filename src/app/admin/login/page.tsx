'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useAppContext } from '@/app/provider';
import { TourLoadingIcon } from '@/components';
import { ADMIN_ROUTES } from '@/configs/routes';
import AdminLogin from '@/features/admin/auth/Login';

const Page = () => {
  const [{ profile, initLoading }] = useAppContext();

  useEffect(() => {
    if (!initLoading && profile) {
      redirect(ADMIN_ROUTES.suppliers);
    }
  }, [profile, initLoading]);

  if (initLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <TourLoadingIcon className="w-[500px] h-[500px]" />
      </div>
    );
  }

  return <AdminLogin />;
};

export default Page;
