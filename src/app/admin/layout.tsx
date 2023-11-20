import { Fragment } from 'react';

export const metadata = {
  title: 'Avatour CMS',
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <Fragment>{children}</Fragment>
);

export default AdminLayout;
