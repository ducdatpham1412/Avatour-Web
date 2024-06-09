import { makeError } from '@/lib';

import request from '../request';

export const getResource = async () => {
  try {
    const data = await request.get<TypeApi<Resource>>(
      '/common/resource',
      { authorize: false },
    );
    return data;
  } catch (e) {
    const error = makeError(e);
    return {
      message: error?.message ?? 'Error',
      code: error?.code,
    };
  }
};
