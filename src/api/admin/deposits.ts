'use server';
import { revalidateTag } from 'next/cache';

import { STATUS_JOIN_ESTIMATE } from '@/configs/constants';
import request from '@/api/request';
import { TransactionData } from '@/features/admin/transactions';
import { logger, makeError } from '@/lib';

const joinEstimateFilterStatus = Object.values(STATUS_JOIN_ESTIMATE);

const GET_ESTIMATE_PATH = '/admin/estimates';

type DepositFilter = {
  take: string;
  page_index: string;
  status: string;
  hash?: string;
};

const getDeposits = async (query: Record<string, string | string[] | undefined>) => {
  const filter = parseDepositFilter(query);
  try {
    const data = await request.get<TransactionData>('/admin/estimates', filter, {
      cache: 'no-store',
    });
    return {
      data,
    };
  } catch (e) {
    const error = makeError(e);
    return {
      error: {
        message: error?.message ?? 'Error',
        code: error?.code,
      },
    };
  }
};

const confirmDeposit = async (id: number) => {
  const params = {
    type: 'deposited',
    join_estimate_id: id.toString(),
  };

  try {
    await request.put(`/admin/confirm?${new URLSearchParams(params)}`, params);
    revalidateTag(GET_ESTIMATE_PATH);
    return {};
  } catch (e) {
    const error = makeError(e);

    return {
      error: {
        message: error?.message ?? 'Error',
        code: error?.code,
      },
    };
  }
};

const parseDepositFilter = (
  query: Record<string, string | string[] | undefined>,
): DepositFilter => {
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
      .filter(s => !isNaN(s) && joinEstimateFilterStatus.includes(s as STATUS_JOIN_ESTIMATE));

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

  if (query.hash) {
    return {
      take: limit.toString(),
      page_index: page.toString(),
      status: JSON.stringify(parsedStatus),
      hash: query.hash.toString(),
    };
  }

  return {
    take: limit.toString(),
    page_index: page.toString(),
    status: JSON.stringify(parsedStatus),
  };
};

export { getDeposits, confirmDeposit };
