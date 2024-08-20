import type { PropsWithChildren } from 'react';

import { BackgroundSun, Navbar } from '@/components';
import { Footer } from '@/app/container';

const TourLayout = ({ children }: PropsWithChildren) => (
  <div className="relative inline-flex flex-col w-full min-h-screen bg-white pb-[250px]">
    <BackgroundSun bottomClassName="bottom-[160px] md:bottom-[65px]" />
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default TourLayout;
