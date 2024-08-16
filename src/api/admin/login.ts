'use server';

import request from '@/api/request';
import { ACCOUNT_TYPE } from '@/configs/constants';
import { logger } from '@/lib';

import { setTokenCookies } from '../auth';

interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface ProfileResponse {
  success: boolean;
  data: Passport;
}

export const adminLogin = async (email: string, password: string) => {
  const { data } = await request.post<TypeApi<LoginResponse>>(
    '/admin/login',
    {
      username: email,
      password,
    },
    { authorize: false },
  );

  setTokenCookies(data);
};

export const getProfile = async (): Promise<ActionResponse<ProfileResponse['data']>> => {
  try {
    const res: ProfileResponse = await request.get('/common/passport', undefined, {
      next: {
        revalidate: false,
      },
    });

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
