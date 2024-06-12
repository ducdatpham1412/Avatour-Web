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

export const omitEmpty = (value: Record<any, any>) => {
  return Object.keys(value).reduce((pre, key) => {
    if (value[key] !== undefined && value[key] !== null) {
      pre[key] = value[key];
    }
    return pre;
  }, {} as typeof value);
};

export const getCategoriesByServices = (services: Service[]) => {
  const categoriesCount: Record<string, number> = {};

  let mostFrequentCategory;
  let secondMostFrequentCategory;

  let largestCount = 0;
  let secondLargestCount = 0;

  services.forEach(service => {
    let category;

    switch (service) {
      case 'culture':
      case 'creative':
      case 'art':
        category = 'Văn hoá';
        break;
      case 'history':
        category = 'Lịch sử';
        break;
      case 'museum':
      case 'check-in':
      case 'flower':
      case 'book':
        category = 'Tham quan';
        break;
      case 'mountain':
      case 'cave':
      case 'water':
      case 'other-backpack':
        category = 'Khám phá';
        break;
      case 'pagoda':
      case 'catholic':
        category = 'Tôn giáo';
        break;
      case 'beach':
      case 'park':
      case 'pub':
      case 'shopping':
      case 'fishing':
      case 'entertainment':
        category = 'Giải trí';
        break;
      case 'breakfast':
      case 'lunch':
      case 'dinner':
      case 'other-food':
      case 'tea':
      case 'other-drink':
        category = 'Ẩm thực';
        break;
      case 'volunteer':
        category = 'Tình nguyện';
        break;
      case 'camping':
        category = 'Cắm trại';
        break;
      case 'team-building':
        category = 'Team building';
        break;
    }

    if (!category) return;

    if (category in categoriesCount) {
      categoriesCount[category] += 1;
    } else {
      categoriesCount[category] = 1;
    }

    if (categoriesCount[category] > largestCount) {
      largestCount = categoriesCount[category];
    }
  });

  for (const category in categoriesCount) {
    if (largestCount === categoriesCount[category]) {
      if (mostFrequentCategory) {
        return [mostFrequentCategory, category];
      }
      mostFrequentCategory = category;
    } else {
      const isFirstValue = !secondLargestCount;
      const isNewValidValue = largestCount - categoriesCount[category] < secondLargestCount;
      if (isFirstValue || isNewValidValue) {
        secondLargestCount = largestCount - categoriesCount[category];
        secondMostFrequentCategory = category;
      }
    }
  }

  return [mostFrequentCategory, secondMostFrequentCategory].filter(e => e !== undefined);
};

export { cn, isDev, omit, paramsToUrl, parseFormData };
