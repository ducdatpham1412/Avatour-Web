import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

type SuppliersContextValue = [
  {
    count: number;
    loading: boolean;
  },
  {
    updateCount: Dispatch<SetStateAction<number>>;
    updateLoading: Dispatch<SetStateAction<boolean>>;
  },
];

interface SuppliersProviderProps {
  children: ReactNode;
}

const SuppliersContext = createContext<SuppliersContextValue>({} as SuppliersContextValue);

const SuppliersProvider = ({ children }: SuppliersProviderProps) => {
  const [supplierCount, setSupplierCount] = useState(0);
  const [loading, setLoading] = useState(false);

  return (
    <SuppliersContext.Provider
      value={[
        {
          count: supplierCount,
          loading,
        },
        { updateCount: setSupplierCount, updateLoading: setLoading },
      ]}
    >
      {children}
    </SuppliersContext.Provider>
  );
};

export const useSuppliers = () => useContext(SuppliersContext);

export default SuppliersProvider;
