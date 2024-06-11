'use server';
import { revalidateTag } from 'next/cache';

import request from '@/api/request';
import { logger, parseFormData } from '@/lib';

const SUPPLIERS_PATH = '/admin/suppliers';
const SUPPLIERS_TAG = '/admin/suppliers';

interface GetSuppliersFilter {
  sv: Service[] | Service;
  at: 'all' | 'shop' | 'location';
}

const applyFilterSuppliers = (data: TypeProfile[], searchQueries: Partial<GetSuppliersFilter>) => {
  const services = searchQueries.sv;
  const filter = {
    account_type: searchQueries.at,
    services: services !== undefined ? (Array.isArray(services) ? services : [services]) : [],
  };

  if (filter.account_type && filter.account_type !== 'all' && filter.services.length) {
    data = data.filter(item => {
      const isHasService = filter.services.every(s => item.services.includes(s));
      const isTrueAccountType = item.account_type === filter.account_type;

      return isHasService && isTrueAccountType;
    });
  } else if (filter.account_type && filter.account_type !== 'all') {
    data = data.filter(item => {
      return item.account_type === filter.account_type;
    });
  } else if (filter.services.length) {
    data = data.filter(item => {
      return filter.services.every(s => item.services.includes(s));
    });
  }

  return data;
};

export const getSuppliers = async (options: Partial<GetSuppliersFilter>) => {
  try {
    const { data } = await request.get<TypeApi<TypeProfile[]>>(SUPPLIERS_PATH, undefined, {
      next: {
        tags: [SUPPLIERS_TAG],
      },
    });
    return applyFilterSuppliers(data, options);
  } catch (error) {
    logger.error('error', error);
    throw error;
  }
};

export const addSupplier = async (data: Partial<TypeProfile>) => {
  await request.post(SUPPLIERS_PATH, parseFormData(data));
  revalidateTag(SUPPLIERS_TAG);
};

export const updateSupplier = async (id: number, data: Partial<TypeProfile>) => {
  const formData = parseFormData(data);
  await request.put(`${SUPPLIERS_PATH}/${id}`, formData);
  revalidateTag(SUPPLIERS_TAG);
};
