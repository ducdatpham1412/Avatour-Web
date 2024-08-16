import type { PropsWithChildren } from 'react';

import { BackgroundSun, Navbar } from '@/components';

const TourLayout = ({ children }: PropsWithChildren) => (
  <div className="inline-flex flex-col w-full h-screen bg-white">
    <BackgroundSun />
    <Navbar />
    {children}
  </div>
);

export default TourLayout;
