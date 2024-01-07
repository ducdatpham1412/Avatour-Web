import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { useRouter } from '@/hooks';

function useTransactionFilter(
  query: Record<string, string | number | (string | number)[] | undefined>,
) {
  const filter = useMemo(() => {
    const page = +(query.page ?? '1');
    const limit = +(query.limit ?? '20');
    const status = query.status;
    const hash = query.hash ?? '';

    return {
      page: isNaN(page) ? 0 : page,
      limit: isNaN(limit) ? 0 : limit,
      status: (status !== undefined ? (Array.isArray(status) ? status : [status]) : []) as string[],
      hash: hash.toString(),
    };
  }, [query]);

  const router = useRouter();
  const pathname = usePathname();

  function addQueryUrl(
    key: string,
    value: number | string | number[] | string[] | (number | string)[],
  ) {
    const newQuery = new URLSearchParams();
    const newFilter = { ...filter, [key]: value };
    if (newFilter.page < 1) {
      newFilter.page = 1;
    }
    if (newFilter.limit < 1) {
      newFilter.limit = 1;
    }
    newQuery.set('page', newFilter.page.toString());
    newQuery.set('limit', newFilter.limit.toString());
    newQuery.set('hash', newFilter.hash);
    newFilter.status.map(s => newQuery.append('status', s));

    router.push(`${pathname}?${newQuery.toString()}`);
  }

  return [filter, addQueryUrl] as const;
}

export default useTransactionFilter;
