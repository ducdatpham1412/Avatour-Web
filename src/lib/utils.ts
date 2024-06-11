import { clsx, type ClassValue } from 'clsx';
import { omit as om } from 'lodash';
import { twMerge } from 'tailwind-merge';

import { PARSE_ERROR_MESSAGE } from '@/api/request/constants';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const omit = <T extends Record<string | number, any>, K extends keyof T = keyof T>(
  object: T,
  ...omitKeys: K[]
): Omit<T, K> => om(object, ...omitKeys);

const paramsToUrl = (params: Record<string, string | string[]>) =>
  Object.keys(params)
    .reduce((current, key) => current + `&${key}=${params[key]}`, '')
    .slice(1);

export function dirtyValues<T extends Record<string, any>>(dirtyFields: any, allValues: T): object {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map(key => [key, dirtyValues(dirtyFields[key], allValues[key])]),
  );
}

function formatPrice(value: number) {
  return value.toLocaleString('en-EN');
}

const parseFormData = (data: Record<string | number, any>) =>
  Object.keys(data).reduce((pre, key) => {
    convertFormValue(pre, key, data[key]);
    return pre;
  }, new FormData());

function convertFormValue<T extends string | number | (string | number)[]>(
  form: FormData,
  key: string,
  value: T | undefined,
) {
  if (typeof value === 'object' && value instanceof Blob) {
    form.set(key.toString(), value);
  } else if (Array.isArray(value)) {
    form.set(key.toString(), JSON.stringify(value));
  } else if (value !== undefined && value !== null) {
    form.set(key.toString(), value.toString());
  }
}

const isDev = process.env.NODE_ENV === 'development';

export const parseErrorMessage = (err: any) => {
  return PARSE_ERROR_MESSAGE[(err as Error).message] || (err as Error).message;
};

export { cn, formatPrice, isDev, omit, paramsToUrl, parseFormData };
