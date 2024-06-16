'use server';
import { cookies as getCookies } from 'next/headers';
import nodeFetch from 'node-fetch';

import { API_ENDPOINT } from '@/configs';
import { logger, omitEmpty, paramsToUrl } from '@/lib';

import { ERROR_MESSAGE } from './constants';

type DataError = {
  errorMessage: string;
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
    return new Error(data);
  } else if (
    typeof data === 'object' &&
    'errorMessage' in data &&
    typeof data.errorMessage === 'string'
  ) {
    return new Error(data.errorMessage);
  }

  return new Error(ERROR_MESSAGE.init_err);
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
  const fetcher = (method === 'get' ? fetch : nodeFetch) as typeof fetch;
  let url = (options.baseUrl ?? API_ENDPOINT ?? '') + path;
  let body: BodyInit | undefined;

  if ((params && method === 'post') || method === 'put') {
    if (params instanceof FormData) {
      body = params;
    } else {
      body = JSON.stringify(omitEmpty(params ?? {}));
      headers.set('Content-Type', 'application/json');
    }
  } else if (params) {
    url += `?${paramsToUrl(omitEmpty(params))}`;
  }

  if (authorize && !headers.get('Authorization')) {
    const cookies = getCookies();
    const token = cookies.get('token');
    if (!token) {
      throw new Error('Unauthorized');
    }

    headers.set('Authorization', `Bearer ${token.value}`);
  }

  logger.log(url, params);

  const response = await fetcher(url, { ...options, method, body, headers });
  const data = parseData<T>(response);
  if (!response.ok) {
    const temp = await data;
    throw parseError(temp as DataError);
  }

  return data;
};

const request = Object.assign(api, {
  get: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options }),
  post: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'POST' }),
  put: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'PUT' }),
  delete: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'DELETE' }),
} as HTTPRequest);

export { request };
