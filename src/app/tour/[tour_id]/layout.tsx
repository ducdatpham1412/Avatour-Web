import { PropsWithChildren } from 'react';

import Navbar from '@/components/Navbar';

const TourLayout = ({ children }: PropsWithChildren) => (
  <div className="relative w-full min-h-[100vh] bg-white">
    <Navbar />

    <div className="px-5 sm:px-[120px] py-8 sm:py-9 min-h-[100vh]">{children}</div>
  </div>
);

export default TourLayout;
