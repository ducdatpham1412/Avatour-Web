'use server';

import request from '@/api/request';
import { logger, parseFormData } from '@/lib';

const SUPPLIERS_PATH = '/admin/suppliers';
const SUPPLIERS_TAG = '/admin/suppliers';

interface GetSuppliersFilter {
  sv: Service[] | Service;
  at: 'all' | 'shop' | 'location' | 'del';
  dt: string;
}

const applyFilterSuppliers = (data: TypeProfile[], searchQueries: Partial<GetSuppliersFilter>) => {
  const services = searchQueries.sv;
  const filter = {
    account_type: searchQueries.at,
    services: services !== undefined ? (Array.isArray(services) ? services : [services]) : [],
    district: searchQueries.dt,
  };

  let hasServices = (_: TypeProfile) => true;
  let hasAccountType = (_: TypeProfile) => true;

  if (filter.account_type && filter.account_type !== 'all' && filter.account_type !== 'del') {
    hasAccountType = (item: TypeProfile) => item.account_type === filter.account_type;
  }
  if (filter.services.length) {
    hasServices = (item: TypeProfile) => filter.services.every(s => item.services.includes(s));
  }

  data = data.filter(item => {
    return hasAccountType(item) && hasServices(item);
  });

  return data;
};

export const getSuppliers = async (options: Partial<GetSuppliersFilter>) => {
  try {
    const { data } = await request.get<TypeApi<TypeProfile[]>>(
      SUPPLIERS_PATH,
      {
        dt: options.dt,
        at: options.at,
      },
      {
        next: {
          tags: [SUPPLIERS_TAG],
        },
      },
    );
    return applyFilterSuppliers(data, options);
  } catch (error) {
    logger.error('error', error);
    throw error;
  }
};

export const addSupplier = async (data: Partial<TypeProfile>) => {
  await request.post(SUPPLIERS_PATH, parseFormData(data));
};

export const updateSupplier = async (id: number, data: Partial<TypeProfile>) => {
  const formData = parseFormData(data);
  await request.put(`${SUPPLIERS_PATH}/${id}`, formData);
};

export const deleteOrActiveSupplier = async (id: number) => {
  await request.delete(SUPPLIERS_PATH, {
    user_id: id,
  });
};
