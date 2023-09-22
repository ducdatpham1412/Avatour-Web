import { useMemo } from 'react';

import { CheckBoxGroup, Input } from '@/components/ui';
import { STATUS_JOIN_ESTIMATE } from '@/configs/constants';

import { useTransactionFilter } from '../hook';

type FilterBarProps = {
  query: Record<string, any>;
  supplierCount: number;
};

const transactionSatusData = [
  { id: STATUS_JOIN_ESTIMATE.adminConfirm, name: 'Đã duyệt' },
  { id: STATUS_JOIN_ESTIMATE.active, name: 'Chưa duyệt' },
  { id: STATUS_JOIN_ESTIMATE.overtime, name: 'Quá hẹn' },
  { id: STATUS_JOIN_ESTIMATE.notActive, name: 'Bị hủy' },
  { id: STATUS_JOIN_ESTIMATE.consumerConfirmed, name: 'Khách hàng xác nhận' },
  { id: STATUS_JOIN_ESTIMATE.supplierConfirmed, name: 'Cửa hàng xác nhận' },
];

const FilterBar = ({ query, supplierCount }: FilterBarProps) => {
  const [filter, updateFilter] = useTransactionFilter(query);

  const accountFilterOptions = useMemo(
    () => transactionSatusData.map(o => ({ name: o.name, value: o.id.toString() })),
    [],
  );

  return (
    <div className="sticky top-3 left-0">
      <div className="flex flex-col gap-5">
        <div>
          <h4 className="font-bold text-[18px] text-black">Tổng: {supplierCount} Đơn</h4>
        </div>
        <div className="bg-white w-[256px] p-[32px_16px_32px_16px] rounded-[16px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 mb-2">
              <h4 className="font-bold">Tìm kiếm</h4>
              <Input
                placeholder="Mã giao dịch"
                className="h-[42px] rounded-[10px] bg-white"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    updateFilter('hash', e.currentTarget.value);
                  }
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold mb-2">Trạng thái</h4>
              <CheckBoxGroup
                options={accountFilterOptions}
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
