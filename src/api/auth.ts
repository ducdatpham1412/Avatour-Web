'use server';
import { deleteTokenCookies, getTokenCookies, setTokenCookies } from './cookies';
import { request } from './request/api';

interface Login {
  username: string;
  password: string;
}

interface Register {
  name: string;
  username: string;
  password: string;
  code: string;
}

type RequestOTP = {
  type_otp: 'register';
  username: string;
  password: string;
};

export const apiLogin = async (p: Login) => {
  const res: TypeApi<LoginResponse> = await request.post('/auth/login', p, {
    authorize: false,
  });
  setTokenCookies(res.data);
  return res;
};

export const apiRegister = async (p: Register) => {
  const res: TypeApi<LoginResponse> = await request.post('/auth/register', p, {
    authorize: false,
  });
  setTokenCookies(res.data);
  return res;
};

export const apiRequestOTP = async (p: RequestOTP) => {
  await request.post('/auth/otp', p, {
    authorize: false,
  });
};

export const apiLogOut = async () => {
  const { refresh_token } = getTokenCookies();
  await request.post('/auth/log-out', {
    refreshToken: refresh_token,
  });
  deleteTokenCookies();
};
