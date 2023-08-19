'use client';
import { useMemo } from 'react';

import { SupplierSkeleton } from './components';

function SuppliersLoading() {
  const renderSuppliers = useMemo(
    () => new Array(6).fill(0).map((_, index) => <SupplierSkeleton key={index} />),
    [],
  );

  return <tbody>{renderSuppliers}</tbody>;
}

export default SuppliersLoading;
