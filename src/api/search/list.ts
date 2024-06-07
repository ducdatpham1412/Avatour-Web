import { makeError } from '@/lib';

import request from '../request';

interface TourListParams {
  text: string;
}

export const getTourList = async (options: TourListParams) => {
  try {
    const data = await request.get<TypeApi<TypeTour[]>>(
      '/common/search',
      { type_search: 'ds', text: options.text },
      { authorize: false },
    );
    return data;
  } catch (e) {
    const error = makeError(e);
    return {
      message: error?.message ?? 'Error',
      code: error?.code,
    };
  }
};
