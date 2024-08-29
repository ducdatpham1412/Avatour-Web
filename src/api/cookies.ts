'use server';
import { cookies as getCookies } from 'next/headers';

export const setTokenCookies = (data: LoginResponse) => {
  const cookies = getCookies();
  if (data.token) {
    cookies.set('token', data.token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Uncomment this when having https
      secure: false,
    });
  }
  if (data.refreshToken) {
    cookies.set('refresh_token', data.refreshToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production', // Uncomment this when having https
      secure: false,
    });
  }
};
export const getTokenCookies = () => {
  const cookies = getCookies();
  return {
    token: cookies.get('token')?.value,
    refresh_token: cookies.get('refresh_token')?.value,
  };
};

export const deleteTokenCookies = () => {
  const cookies = getCookies();
  cookies.delete('token');
  cookies.delete('refresh_token');
};
