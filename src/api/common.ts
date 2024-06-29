'use server';

import request from './request';

export const apiGetPassport = async () => {
  const res: TypeApi<Passport> = await request.get('/common/passport');
  return res.data;
};

export const apiGetResource = async () => {
  const res: TypeApi<Resource> = await request.get('/common/resource', undefined, {
    authorize: false,
    next: {
      revalidate: 10,
    },
  });
  return res.data;
};

export const apiCreateTour = async (
  data: Pick<TypeTour, 'name' | 'description' | 'duration' | 'min_cost' | 'max_cost'> & {
    schedule: Array<number[]>;
  },
) => {
  const res: TypeApi<{ id: number }> = await request.post('/common/tours', data);
  return res;
};

export const apiGetSWR = async <T>(
  path: string,
  params?: Record<string, any>,
  options?: RequestOptions,
) => {
  const res = await request.get<TypeApi<T>>(path, params, options);
  return res;
};
