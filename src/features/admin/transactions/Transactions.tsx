'use client';
import { useCallback, useEffect, useMemo } from 'react';

import { Pagination } from '@/components';
import { useQuery } from '@/hooks/useQuery';
import { getDeposits } from '@/api';
import { makeError } from '@/lib';
import { useDeferEffect } from '@/hooks';

import TransactionItem from './components/TransactionItem';
import { TransactionsProps } from './types';
import FilterBar from './components/FilterBar';
import { useTransactionFilter } from './hook';
import TransactionItemSkeleton from './components/TransactionItemSkeleton';

const TransactionsPage: React.FC<TransactionsProps> = ({ query }) => {
  const [, updateFilter] = useTransactionFilter(query);
  const [{ data, loading, calling }, { mutate }] = useQuery(
    ['admin-deposits', new URLSearchParams(query).toString()],
    async () => {
      const { data: d, error } = await getDeposits(query);
      if (error) {
        console.log('error', error);

        throw makeError(error.message);
      }
      return d;
    },
    {
      initialValue: {},
    },
  );

  useDeferEffect(() => {
    void mutate();
  }, [query]);

  const { data: transactions = [], pageIndex, totalPages } = data;

  const renderSuppliers = useMemo(() => {
    if (loading) {
      return Array.from({ length: 10 }).map((_, index) => <TransactionItemSkeleton key={index} />);
    }

    return transactions.map(
      item => (<TransactionItem key={item.id} data={item} onSubmitEnd={mutate} />) as JSX.Element,
    );
  }, [transactions, loading]);

  const onPageChange = useCallback((page: number) => {
    updateFilter('page', page.toString());
  }, []);

  return (
    <div className="flex gap-5 p-[30px_50px_30px_25px] min-h-[100vh] bg-[#f5f5f5]">
      <div>
        <FilterBar query={query} supplierCount={transactions.length} />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="min-h-[calc(100vh_-_150px)]">
          <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
            <thead className="[&>tr]:mb-[30px]">
              <tr className="h-[70px]">
                <th className="rounded-[70px_0_0_70px] bg-white min-w-[100px]">Hash</th>
                <th className="bg-white w-[200px]">
                  <div className="border-l-[1px] py-3.5">User name</div>
                </th>
                <th className="bg-white min-w-[150px]">
                  <div className="border-l-[1px] py-3.5">Product</div>
                </th>
                <th className="bg-white w-[150px]">
                  <div className="border-l-[1px] py-3.5">Price</div>
                </th>
                <th className="bg-white">
                  <div className="border-l-[1px] py-3.5">Deposit</div>
                </th>
                <th className="bg-white w-[150px]">
                  <div className="border-l-[1px] py-3.5">Time</div>
                </th>
                <th className="rounded-[0_70px_70px_0] bg-white w-[150px]">
                  <div className="border-l-[1px] py-3.5">Status</div>
                </th>
                <th className="w-[70px] min-w-[70px] pr-[10px]"></th>
              </tr>
            </thead>
            <tbody>{renderSuppliers}</tbody>
          </table>
        </div>
        <div className="mt-5">
          <Pagination page={pageIndex} total={totalPages} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
