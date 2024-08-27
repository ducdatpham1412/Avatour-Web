import { Fragment } from 'react';

import Metadata from '../metadata';

// export const metadata = {
//   title: 'Avatour CMS',
// };

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <Fragment>
    <Metadata title="Avatour CMS" />
    {children}
  </Fragment>
);

export default AdminLayout;
