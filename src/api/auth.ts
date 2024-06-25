'use server';
import { cookies as getCookies } from 'next/headers';

import { request } from './request/api';

interface Login {
  username: string;
  password: string;
}
interface LoginResponse {
  token?: string;
  refreshToken?: string;
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

export const setTokenCookies = (data: LoginResponse) => {
  const cookies = getCookies();
  if (data.token) {
    cookies.set('token', data.token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Uncomment this when having https
    });
  }
  if (data.refreshToken) {
    cookies.set('refresh_token', data.refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Uncomment this when having https
    });
  }
};

export const deleteTokenCookies = () => {
  const cookies = getCookies();
  cookies.delete('token');
  cookies.delete('refresh_token');
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
  const cookies = getCookies();
  await request.post('/auth/log-out', {
    refreshToken: cookies.get('refresh_token')?.value,
  });
  deleteTokenCookies();
};
