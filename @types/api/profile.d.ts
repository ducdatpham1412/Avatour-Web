type Service =
  /**
   * 1. Backpack
   */
  | 'backpack'
  // Traditional
  | 'culture'
  | 'creative'
  | 'history'
  | 'pagoda'
  | 'catholic'
  // Chill
  | 'check-in'
  | 'flower'
  | 'beach'
  /**
   * 2. Cuisine
   */
  | 'cuisine'
  | 'food'
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'other-food'
  | 'drink'
  /**
   * 3. Other categories
   */
  | 'volunteer'
  | 'camping'
  | 'team-building'
  /**
   * 4. Travel services
   */
  | 'travel-service'
  | 'transport-to'
  | 'transport-in'
  | 'bicycle'
  | 'homestay'
  | 'hotel'
  | 'shopping'
  | 'fishing'
  | 'other-service';

interface TypeProfile {
  id: number;
  account_type: number;
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
  services: Array<number>;
  link: string;
  rank: number;
  status: number;
}
