import { ACCOUNT_TYPE } from '@/configs/constants';
import { serviceDataDetail } from '@/features/search/constants';
import { SupplierData } from '@/api/admin';

import { FormFieldDefine } from './types';

const editSupplierFields = (cats: Resource['cats']) => {
  return {
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
      options: cats.map(c => {
        return {
          id: c,
          name: serviceDataDetail[c].name || c,
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
    lat_lng: {
      name: 'lat_lng',
      label: 'Lat, Lng',
      placeholder: 'Lat, Lng',
    },
  } as FormFieldDefine<SupplierData>;
};

export { editSupplierFields };
