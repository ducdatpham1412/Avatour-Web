import { ACCOUNT_TYPE } from '@/configs/constants';
import { serviceDataDetail } from '@/features/search/constants';

import { FormFieldDefine } from './types';

const editSupplierFields = {
  avatar: {
    name: 'avatar',
    label: 'Avatar',
    placeholder: 'Add your here',
  },
  location: {
    name: 'location',
    label: 'Location',
    placeholder: 'Location',
  },
  name: {
    name: 'name',
    label: 'Name',
    placeholder: 'Name',
  },
  lat: {
    name: 'lat',
    label: 'Lat',
    placeholder: 'Lat',
  },
  lng: {
    name: 'lng',
    label: 'Lng',
    placeholder: 'Lng',
  },
  gg_map: {
    name: 'gg_map',
    label: 'Gg map',
    placeholder: 'Gg map',
  },
  ward: {
    name: 'ward',
    label: 'Ward',
    placeholder: 'Ward',
  },
  duration: {
    name: 'duration',
    label: 'Duration (hours)',
    placeholder: 'Duration',
  },
  min_cost: {
    name: 'min_cost',
    label: 'Min cost',
    placeholder: 'Min cost',
  },
  max_cost: {
    name: 'max_cost',
    label: 'Max cost',
    placeholder: 'Max cost',
  },
  start_time: {
    name: 'start_time',
    label: 'Start time',
    placeholder: 'Start time',
  },
  end_time: {
    name: 'end_time',
    label: 'End time',
    placeholder: 'End time',
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
  },
  phone: {
    name: 'phone',
    label: 'SDT',
    placeholder: 'Phone',
  },
  services: {
    name: 'services',
    label: 'Loại hình',
    options: Object.keys(serviceDataDetail).map(key => {
      return {
        id: key,
        name: serviceDataDetail[key as Service].name,
      };
    }),
  },
  account_type: {
    name: 'account_type',
    label: 'Loại tài khoản',
    options: [
      { id: ACCOUNT_TYPE.shop, name: 'Shop' },
      { id: ACCOUNT_TYPE.location, name: 'Location' },
    ],
  },
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Description',
  },
  link: {
    name: 'link',
    label: 'Link',
    placeholder: 'Paste link',
  },
} as FormFieldDefine<TypeProfile>;

const filterSuppliersFields = {
  account_type: {
    name: 'at',
    label: 'Loại tài khoản',
    options: [
      {
        id: 'all',
        name: 'All',
      },
      {
        id: ACCOUNT_TYPE.shop,
        name: 'Shop',
      },
      {
        id: ACCOUNT_TYPE.location,
        name: 'Location',
      },
      {
        id: 'del',
        name: 'Đã xoá',
      },
    ],
  },
  services: {
    name: 'sv',
    label: 'Loại hình',
    options: [
      {
        id: 'backpack',
        name: 'Đi phượt',
      },
      {
        id: 'cuisine',
        name: 'Ẩm thực',
      },
      {
        id: 'camping',
        name: 'Cám trại',
      },
      {
        id: 'team-building',
        name: 'Team building',
      },
    ],
  },
  price: {
    name: 'p',
    label: 'Giá tiền',
    options: [
      {
        id: 1,
        name: '0 - 1.000.000 vnđ',
      },
      {
        id: 2,
        name: '1.000.000 - 3.000.000 vnđ',
      },
      {
        id: 3,
        name: '3.000.000 - 5.000.000 vnđ',
      },
      {
        id: 4,
        name: 'Trên 5.000.000 vnđ',
      },
    ],
  },
} satisfies FormFieldDefine<Record<string, any>>;

export { editSupplierFields, filterSuppliersFields };
