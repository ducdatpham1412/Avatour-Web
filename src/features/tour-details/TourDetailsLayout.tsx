import { Lexend } from 'next/font/google';

import Navbar from '@/components/Navbar';

import type { TourDetailsProps } from './types';

interface TourDetailsLayoutProps extends TourDetailsProps {
  children: React.ReactNode;
}

const lexendFont = Lexend({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const TourDetailsLayout = ({ children }: TourDetailsLayoutProps) => (
  <div className="relative w-full min-h-[100vh] bg-white" style={lexendFont.style}>
    <Navbar />

    <div className="px-5 sm:px-[120px] py-8 sm:py-9 min-h-[100vh]">
    {children}
    </div>
  </div>
);

export default TourDetailsLayout;
