'use server';

import request from './request';

export const apiGetPassport = async () => {
  const res: TypeApi<Passport> = await request.get('/common/passport');
  return res.data;
};

export const apiGetResource = async (authorize: boolean) => {
  const res: TypeApi<Resource> = await request.get('/common/resource', undefined, {
    authorize,
    // next: {
    //   revalidate: 10,
    // },
  });
  return res.data;
};

type OptionsCreateTour = {
  params: {
    type: 'favorite';
  };
};
type DataCreateTour = Pick<
  TypeTour,
  'name' | 'description' | 'duration' | 'min_cost' | 'max_cost'
> & {
  schedule: Array<number[]>;
};
export const apiCreateTour = async (data: DataCreateTour, options?: OptionsCreateTour) => {
  const res: TypeApi<{ tour_id: string }> = await request.post('/common/tours', data, {
    params: options?.params,
  });
  return res;
};

export const apiEditTour = async (tourId: string, data: DataCreateTour) => {
  await request.put(`/common/tours/${tourId}`, data);
};

export const apiDeleteTour = async (tourId: string) => {
  await request.delete(`/common/tours/${tourId}`);
};

export const apiMakeTourBeMine = async (tourId: string, data: DataCreateTour) => {
  await request.patch(`/common/tours/${tourId}`, data);
};

export const apiGetSWR = async <T>(
  path: string,
  params?: Record<string, any>,
  options?: RequestOptions,
) => {
  const res = await request.get<TypeApi<T>>(path, params, options);
  return res;
};
