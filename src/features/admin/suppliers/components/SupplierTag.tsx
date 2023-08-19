import { useMemo } from 'react';

import { Icon } from '@/components/icon';
import { Image, Skeleton } from '@/components/ui';

import EditSuppliersDialog from './EditSuppliersDialog';

interface SupplierTagProps {
  data: TypeSupplier;
  onSubmitEnd?: () => void;
}
const supplierServices = [
  { id: 2, name: 'Food tour' },
  { id: 3, name: 'Cắm trại' },
  { id: 4, name: 'Đi phượt' },
  { id: 5, name: 'Team building' },
];

const accountType = ['user', 'shop', 'admin', 'location'];

const SupplierTag: React.FC<SupplierTagProps> = ({ data }) => {
  const service = useMemo(() => {
    if (data.services && data.services?.length > 0) {
      for (let i = 0; i < data.services.length; i++) {
        const s = data.services[i];
        const dt = supplierServices.find(item => item.id == s);
        if (dt) {
          return dt.name;
        }
      }
    }

    return 'Không';
  }, [data.services]);

  return (
    <>
      <tr className="h-[130px]">
        <td className="bg-white rounded-[20px_0_0_20px]">
          <div className="p-4">
            <Image
              className="h-[90px] w-[90px] rounded-[10px] overflow-hidden"
              fit="cover"
              src={data.avatar ?? ''}
            />
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px]">{data.name}</div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            {accountType[parseInt(data.account_type?.toString() ?? '0')]}
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">{service}</div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            {data.location}
          </div>
        </td>
        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            {data.max_cost ? `${data.max_cost} vnđ` : 'Miễn Phí'}
          </div>
        </td>
        <td className="bg-white rounded-[0_20px_20px_0]">
          <div className="flex items-center min-h-[40px] p-[0_10px] ">
            <EditSuppliersDialog data={data}>
              <button>
                <Icon name="edit" size={24} />
              </button>
            </EditSuppliersDialog>
          </div>
        </td>
      </tr>
    </>
  );
};

export const SupplierSkeleton = () => (
  <tr className="h-[130px] w-full">
    <td className="bg-white rounded-[20px_0_0_20px]">
      <div className="p-4">
        <Skeleton className="h-[90px] w-[90px] rounded-[10px] overflow-hidden" />
      </div>
    </td>
    <td className="bg-white px-4">
      <Skeleton className="flex items-center rounded-sm min-h-[40px] h-[30px] p-[0_10px]" />
    </td>
    <td className="bg-white px-4">
      <Skeleton className="flex items-center rounded-sm min-h-[40px] h-[30px] p-[0_10px] border-l-[1px]" />
    </td>
    <td className="bg-white px-4">
      <Skeleton className="flex items-center rounded-sm min-h-[40px] h-[30px] p-[0_10px] border-l-[1px]" />
    </td>
    <td className="bg-white px-4">
      <Skeleton className="flex items-center rounded-sm min-h-[40px] h-[30px] p-[0_10px] border-l-[1px]" />
    </td>
    <td className="bg-white px-4">
      <Skeleton className="flex items-center rounded-sm min-h-[40px] h-[30px] p-[0_10px] border-l-[1px]" />
    </td>
    <td className="bg-white px-4 rounded-[0_20px_20px_0]">
      <Skeleton className="flex items-center rounded-sm min-h-[40px] h-[30px] p-[0_10px] " />
    </td>
  </tr>
);

export type { SupplierTagProps };
export { supplierServices };
export default SupplierTag;
