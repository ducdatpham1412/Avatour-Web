'use server';
import { revalidateTag } from 'next/cache';

import request from '@/api/request';
import { logger, makeError, parseFormData } from '@/lib';

const SUPPLIERS_PATH = '/admin/suppliers';
const SUPPLILERS_TAG = '/admin/suppliers';

const getSuppliers = async (options: Partial<GetSuppliersFilter>) => {
  try {
    const { data } = await request.get<{ data: TypeProfile[] }>(SUPPLIERS_PATH, undefined, {
      next: {
        tags: [SUPPLILERS_TAG],
      },
    });
    return applyFilterSuppliers(data, options);
  } catch (error) {
    logger.error('error', error);
    throw error;
  }
};

const addSupplier = async (data: Partial<TypeProfile>) => {
  await request.post(SUPPLIERS_PATH, data);
  revalidateTag(SUPPLILERS_TAG);
};

const updateSupplier = async (
  id: number | undefined,
  data: Partial<TypeProfile>,
): Promise<ActionResponse> => {
  if (!id) {
    return {
      error: {
        message: 'invalid supplier id',
        code: 400,
      },
    };
  }
  try {
    await request.put(`${SUPPLIERS_PATH}/${id}`, parseFormData(data));
    revalidateTag(SUPPLILERS_TAG);
    return {};
  } catch (e) {
    const error = makeError(e);
    return {
      error: {
        message: error?.message ?? 'Error',
        code: error?.code,
      },
    };
  }
};

const applyFilterSuppliers = (
  suppliers: TypeProfile[],
  searchQueries: Partial<GetSuppliersFilter>,
) => {
  let listSupplier: (TypeProfile | undefined)[];
  const services = searchQueries.sv;
  const filter = {
    account_type: searchQueries.at,
    services: services !== undefined ? (Array.isArray(services) ? services : [services]) : [],
  };

  if (filter.account_type && filter.account_type !== '0' && filter.services) {
    listSupplier = suppliers.map(item => {
      const isHasService = filter.services.every(service =>
        item.services?.includes(parseInt(service)),
      );
      const isTrueAccountType = item.account_type?.toString() === filter.account_type;
      if (isTrueAccountType && isHasService) {
        return item;
      }
    });
  } else if (filter.account_type && filter.account_type !== '0') {
    listSupplier = suppliers.map(item => {
      const isTrueAccountType = item.account_type?.toString() === filter.account_type;
      if (isTrueAccountType) {
        return item;
      }
    });
  } else if (filter.services) {
    listSupplier = suppliers.map(item => {
      const isHasService = filter.services.every(service =>
        item.services.includes(parseInt(service)),
      );
      if (isHasService) {
        return item;
      }
    });
  } else {
    listSupplier = suppliers;
  }

  return listSupplier.filter(s => !!s) as TypeProfile[];
};

export { addSupplier, getSuppliers, updateSupplier };
