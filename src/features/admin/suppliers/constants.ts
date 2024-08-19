import { ACCOUNT_TYPE } from '@/configs/constants';
import { serviceDataDetail } from '@/features/search/constants';
import { SupplierData } from '@/api/admin';

import { FormFieldDefine } from './types';

const editSupplierFields = (cats: Resource['cats']) => {
  return {
    name: {
      name: 'name',
      label: 'Name',
      placeholder: 'Name',
    },
    avatar: {
      name: 'avatar',
      label: 'Avatar',
      placeholder: 'Add your here',
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
    // Location
    location: {
      name: 'location',
      label: 'Location',
      placeholder: 'Location',
    },
    ward: {
      name: 'ward',
      label: 'Ward',
      placeholder: 'Ward',
    },
    gg_map: {
      name: 'gg_map',
      label: 'Gg map',
      placeholder: 'Gg map',
    },
    lat_lng: {
      name: 'lat_lng',
      label: 'Lat, Lng',
      placeholder: 'Lat, Lng',
    },
    // Cost
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
    info_cost: {
      name: 'info_cost',
      label: 'Info cost',
      placeholder: 'Giá bao gồm ...',
    },
    currencies: {
      name: 'currencies',
      label: 'Tiền tệ thanh toán',
    },
    // Time
    duration: {
      name: 'duration',
      label: 'Tgian (giờ)',
      placeholder: 'Tgian chơi',
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
    best_hours: {
      name: 'best_hours',
      label: 'Giờ đẹp nhất',
      placeholder: 'Bạn nên đi từ ...',
    },
    best_time: {
      name: 'best_time',
      label: 'Đẹp nhất trong năm',
      placeholder: 'Mùa hè... Tháng...',
    },
    // Other info
    value: {
      name: 'value',
      label: 'Giá trị nhận được',
      placeholder: 'Giá trị nhận được',
    },
    tag: {
      name: 'tag',
      label: 'Tag đi kèm',
      placeholder: 'Tag đi kèm',
    },
    activities: {
      name: 'activities',
      label: 'Các hoạt động',
    },
    facilities: {
      name: 'facilities',
      label: 'Cơ sở vật chất',
    },
    take_away: {
      name: 'take_away',
      label: 'Mang gì theo',
    },
    dresses: {
      name: 'dresses',
      label: 'Mặc gì đi',
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
        { id: ACCOUNT_TYPE.buddy, name: 'Buddy' },
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
    parent: {
      name: 'parent',
      label: 'Parent',
      placeholder: '--',
    },
  } as FormFieldDefine<SupplierData>;
};

export { editSupplierFields };
