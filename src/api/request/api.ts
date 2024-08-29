'use server';
import { API_ENDPOINT } from '@/configs';
import { logger, omitEmpty, paramsToUrl } from '@/lib';

import { deleteTokenCookies, getTokenCookies, setTokenCookies } from '../cookies';
import { ERROR_MESSAGE } from './constants';

type DataError = {
  errorMessage: string | Record<string, any>;
  errorKey: string;
  status: number;
};

const parseData = <T = any>(res: Response) => {
  const contentType = res.headers.get('Content-Type');
  if (contentType?.includes('text')) {
    return res.text() as Promise<T>;
  }
  return res.json() as Promise<T>;
};

const parseError = (data: DataError | string) => {
  if (typeof data === 'string') {
    return new Error(ERROR_MESSAGE.init_err);
  } else if (typeof data === 'object' && 'errorMessage' in data) {
    if (typeof data.errorMessage === 'string') {
      return new Error(data.errorMessage);
    }
    return new Error(JSON.stringify(data.errorMessage));
  }
  return new Error(ERROR_MESSAGE.init_err);
};

// for multiple requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (v: string) => void;
  reject: (v: string) => void;
}> = [];

const processQueue = (error: string | null, token: string | null) => {
  failedQueue.forEach((item: (typeof failedQueue)[number]) => {
    if (error) {
      item.reject(error);
    } else if (token) {
      item.resolve(token);
    } else {
      item.reject('Errors');
    }
  });

  failedQueue = [];
};

const api: API = async <T>(
  path: string,
  params?: Record<string, any>,
  options?: RequestOptions,
) => {
  const authorize = options?.authorize ?? true;
  options ??= {};
  const method = (options.method ?? 'get').toLowerCase();
  const headers = new Headers(options.headers);
  let url = (options.baseUrl ?? API_ENDPOINT) + path;
  let body: BodyInit | undefined;

  if (method === 'post' || method === 'put' || method === 'patch' || method === 'delete') {
    if (params instanceof FormData) {
      body = params;
    } else {
      body = JSON.stringify(omitEmpty(params ?? {}));
      headers.set('Content-Type', 'application/json');
    }
    if (options.params) {
      url += `?${paramsToUrl(omitEmpty(options.params))}`;
      delete options.params;
    }
  } else if (params) {
    url += `?${paramsToUrl(omitEmpty(params))}`;
  }

  if (authorize && !headers.get('Authorization')) {
    const { token } = getTokenCookies();
    if (!token) {
      throw new Error('Unauthorized');
    }

    headers.set('Authorization', `Bearer ${token}`);
  }

  logger.log(url, options.method, params);

  const configs: RequestInit = { ...options, method, body, headers, cache: 'no-cache' };

  const runAPI = async () => {
    const response = await fetch(url, configs);
    const data = parseData<T>(response);

    if (!response.ok) {
      const temp = await data;
      const error = parseError(temp as DataError);

      if (error.message === ERROR_MESSAGE.token_expired) {
        if (isRefreshing) {
          try {
            const newToken = await new Promise<string>((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            });
            (configs.headers as any).set('Authorization', `Bearer ${newToken}`);
            const res = await fetch(url, configs);
            return parseData<T>(res);
          } catch (err) {
            throw error;
          }
        }

        isRefreshing = true;
        try {
          const { refresh_token } = getTokenCookies();
          const res = await fetch(`${options.baseUrl ?? API_ENDPOINT}/auth/refresh-token`, {
            method: 'post',
            body: JSON.stringify({
              refresh: refresh_token,
            }),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          if (!res.ok) {
            throw error;
          }
          const {
            data: { access },
          } = await (res.json() as Promise<TypeApi<{ access: string }>>);
          (configs.headers as any).set('Authorization', `Bearer ${access}`);
          const resRetry = await fetch(url, configs);
          if (!resRetry.ok) {
            throw error;
          }
          setTokenCookies({
            token: access,
          });
          processQueue(null, access);
          return parseData<T>(resRetry);
        } catch (err) {
          processQueue(ERROR_MESSAGE.init_err, null);
          throw error;
        } finally {
          isRefreshing = false;
        }
      }

      if (error.message === ERROR_MESSAGE.token_blacklisted) {
        deleteTokenCookies();
        throw error;
      }

      throw error;
    }

    return data;
  };

  const d = runAPI();
  return d;
};

const request = Object.assign(api, {
  get: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options }),
  post: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'POST' }),
  put: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'PUT' }),
  patch: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'PATCH' }),
  delete: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'DELETE' }),
} as HTTPRequest);

export { request };
