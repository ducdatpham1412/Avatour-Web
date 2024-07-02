'use client';
import { redirect } from 'next/navigation';
import { ElementRef, useEffect, useRef, useState } from 'react';

import { useAppContext } from '@/app/provider';
import { TourLoadingIcon } from '@/components/icon';
import { ADMIN_ROUTES } from '@/configs/routes';
import { useSuppliers } from '@/features/admin/hooks';

import { SupplierTag, EditSuppliersDialog } from './components';

const SuppliersScreen = () => {
  const [{ profile, initLoading }] = useAppContext();
  const [{ data, loading }] = useSuppliers();

  const dialogRef = useRef<ElementRef<typeof EditSuppliersDialog>>(null);
  const [dataEdit, setDataEdit] = useState<TypeProfile>();

  useEffect(() => {
    if (!initLoading && !profile) {
      redirect(ADMIN_ROUTES.login);
    }
  }, [profile, initLoading]);

  if (initLoading || loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <TourLoadingIcon className="w-[500px] h-[500px]" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
        <thead className="[&>tr]:mb-[30px]">
          <tr className="h-[70px]">
            <th className="w-[90px]"></th>
            <th className="rounded-[70px_0_0_70px] bg-white w-[200px]">
              <div className="font-medium">Tên</div>
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
        <tbody>
          {data.map(item => (
            <SupplierTag
              key={item.id}
              data={item}
              onEdit={() => {
                setDataEdit(item);
                dialogRef.current?.open();
              }}
            />
          ))}
        </tbody>
      </table>

      <EditSuppliersDialog ref={dialogRef} data={dataEdit} type="update" />
    </>
  );
};

export default SuppliersScreen;
