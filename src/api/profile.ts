'use server';

import request from './request';

export type EditProfileParams = {
  name?: string;
  description?: string;
  location?: string;
};

export type OrderBuddyParams = {
  number_people: number;
  time: string;
  phone: string;
  is_save: boolean;
  note: string;
  supplier: number;
};

export type OrderProductParams = {
  product_id: string;
  number_order: number;
  address: string;
  phone: string;
  is_save: boolean;
  note: string;
};

export type CreateProductParams = Omit<TypeProduct, 'id'> & {
  creator?: number;
};

export type EditProductParams = Omit<TypeProduct, 'creator'>;

export const apiEditProfile = async (userId: number, data: EditProfileParams) => {
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

export const apiOrderBuddy = async (params: OrderBuddyParams, authorize: boolean) => {
  await request.post(
    '/profile/order',
    {
      type: 'buddy',
      ...params,
    },
    {
      authorize,
    },
  );
};

export const apiOrderProduct = async (body: OrderProductParams, authorize: boolean) => {
  await request.post(
    '/profile/order',
    {
      type: 'product',
      ...body,
    },
    {
      authorize,
    },
  );
};

export const apiCreateMagazine = async (
  body: Pick<TypeMagazine, 'title' | 'content' | 'description' | 'keywords'>,
) => {
  const res: TypeApi<{ magazine_id: string }> = await request.post('/profile/magazines', body);
  return res.data;
};

export const apiEditMagazine = async (
  magazineId: string,
  body: Pick<TypeMagazine, 'title' | 'content' | 'description' | 'keywords'>,
) => {
  await request.put('/profile/magazines', body, {
    params: {
      magazine_id: magazineId,
    },
  });
};

export const apiDeleteMagazine = async (magazineId: string) => {
  await request.delete('/profile/magazines', undefined, {
    params: {
      magazine_id: magazineId,
    },
  });
};

export const apiCreateProduct = async (body: CreateProductParams) => {
  const res: TypeApi<{ product_id: string }> = await request.post('/profile/products', body);
  return res;
};
export const apiEditProduct = async (body: EditProductParams) => {
  const { id, ...rest } = body;
  await request.put('/profile/products', rest, {
    params: {
      product_id: id,
    },
  });
};
export const apiDeleteProduct = async (productId: string) => {
  await request.delete('/profile/products', undefined, {
    params: {
      product_id: productId,
    },
  });
};
