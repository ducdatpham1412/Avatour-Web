'use client';
import FilterBar from './components/FilterBar';

type SuppliersLayoutProps = {
  children: React.ReactNode;
};

function SuppliersLayout({ children }: SuppliersLayoutProps) {
  return (
    <div className="flex gap-5 w-full p-[30px_50px_30px_25px] min-h-[100vh] bg-[#f5f5f5]">
      <div>
        <FilterBar />
      </div>
      <div className="w-full flex flex-col items-center">{children}</div>
    </div>
  );
}

export default SuppliersLayout;
