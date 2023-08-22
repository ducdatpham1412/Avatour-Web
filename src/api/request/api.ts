'use server';
import nodeFetch from 'node-fetch';
import { cookies as getCookies } from 'next/headers';

import { API_ENDPOINT } from '@/configs';
import { paramsToUrl } from '@/lib';

import { StatusCode, statusText } from './constants';

const parseData = <T = any>(res: Response) => {
  const contentType = res.headers.get('Content-Type');
  if (contentType?.includes('text')) {
    return res.text() as T;
  }
  return res.json() as T;
};

const parseError = <T>(data: T, res: Response) => {
  if (typeof data === 'string') {
    return new Error(data);
  } else if (typeof data === 'object' && data && 'message' in data && data.message) {
    return new Error((data as Record<string, any>)?.message);
  } else if (res.statusText) {
    return new Error(res.statusText);
  }

  const status = res.status as StatusCode;
  return new Error(statusText[status]);
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
      body = JSON.stringify(params);
      headers.set('Content-Type', 'application/json');
    }
  } else if (params) {
    url += `?${paramsToUrl(params)}`;
  }

  if (authorize) {
    const cookies = getCookies();
    const token = cookies.get('token');
    if (!token) {
      throw new Error('Unauthorized');
    }

    headers.set('Authorization', `Bearer ${token.value}`);
  }

  console.error('LOG', url);

  const response = await fetcher(url, { ...options, method, body, headers });
  const data = parseData<T>(response);
  if (!response.ok) {
    throw parseError(data, response);
  }

  return data;
};

const request = Object.assign(api, {
  post: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'POST' }),
  put: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'PUT' }),
  delete: (path: string, params?: Record<string, any>, options?: RequestOptions) =>
    api(path, params, { ...options, method: 'DELETE' }),
} as HTTPRequest);

const useEndpoint = (path: string) => API_ENDPOINT + path;

export { useEndpoint };
export default request;
