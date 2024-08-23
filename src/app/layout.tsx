import '@/styles/global.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import { ReactNode } from 'react';

import { AppModals, ProgressBar } from '@/components';
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

export const metadata: Metadata = {
  title: 'Avatour',
  keywords: [
    'Avatour',
    'Gợi ý lịch trình',
    'Du lịch bản địa',
    'Buddy',
    'Du lịch bản địa',
    'Buddy bản địa',
  ],
  description:
    'Avatour là ứng dụng gợi ý lịch trình, giúp bạn kết nối với người dân bản địa để trải nghiệm đậm nét các văn hoá địa phương',
};

const RootLayout = ({ children }: Props) => {
  return (
    <Provider>
      <html lang="en" className={lexendFont.className}>
        <body>
          {children}
          <Toaster />
          <ProgressBar />
          <AppModals />
        </body>
      </html>
    </Provider>
  );
};

export default RootLayout;
