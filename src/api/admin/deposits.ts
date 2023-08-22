'use server';
import { revalidateTag } from 'next/cache';

import { JOIN_ESTIMATE_FILTER_STATUS } from '@/configs/constants';
import { request } from '@/api/request';
import { TransactionData } from '@/features/admin/transactions';
import { makeError } from '@/lib';

const joinEstimateFilterStatus = Object.values(JOIN_ESTIMATE_FILTER_STATUS);

const GET_ESTIMATE_PATH = '/admin/estimates';

const getDeposits = async (query: Record<string, string | string[] | undefined>) => {
  const filter = parseDepositFilter(query);
  try {
    const data = await request<TransactionData>('/admin/estimates', filter, {
      next: {
        tags: [GET_ESTIMATE_PATH, new URLSearchParams(filter).toString()],
        revalidate: 10,
      },
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
    console.log('confirm deposit error', e);

    return {
      error: {
        message: error?.message ?? 'Error',
        code: error?.code,
      },
    };
  }
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

export { getDeposits, confirmDeposit };
