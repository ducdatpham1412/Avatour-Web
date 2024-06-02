type Service =
  /**
   * 1. Backpack
   */
  | 'backpack' // Đi phượt
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
  /**
   * 2. Cuisine
   */
  | 'cuisine' // Ẩm thực
  | 'food' // Nhà hàng/Quán ăn
  | 'breakfast' // Ăn sáng
  | 'lunch' // Ăn trưa
  | 'dinner' // Ăn tối
  | 'drink' // Đồ uống
  | 'pub' // Bar, Pub
  | 'other-food' // Ẩm thực khác
  /**
   * 3. Other categories
   */
  | 'volunteer' // Tình nguyện
  | 'camping' // Cắm trại
  | 'team-building' // Team-building
  /**
   * 4. Travel services
   */
  | 'travel-service' // Dịch vụ du lịch
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
