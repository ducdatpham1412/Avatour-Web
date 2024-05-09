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
  duration: {
    name: 'duration',
    label: 'Duration (hours)',
    placeholder: 'Duration',
  },
  min_cost: {
    name: 'min_cost',
    label: 'Min cost',
    placeholder: 'Cost',
  },
  max_cost: {
    name: 'max_cost',
    label: 'Max cost',
    placeholder: 'Cost',
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
    options: [
      { id: 2, name: 'Food tour' },
      { id: 3, name: 'Cắm trại' },
      { id: 4, name: 'Đi phượt' },
      { id: 5, name: 'Team building' },
    ],
  },
  account_type: {
    name: 'account_type',
    options: [
      { id: 1, name: 'Shop' },
      { id: 3, name: 'Location' },
    ],
  },
  description: {
    name: 'description',
    label: 'Description',
    placeholder: 'Description',
  },
} as FormFieldDefine<TypeProfile>;

const supplierServices = [
  { id: 2, name: 'Food tour' },
  { id: 3, name: 'Cắm trại' },
  { id: 4, name: 'Đi phượt' },
  { id: 5, name: 'Team building' },
];

const filterSuppliersFields = {
  account_type: {
    name: 'at',
    label: 'Loại tài khoản',
    options: [
      {
        id: 0,
        name: 'All',
      },
      {
        id: 1,
        name: 'Shop',
      },
      {
        id: 3,
        name: 'Location',
      },
    ],
  },
  services: {
    name: 'sv',
    label: 'Loại hình',
    options: [
      {
        id: 2,
        name: 'Food tour',
      },
      {
        id: 3,
        name: 'Cám trại',
      },
      {
        id: 4,
        name: 'Đi phượt',
      },
      {
        id: 5,
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

export { editSupplierFields, filterSuppliersFields, supplierServices };
