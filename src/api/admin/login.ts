'use server';
import { cookies as getCookies } from 'next/headers';

import { logger, makeError } from '@/lib';
import { ACCOUNT_TYPE } from '@/configs/constants';

import request from '../request/api';
import { ERROR_MESSAGE } from '../request/constants';

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
    const { data, success } = await request.post<LoginResponse>(
      LOGIN_URL,
      {
        username: email,
        password,
      },
      { authorize: false },
    );

    if (!success) {
      return {
        error: {
          message: ERROR_MESSAGE['login_fail'] ?? 'login_fail',
          code: 400,
        },
      };
    }

    await getProfile(data);

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

const getProfile = async (options?: {
  token: string;
}): Promise<ActionResponse<ProfileResponse['data']>> => {
  try {
    let response: ProfileResponse;
    if (options?.token) {
      response = await request.get(GET_PROFILE_URL, undefined, {
        cache: 'no-store',
        headers: { Authorization: `Bearer ${options.token}` },
      });
    } else {
      response = await request.get(GET_PROFILE_URL, undefined, { cache: 'no-store' });
    }

    if (!response.success) {
      throw new Error('');
    }
    if (
      response.data?.profile.account_type !== ACCOUNT_TYPE.admin &&
      response.data?.profile.account_type !== ACCOUNT_TYPE.superAdmin
    ) {
      return {
        error: {
          message: 'You not is admin, please try another account',
          code: 401,
        },
      };
    }

    return {
      data: response.data,
    };
  } catch (error) {
    logger.error(error);
    return {
      error: {
        message: 'missing token in cookie',
        code: 401,
      },
    };
  }
};

export { adminLogin, getProfile };
