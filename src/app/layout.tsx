import '@/styles/global.css';
import { Lexend } from 'next/font/google';
import { ReactNode } from 'react';

import { AppModals, ProgressBar, SocialAuth } from '@/components';
import { Toaster } from '@/components/ui';

import Provider from './provider';

interface Props {
  children: ReactNode;
}

const lexendFont = Lexend({
  weight: ['100', '100', '200', '300', '400', '500', '600', '700', '800'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

// export const metadata: Metadata = {
//   title: 'Avatour',
// };

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en" className={lexendFont.className}>
      <body>
        <Provider>
          {children}
          <Toaster />
          <ProgressBar />
          <AppModals />
          <SocialAuth />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
