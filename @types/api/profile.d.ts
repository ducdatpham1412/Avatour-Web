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
  | 'other-service'; // Dịch vụ khác

interface TypeProfile {
  id: number;
  account_type: 'holder' | 'admin' | 'user' | 'shop' | 'location' | 'tour-guide';
  email: string | null;
  phone: string | null;
  name: string;
  avatar: string;
  description: string;
  followers: number;
  followings: number;
  gender: number;
  location: string;
  lat: number;
  lng: number;
  gg_map: string;
  ward: string;
  min_cost: number;
  max_cost: number;
  duration: number;
  services: Service[];
  start_time: number;
  end_time: number;
  total_ratings: number;
  average_stars: number;
  link: string[];
  rank: number;
  status: number;
}
