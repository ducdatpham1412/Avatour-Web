'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon, IconNames } from '@/components/icon';
import { cn } from '@/lib';

const excludePath = ['/admin/login'];

const AdminTemplate = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (excludePath.some(e => pathname.includes(e))) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <div className="flex">
      <div className="sticky left-0 top-0 w-[72px] min-w-[72px] h-[100svh] bg-white p-[32px_16px] flex flex-col gap-6">
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
