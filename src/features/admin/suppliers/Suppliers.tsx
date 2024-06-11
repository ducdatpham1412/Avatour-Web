'use client';
import { useEffect, useMemo } from 'react';

import SupplierTag from './components/SupplierTag';
import { useSuppliers } from './SuppliersContext';

interface SuppliersProps {
  data: TypeProfile[];
  query: Record<string, any>;
}

function SupplierPage({ data }: SuppliersProps) {
  const [, { updateCount }] = useSuppliers();
  const renderSuppliers = useMemo(
    () => data.map(item => <SupplierTag key={item.id} data={item} />),
    [data],
  );

  useEffect(() => {
    updateCount(data.length);
  }, [data.length]);

  return <tbody>{renderSuppliers}</tbody>;
}

export default SupplierPage;
