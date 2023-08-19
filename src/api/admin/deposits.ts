'use server';
import { JOIN_ESTIMATE_FILTER_STATUS } from '@/configs/constants';
import { request } from '@/api/request';
import { TransactionData } from '@/features/admin/transactions';

const joinEstimateFilterStatus = Object.values(JOIN_ESTIMATE_FILTER_STATUS);

const GET_ESTIMATE_PATH = '/admin/estimates';

const getDeposits = async (query: Record<string, string | string[] | undefined>) => {
  const filter = parseDepositFilter(query);
  return request<TransactionData>('/admin/estimates', filter, {
    cache: 'no-cache',
    next: {
      tags: [GET_ESTIMATE_PATH, new URLSearchParams(filter).toString()],
    },
  });
};

const parseDepositFilter = (query: Record<string, string | string[] | undefined>) => {
  let limit = +(query.limit ?? '');
  if (!isNaN(limit) || limit <= 0) {
    limit = 10;
  }

  let page = +(query.page ?? '');
  if (isNaN(page) || page <= 0) {
    page = 1;
  }

  const status = query.status;
  let parsedStatus: number[] | number;
  if (Array.isArray(status)) {
    parsedStatus = status
      .map(s => +s)
      .filter(s => !isNaN(s) && joinEstimateFilterStatus.includes(s));

    if (parsedStatus.length === 0) {
      parsedStatus = joinEstimateFilterStatus;
    }
  } else if (status !== undefined) {
    parsedStatus = +status;
    if (isNaN(parsedStatus)) {
      parsedStatus = joinEstimateFilterStatus;
    } else {
      parsedStatus = [parsedStatus];
    }
  } else {
    parsedStatus = joinEstimateFilterStatus;
  }

  return {
    take: limit.toString(),
    page_index: page.toString(),
    status: JSON.stringify(parsedStatus),
  };
};

export { getDeposits };
