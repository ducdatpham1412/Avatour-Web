import { useMemo } from 'react';

import { CheckBoxGroup, Input } from '@/components/ui';
import { REQUEST_STATUS, TYPE_AUTH_REQUEST } from '@/configs/constants';

import { useRequestsFilter } from '../hook';

type FilterBarProps = {
  query: Record<string, any>;
  supplierCount: number;
};

const requestTypeData = [
  { id: TYPE_AUTH_REQUEST.upgrade_to_shop, name: 'Chuyển đổi tài khoản' },
  { id: TYPE_AUTH_REQUEST.suggest_location, name: 'Gợi ý địa điểm' },
  { id: TYPE_AUTH_REQUEST.update_bank, name: 'Cập nhật thông tin' },
  { id: TYPE_AUTH_REQUEST.update_price, name: 'Cập nhật mặt hàng' },
];

const requestStatusData = [
  { id: REQUEST_STATUS.active, name: 'Chưa duyệt' },
  { id: REQUEST_STATUS.confirmed, name: 'Đã duyệt' },
  { id: REQUEST_STATUS.rejected, name: 'Từ chối' },
  { id: REQUEST_STATUS.notActive, name: 'Đã hủy' },
];

const FilterBar = ({ query, supplierCount }: FilterBarProps) => {
  const [filter, updateFilter] = useRequestsFilter(query);

  const requestTypeOptions = useMemo(
    () => requestTypeData.map(o => ({ name: o.name, value: o.id.toString() })),
    [],
  );

  const requestStatusOptions = useMemo(
    () => requestStatusData.map(o => ({ name: o.name, value: o.id.toString() })),
    [],
  );

  return (
    <div className="sticky top-3 left-0">
      <div className="flex flex-col gap-5">
        <div>
          <h4 className="font-bold text-[18px] text-black">Tổng: {supplierCount} requests</h4>
        </div>
        <div className="bg-white w-[256px] p-[32px_16px_32px_16px] rounded-[16px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2">Loại yêu cầu</h4>
              <div className="opacity-50 pointer-events-none select-none">
                <CheckBoxGroup
                  options={requestTypeOptions}
                  value={filter.type}
                  onChange={e => updateFilter('type', e)}
                  className="gap-[10px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2">Trạng thái</h4>
              <CheckBoxGroup
                options={requestStatusOptions}
                value={filter.status}
                onChange={e => updateFilter('status', e)}
                className="gap-[10px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
