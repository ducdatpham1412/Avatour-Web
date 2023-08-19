'use server';
import { cookies as getCookies } from 'next/headers';

import { makeError } from '@/lib';

import request from '../request/api';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
  };
}

interface ProfileResponse {
  success: boolean;
  data: AdminProfile;
}

const LOGIN_URL = '/admin/login';
const GET_PROFILE_URL = '/common/passport';

const adminLogin = async (email: string, password: string): Promise<ActionResponse> => {
  const cookies = getCookies();
  try {
    const { data, success } = await request.post<LoginResponse>(LOGIN_URL, {
      username: email,
      password,
    });

    if (!success) {
      return {
        error: {
          message: 'login_fail',
          code: 400,
        },
      };
    }

    const { token, refreshToken } = data;

    cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return {};
  } catch (error) {
    const err = makeError(error);
    return {
      error: {
        message: err!.message,
      },
    };
  }
};

const getProfile = async (): Promise<ActionResponse> => {
  const cookies = getCookies();
  const token = cookies.get('token');
  const refreshToken = cookies.get('refresh_token');
  if (!token || !refreshToken) {
    return unAuthorized();
  }

  try {
    const response = await request<ProfileResponse>(GET_PROFILE_URL, undefined, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!response.success) {
      throw new Error('');
    }

    return {
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return unAuthorized();
  }
};

function unAuthorized() {
  return Promise.resolve({
    error: {
      message: 'missing token in cookie',
      code: 401,
    },
  });
}

export { adminLogin, getProfile };
