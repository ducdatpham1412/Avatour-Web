import { memo, useMemo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { CheckBoxGroup, RadioGroup } from '@/components/ui';
import { useRouter } from '@/hooks';

import { filterSuppliersFields } from '../constants';
import EditSuppliersDialog from './EditSuppliersDialog';
import { useSuppliers } from '../SuppliersContext';

const FilterBar = memo(
  () => {
    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams();

    const [{ count: supplierCount }, { updateLoading }] = useSuppliers();

    const filter = useMemo(() => {
      const services = query.getAll('sv');
      const accountType = +query.get('at')!;
      return {
        account_type: isNaN(accountType) ? 0 : accountType,
        services: services
          .map(s => +s)
          .filter(s => s && !isNaN(s))
          .map(s => s.toString()),
      };
    }, [query]);

    const accountFilterOptions = useMemo(
      () => filterSuppliersFields.account_type.options.map(o => ({ name: o.name, value: o.id })),
      [],
    );

    const servicesFilterOptions = useMemo(
      () =>
        filterSuppliersFields.services.options.map(o => ({ name: o.name, value: o.id.toString() })),
      [],
    );

    const priceFilterOptions = useMemo(
      () =>
        filterSuppliersFields.price.options.map(o => ({ name: o.name, value: o.id.toString() })),
      [],
    );

    function addQueryUrl(
      key: string,
      value: number | string | number[] | string[] | (number | string)[],
    ) {
      const newQuery = new URLSearchParams();
      const newFilter = { ...filter, [key]: value };

      if (newFilter.account_type) {
        newQuery.append('at', newFilter.account_type.toString());
      }
      if (newFilter.services) {
        newFilter.services.forEach(service => {
          newQuery.append('sv', service);
        });
      }
      updateLoading(true);
      router.push(`${pathname}?${newQuery.toString()}`);
    }

    return (
      <div className="sticky top-3 left-0">
        <div className="flex flex-col gap-5">
          <div>
            <h4 className="font-bold text-[18px] text-black/50">Tổng: {supplierCount} Suppliers</h4>
          </div>
          <div className="bg-white w-[256px] p-[20px_16px] rounded-[16px]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h4 className="font-bold">Loại tài khoản</h4>
                <RadioGroup
                  options={accountFilterOptions}
                  value={filter.account_type}
                  onChange={e => addQueryUrl('account_type', e)}
                  className="gap-[10px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold">Loại hình</h4>
                <CheckBoxGroup
                  options={servicesFilterOptions}
                  value={filter.services}
                  onChange={e => addQueryUrl('services', e)}
                  className="gap-[10px]"
                />
              </div>
              <div className="h-[1px] bg-gray-600"></div>
              <div className="flex flex-col gap-2">
                <h4 className="font-bold">Giá tiền</h4>
                <RadioGroup options={priceFilterOptions} className="gap-[10px]" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-[50px]">
          <EditSuppliersDialog>
            <button className="!h-[42px] !w-full !rounded-[42px] !font-bold bg-white border-[1px] border-[#9A9A9A]">
              <span className="text-[14px]">Thêm Supplier mới</span>
            </button>
          </EditSuppliersDialog>
        </div>
      </div>
    );
  },
  () => true,
);

export default FilterBar;
