import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';

import { Input, RadioGroup } from '@/components/ui';
import { useRouter } from '@/hooks';
import { ACCOUNT_TYPE } from '@/configs/constants';

import EditSuppliersDialog from './EditSuppliersDialog';
import { useSuppliers } from '../../hooks';
import { FormFieldDefine } from '../types';

const filterSuppliersFields = {
  account_type: {
    name: 'at',
    label: 'Loại tài khoản',
    options: [
      {
        id: 'all',
        name: 'All',
      },
      {
        id: ACCOUNT_TYPE.shop,
        name: 'Shop',
      },
      {
        id: ACCOUNT_TYPE.location,
        name: 'Location',
      },
      {
        id: 'del',
        name: 'Đã xoá',
      },
    ],
  },
  services: {
    name: 'sv',
    label: 'Loại hình',
    options: [
      {
        id: 'backpack',
        name: 'Đi phượt',
      },
      {
        id: 'cuisine',
        name: 'Ẩm thực',
      },
      {
        id: 'camping',
        name: 'Cám trại',
      },
      {
        id: 'team-building',
        name: 'Team building',
      },
    ],
  },
  price: {
    name: 'p',
    label: 'Giá tiền',
    options: [
      {
        id: 1,
        name: '0 - 1.000.000 vnđ',
      },
      {
        id: 2,
        name: '1.000.000 - 3.000.000 vnđ',
      },
      {
        id: 3,
        name: '3.000.000 - 5.000.000 vnđ',
      },
      {
        id: 4,
        name: 'Trên 5.000.000 vnđ',
      },
    ],
  },
} satisfies FormFieldDefine<Record<string, any>>;

const FilterBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  const [{ data }] = useSuppliers();

  const timeOut = useRef<NodeJS.Timeout>();

  const filter = useMemo(() => {
    const services = query.getAll('sv');
    const accountType = query.get('at');
    const district = query.get('dt');

    return {
      account_type: accountType,
      district,
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

  // const servicesFilterOptions = useMemo(
  //   () =>
  //     filterSuppliersFields.services.options.map(o => ({ name: o.name, value: o.id.toString() })),
  //   [],
  // );

  const priceFilterOptions = useMemo(
    () => filterSuppliersFields.price.options.map(o => ({ name: o.name, value: o.id.toString() })),
    [],
  );

  const addQueryUrl = (
    key: keyof typeof filter,
    value: number | string | number[] | string[] | (number | string)[],
  ) => {
    const newQuery = new URLSearchParams();
    const newFilter = { ...filter, [key]: value };

    if (newFilter.account_type) {
      newQuery.append('at', newFilter.account_type);
    }

    if (newFilter.services.length) {
      newFilter.services.forEach(service => {
        newQuery.append('sv', service);
      });
    }

    if (newFilter.district) {
      newQuery.append('dt', newFilter.district);
    }

    router.push(`${pathname}?${newQuery.toString()}`);
  };

  return (
    <div className="sticky top-3 left-0">
      <div className="flex flex-col gap-5">
        <div>
          <h4 className="font-bold text-[18px] text-black/50">
            Tổng: {data?.length ?? 0} Địa điểm
          </h4>
        </div>

        <div className="bg-white w-[256px] p-[20px_16px] rounded-[16px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold">Loại tài khoản</h4>
              <RadioGroup
                options={accountFilterOptions}
                value={filter.account_type ?? 'all'}
                onChange={e => addQueryUrl('account_type', e)}
                className="gap-[10px]"
              />
            </div>

            {/* <div className="flex flex-col gap-2">
                <h4 className="font-bold">Loại hình</h4>
                <CheckBoxGroup
                  options={servicesFilterOptions}
                  value={filter.services}
                  onChange={e => addQueryUrl('services', e)}
                  className="gap-[10px]"
                />
              </div> */}

            <div className="flex flex-col gap-2">
              <h4 className="font-bold">Lọc theo mã địa phương</h4>
              <Input
                placeholder="Mã quận, huyện"
                defaultValue={filter.district ?? ''}
                onChange={e => {
                  clearTimeout(timeOut.current);
                  timeOut.current = setTimeout(() => {
                    addQueryUrl('district', e.target.value);
                  }, 500);
                }}
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
        <EditSuppliersDialog type="create">
          <button className="!h-[42px] !w-full !rounded-[42px] !font-bold bg-white border-[1px] border-[#9A9A9A]">
            <span className="text-[14px]">Thêm địa điểm mới</span>
          </button>
        </EditSuppliersDialog>
      </div>
    </div>
  );
};

export default FilterBar;
