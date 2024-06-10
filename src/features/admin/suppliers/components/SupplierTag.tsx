import { Icon } from '@/components/icon';
import { Image, Skeleton } from '@/components/ui';
import { serviceDataDetail } from '@/features/search/constants';
import { formatPrice } from '@/lib';

import EditSuppliersDialog from './EditSuppliersDialog';

interface SupplierTagProps {
  data: TypeProfile;
  onSubmitEnd?: () => void;
}

const SupplierTag = ({ data }: SupplierTagProps) => {
  const service = data.services.reduce((pre: string, cur) => {
    return `${pre}${pre ? ', ' : ''}${serviceDataDetail[cur].name || cur}`;
  }, '');

  return (
    <>
      <tr className="h-[80px]">
        <td className="bg-white rounded-[20px_0_0_20px]">
          <div className="p-4">
            <Image
              className="h-[60px] w-[60px] rounded-[10px] overflow-hidden"
              fit="cover"
              src={data.avatar}
            />
          </div>
        </td>

        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px]">{data.name}</div>
        </td>

        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            {data.account_type}
          </div>
        </td>

        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px] text-[12px]">
            {service}
          </div>
        </td>

        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px] text-[12px]">
            {data.location}
          </div>
        </td>

        <td className="bg-white">
          <div className="flex items-center min-h-[40px] p-[0_10px] border-l-[1px]">
            {data.max_cost ? `${formatPrice(data.max_cost)} đ` : 'Miễn Phí'}
          </div>
        </td>

        <td className="bg-white rounded-[0_20px_20px_0]">
          <div className="flex items-center min-h-[40px] p-[0_10px] ">
            <EditSuppliersDialog data={data} type="update">
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
export default SupplierTag;
