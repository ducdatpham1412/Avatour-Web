'use server';

import { REQUEST_STATUS } from '@/configs/constants';
import { makeError } from '@/lib';
import { request } from '@/api';

const GET_REQUESTS_PATH = '/admin/requests';
const joinEstimateFilterStatus = Object.values(REQUEST_STATUS);

type UserRequestFilter = {
  take: string;
  page_index: string;
  status: string;
};

const getUserRequests = async (query: Partial<UserRequestFilter> = {}) => {
  const filter = parseRequestFilter(query);
  try {
    const data = await request.get<APIPagingResponse<TypeGetRequestResponse[]>>(
      GET_REQUESTS_PATH,
      filter,
      {
        cache: 'no-store',
      },
    );
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

async function confirmRequest(requestId: TypeGetRequestResponse['id']) {
  try {
    await request.put(`/admin/confirm?type=approve-request&request_id=${requestId}`);
    return {};
  } catch (e) {
    const error = makeError(e);

    return {
      error: {
        message: error?.message,
        stack: error?.stack,
      },
    };
  }
}

const parseRequestFilter = (
  query: Record<string, string | string[] | undefined>,
): UserRequestFilter => {
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
      .filter(s => !isNaN(s) && joinEstimateFilterStatus.includes(s as REQUEST_STATUS));

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

export { confirmRequest };

export default getUserRequests;
