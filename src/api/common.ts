'use server';

import request from './request';

export const apiGetPassport = async () => {
  const res: TypeApi<Passport> = await request.get('/common/passport');
  return res.data;
};

export const apiGetResource = async () => {
  const res: TypeApi<Resource> = await request.get('/common/resource', undefined, {
    authorize: false,
  });
  return res.data;
};

export const apiGetSWR = async <T>(
  path: string,
  params?: Record<string, any>,
  options?: RequestOptions,
) => {
  const res = await request.get<TypeApi<T>>(path, params, options);
  return res;
};
