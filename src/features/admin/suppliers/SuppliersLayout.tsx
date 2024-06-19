'use client';
import FilterBar from './components/FilterBar';
import SuppliersProvider from './SuppliersProvider';

type SuppliersLayoutProps = {
  children: React.ReactNode;
};

function SuppliersLayout({ children }: SuppliersLayoutProps) {
  return (
    <SuppliersProvider>
      <div className="flex gap-5 w-full p-[30px_50px_30px_25px] min-h-[100vh] bg-[#f5f5f5]">
        <div>
          <FilterBar />
        </div>
        <div className="w-full flex flex-col items-center">
          <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
            <thead className="[&>tr]:mb-[30px]">
              <tr className="h-[70px]">
                <th className="w-[90px]"></th>
                <th className="rounded-[70px_0_0_70px] bg-white w-[200px]">
                  <div font-medium>Tên</div>
                </th>
                <th className="bg-white w-[100px]">
                  <div className="border-l-[1px] font-medium">Loại tk</div>
                </th>
                <th className="bg-white w-[150px]">
                  <div className="border-l-[1px] font-medium">Dịch vụ</div>
                </th>
                <th className="bg-white">
                  <div className="border-l-[1px] font-medium">Địa chỉ</div>
                </th>
                <th className="rounded-[0_70px_70px_0] bg-white w-[100px]">
                  <div className="border-l-[1px] font-medium">Giá</div>
                </th>
                <th className="w-[50px]"></th>
              </tr>
            </thead>
            {children}
          </table>
        </div>
      </div>
    </SuppliersProvider>
  );
}

export default SuppliersLayout;
