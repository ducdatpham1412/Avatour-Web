'use server';

import request from './request';

type EditProfile = {
  name?: string;
  description?: string;
};

export const apiEditProfile = async (userId: number, data: EditProfile) => {
  await request.put(`/admin/suppliers/${userId}`, data);
};
