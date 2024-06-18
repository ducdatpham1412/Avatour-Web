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
