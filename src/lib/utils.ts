import { clsx, type ClassValue } from 'clsx';
import { omit as om } from 'lodash';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';

import { PARSE_ERROR_MESSAGE } from '@/api/request/constants';

import tailwindConfig from '../../tailwind.config';

export const twConfigs = resolveConfig(tailwindConfig);

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

export const estTourPrice = (schedule: TypeTour['schedule']) => {
  let minCost = 0;
  let maxCost = 0;

  schedule.forEach(day => {
    day.forEach(loc => {
      minCost += loc.min_cost;
      maxCost += loc.max_cost;
    });
  });

  minCost = (minCost + maxCost) / 2;

  return {
    minCost,
    maxCost,
  };
};

export const removeVietnameseTones = (str: string) => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str;
};

/**
 * @param sample: Must be list string had been remove Vietnamese tone and lower case
 */
export const search = (sample: string[], text: string) => {
  const resIndex: number[] = [];

  const temp = text.split(' ');
  const words = temp.map(w => removeVietnameseTones(w.trim().toLowerCase())).filter(w => w !== '');

  sample.forEach((name, index) => {
    for (let i = 0; i < words.length; i++) {
      const checkNotIncluded = !name.includes(words[i]);
      if (checkNotIncluded) {
        break;
      }
      if (i === words.length - 1) {
        resIndex.push(index);
      }
    }
  });

  return resIndex;
};

export { cn, isDev, omit, paramsToUrl, parseFormData };
