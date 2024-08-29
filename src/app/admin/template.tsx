'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { Icon, IconNames } from '@/components/icon';
import { ADMIN_ROUTES } from '@/configs/routes';
import { cn } from '@/lib';
import { deleteTokenCookies } from '@/api/cookies';

import { useAppContext } from '../provider';

const excludePath = [ADMIN_ROUTES.login];

const AdminTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [, { setProfile }] = useAppContext();

  if (excludePath.some(e => pathname.includes(e))) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <div className="flex">
      <div className="sticky left-0 top-0 w-[72px] min-w-[72px] h-[100svh] bg-white p-[32px_16px] flex flex-col gap-6">
        <NavigateItem href="/" name="logo" active={false} />
        <NavigateItem
          href="/admin/suppliers"
          name="home"
          active={pathname.includes('/admin/suppliers')}
        />
        <NavigateItem
          href="/admin/deposits"
          name="money"
          active={pathname.includes('/admin/deposits')}
        />
        <NavigateItem href="/admin/mail" name="mail" active={pathname.includes('/admin/mail')} />
        <NavigateItem
          href="/admin/requests"
          name="question"
          active={pathname.includes('/admin/requests')}
        />
        <button
          onClick={() => {
            deleteTokenCookies();
            setProfile(undefined);
            router.replace(ADMIN_ROUTES.login);
          }}
        >
          <p className="text-[10px]">Log out</p>
        </button>
      </div>
      {children}
    </div>
  );
};

interface NavigateItemProps {
  href: string;
  name: IconNames;
  active: boolean;
}

const NavigateItem: React.FC<NavigateItemProps> = ({ href, name, active }) => (
  <Link
    href={href}
    className={cn(
      'flex items-center justify-center w-[40px] h-[40px] rounded-[8px] border',
      active ? 'border-transparent bg-primary' : 'border-gray-300',
    )}
  >
    <Icon name={name} size={20} />
  </Link>
);

export default AdminTemplate;
