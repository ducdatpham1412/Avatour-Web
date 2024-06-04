import '@/styles/global.css';
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

import { ProgressBar } from '@/components';
import { Toaster } from '@/components/ui';

const lexendFont = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Avatour',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lexendFont.className}>
      <body>
        {children}
        <Toaster />
        <ProgressBar />
      </body>
    </html>
  );
}
