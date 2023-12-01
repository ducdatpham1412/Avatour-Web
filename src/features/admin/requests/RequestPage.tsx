'use client';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import getUserRequests from '@/api/admin/requests';
import { useQuery } from '@/hooks/useQuery';
import { Pagination } from '@/components';
import { useSearchParams } from '@/hooks';

import FilterBar from './components/FilterBar';
import { useRequestsFilter } from './hook';
import TransactionItem from './components/TransactionItem';
import TransactionItemSkeleton from './components/TransactionItemSkeleton';

interface RequestPageProps {
  query: Record<string, any>;
}

const RequestPage = memo(({ query }: RequestPageProps) => {
  const [, updateFilter] = useRequestsFilter(query);
  const [{ data, loading }, { mutate }] = useQuery(
    ['user-request', new URLSearchParams(query).toString()],
    async skip => {
      const { data: d, error } = await getUserRequests(query);
      if (error || !d) {
        skip();
      }

      return d!;
    },
    { initialValue: {} },
  );

  const { data: requests = [], pageIndex, take, totalItems, totalPages } = data;

  const renderSuppliers = useMemo(() => {
    if (loading) {
      return Array.from({ length: 10 }).map((_, index) => <TransactionItemSkeleton key={index} />);
    }
    console.log('requests', requests);

    return requests.map(
      item => (<TransactionItem key={item.id} data={item} onSubmitEnd={mutate} />) as JSX.Element,
    );
  }, [requests, loading]);

  const onPageChange = useCallback((page: number) => {
    updateFilter('page', page.toString());
  }, []);

  return (
    <div className="flex gap-5 w-full p-[30px_50px_30px_25px] min-h-[100vh] bg-[#f5f5f5]">
      <div>
        <FilterBar query={query} supplierCount={requests?.length} />
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="w-full min-h-[calc(100vh_-_150px)]">
          <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: '0 1rem' }}>
            <thead className="[&>tr]:mb-[30px]">
              <tr className="h-[70px]">
                <th className="rounded-[70px_0_0_70px] bg-white min-w-[100px]">Date</th>
                <th className="bg-white w-[200px]">
                  <div className="border-l-[1px] py-3.5">Account</div>
                </th>
                <th className="bg-white min-w-[150px]">
                  <div className="border-l-[1px] py-3.5">Request</div>
                </th>
                <th className="bg-white">
                  <div className="border-l-[1px] py-3.5">Type</div>
                </th>
                <th className="bg-white rounded-[0_70px_70px_0]">
                  <div className="border-l-[1px] py-3.5">Status</div>
                </th>
              </tr>
            </thead>
            <tbody>{renderSuppliers}</tbody>
          </table>
        </div>
        <div className="mt-5">
          <Pagination page={pageIndex ?? 0} total={totalPages} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
});

export default RequestPage;
