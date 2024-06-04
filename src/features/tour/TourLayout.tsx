import Navbar from '@/components/Navbar';

import type { TourProps } from './types';

interface TourLayoutProps extends TourProps {
  children: React.ReactNode;
}

const TourLayout = ({ children }: TourLayoutProps) => (
  <div className="relative w-full min-h-[100vh] bg-white">
    <Navbar />

    <div className="px-5 sm:px-[120px] py-8 sm:py-9 min-h-[100vh]">
    {children}
    </div>
  </div>
);

export default TourLayout;
