'use server';

import request from './request';

type EditProfile = {
  name?: string;
  description?: string;
};

export type OrderBuddyParams = {
  number_people: number;
  time: string;
  phone: string;
  is_save: boolean;
  note: string;
  supplier: number;
};

export const apiEditProfile = async (userId: number, data: EditProfile) => {
  await request.put(`/admin/suppliers/${userId}`, data);
};

export const apiLikeTour = async (tourId: string) => {
  const res: TypeApi<{ status: 'like' | 'unlike' }> = await request.post(
    `/profile/like/${tourId}`,
    undefined,
    {
      params: {
        type: 'tour',
      },
    },
  );
  return res;
};

export const apiOrderBuddy = async (params: OrderBuddyParams) => {
  await request.post(
    '/profile/order',
    {
      type: 'buddy',
      ...params,
    },
    {
      authorize: false,
    },
  );
};
