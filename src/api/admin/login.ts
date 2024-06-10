'use server';
import { cookies as getCookies } from 'next/headers';

import request from '@/api/request';
import { ACCOUNT_TYPE } from '@/configs/constants';
import { logger } from '@/lib';

interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface ProfileResponse {
  success: boolean;
  data: Passport;
}

const adminLogin = async (email: string, password: string) => {
  const cookies = getCookies();

  const { data } = await request.post<TypeApi<LoginResponse>>(
    '/admin/login',
    {
      username: email,
      password,
    },
    { authorize: false },
  );

  cookies.set('token', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  cookies.set('refresh_token', data.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
};

const getProfile = async (options?: {
  token: string;
}): Promise<ActionResponse<ProfileResponse['data']>> => {
  try {
    const res: ProfileResponse = await request.get(
      '/common/passport',
      undefined,
      options?.token
        ? {
            cache: 'no-store',
            headers: { Authorization: `Bearer ${options.token}` },
          }
        : { cache: 'no-store' },
    );

    if (
      res.data.profile.account_type !== ACCOUNT_TYPE.admin &&
      res.data.profile.account_type !== ACCOUNT_TYPE.superAdmin
    ) {
      return {
        error: {
          message: 'You not is admin, please try another account',
          code: 401,
        },
      };
    }

    return {
      data: res.data,
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
