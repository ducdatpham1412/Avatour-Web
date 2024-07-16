'use server';

import request from './request';

type EditProfile = {
  name?: string;
  description?: string;
};

export const apiEditProfile = async (userId: number, data: EditProfile) => {
  await request.put(`/admin/suppliers/${userId}`, data);
};

export const apiLikeTour = async (tourId: number) => {
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
