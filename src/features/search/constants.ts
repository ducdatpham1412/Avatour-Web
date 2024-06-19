import {
  BikeIcon,
  ClapperboardIcon,
  FishIcon,
  HomeIcon,
  HotelIcon,
  ShoppingCartIcon,
} from 'lucide-react';

import {
  BeachIcon,
  BookIcon,
  CafeIcon,
  CampingIcon,
  CheckInIcon,
  CreativeIcon,
  CultureIcon,
  FlowerIcon,
  HistoryIcon,
  LunchIcon,
  MuseumIcon,
  OtherBackpackIcon,
  PagodaIcon,
  ParkIcon,
  TeamBuildingIcon,
  VolunteerIcon,
} from '@/components/icon';

export type AnimationFrame = {
  tagName: string;
  child: AnimationFrame[];
} & Record<string, string | AnimationFrame[]>;

export const serviceDataDetail: Record<
  Service,
  { name: string; icon: typeof CultureIcon | typeof BikeIcon }
> = {
  culture: {
    name: 'Văn hoá',
    icon: CultureIcon,
  },
  creative: {
    name: 'Sáng tạo',
    icon: CreativeIcon,
  },
  art: {
    name: 'Nghệ thuật',
    icon: CreativeIcon,
  },
  history: {
    name: 'Lịch sử',
    icon: HistoryIcon,
  },
  museum: {
    name: 'Bảo tàng',
    icon: MuseumIcon,
  },
  pagoda: {
    name: 'Đền, Chùa',
    icon: PagodaIcon,
  },
  catholic: {
    name: 'Nhà thờ',
    icon: PagodaIcon,
  },
  'check-in': {
    name: 'Check-in',
    icon: CheckInIcon,
  },
  flower: {
    name: 'Địa điểm hoa',
    icon: FlowerIcon,
  },
  beach: {
    name: 'Bãi biển',
    icon: BeachIcon,
  },
  book: {
    name: 'Sách',
    icon: BookIcon,
  },
  park: {
    name: 'Công viên',
    icon: ParkIcon,
  },
  mountain: {
    name: 'Núi',
    icon: ParkIcon,
  },
  cave: {
    name: 'Hang động',
    icon: ParkIcon,
  },
  water: {
    name: 'Suối, Thác',
    icon: ParkIcon,
  },
  'other-backpack': {
    name: 'Khám phá khác',
    icon: OtherBackpackIcon,
  },
  breakfast: {
    name: 'Ăn sáng',
    icon: LunchIcon,
  },
  lunch: {
    name: 'Ăn trưa',
    icon: LunchIcon,
  },
  dinner: {
    name: 'Ăn tối',
    icon: LunchIcon,
  },
  'other-food': {
    name: 'Ẩm thực khác',
    icon: LunchIcon,
  },
  coffee: {
    name: 'Cafe',
    icon: CafeIcon,
  },
  tea: {
    name: 'Trà',
    icon: CafeIcon,
  },
  pub: {
    name: 'Bar, Pub',
    icon: CafeIcon,
  },
  'other-drink': {
    name: 'Đồ uống khác',
    icon: CafeIcon,
  },
  volunteer: {
    name: 'Tình nguyện',
    icon: VolunteerIcon,
  },
  camping: {
    name: 'Cắm trại',
    icon: CampingIcon,
  },
  'team-building': {
    name: 'Team-building',
    icon: TeamBuildingIcon,
  },
  'transport-to': {
    name: 'Xe đi',
    icon: BikeIcon,
  },
  'transport-in': {
    name: 'Thuê xe',
    icon: BikeIcon,
  },
  bicycle: {
    name: 'Thuê xe đạp',
    icon: BikeIcon,
  },
  homestay: {
    name: 'Homestay',
    icon: HomeIcon,
  },
  hotel: {
    name: 'Khách sạn',
    icon: HotelIcon,
  },
  shopping: {
    name: 'Mua sắm',
    icon: ShoppingCartIcon,
  },
  fishing: {
    name: 'Câu cá',
    icon: FishIcon,
  },
  entertainment: {
    name: 'Giải trí',
    icon: ClapperboardIcon,
  },
  'other-service': {
    name: 'Khác',
    icon: CultureIcon,
  },
};
