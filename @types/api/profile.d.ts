type Service =
  /**
   * 1. Backpack
   */
  // Traditional
  | 'culture' // Văn hoá
  | 'creative' // Sáng tạo
  | 'art' // Nghệ thuật
  | 'history' // Lịch sử
  | 'museum' // Bảo tàng
  | 'pagoda' // Đền, Chùa
  | 'catholic' // Nhà thờ
  // Chill
  | 'check-in' // Check-in
  | 'flower' // Địa điểm hoa
  | 'beach' // Bãi biển
  | 'book' //  Sách
  | 'park' // Công viên
  | 'mountain'
  | 'cave'
  | 'water'
  // Other
  | 'other-backpack' // Đi phượt
  /**
   * 2. Cuisine
   */
  // Food
  | 'breakfast' // Ăn sáng
  | 'lunch' // Ăn trưa
  | 'dinner' // Ăn tối
  | 'other-food' // Ẩm thực khác
  // Drink
  | 'coffee' // Cafe
  | 'tea' // Trà
  | 'pub' // Bar, Pub
  | 'other-drink' // Đồ uống khác
  /**
   * 3. Other categories
   */
  | 'volunteer' // Tình nguyện
  | 'camping' // Cắm trại
  | 'team-building' // Team-building
  /**
   * 4. Travel services
   */
  | 'transport-to' // Xe đi
  | 'transport-in' // Thuê xe
  | 'bicycle' // Thuê xe đạp
  | 'homestay' // Homestay
  | 'hotel' // Khách sạn
  | 'shopping' // Mua sắm
  | 'fishing' // Câu cá
  | 'entertainment' // Giải trí
  | 'resort'
  | 'spa'
  | 'other-service'; // Dịch vụ khác

type ProfileInfo = {
  // Location
  lat: number;
  lng: number;
  ward: string;
  gg_map: string;
  // Cost
  min_cost: number;
  max_cost: number;
  info_cost: string;
  currencies: string[];
  // Time
  duration: number;
  start_time: number;
  end_time: number;
  best_hours: string;
  best_time: string;
  // Other info
  value: string;
  tag: string;
  facilities: string[];
  take_away: string[];
  dresses: string[];
  activities: string[];
  // Contributed by users
  total_ratings: number;
  average_stars: number;
  rank: number;
};

type ProfileSetting = {
  gender: number;
  birthday: string;
  theme: 'dark' | 'light';
  language: 'vi' | 'en';
};

type TypeProfile = {
  id: number;
  email: string | null;
  phone: string | null;
  name: string;
  description: string;
  avatar: string;
  followers: number;
  followings: number;
  location: string;
  services: Service[];
  link: Array<{
    img: string;
    link: string;
  }>;
  parent: number | null;
  status: number;
} & (
  | {
      account_type: 'location';
      info: ProfileInfo;
      setting: null;
    }
  | {
      account_type: 'holder' | 'admin' | 'user' | 'tour-guide';
      info: null;
      setting: ProfileSetting;
    }
  | {
      account_type: 'shop';
      info: ProfileInfo;
      setting: ProfileSetting;
    }
);
