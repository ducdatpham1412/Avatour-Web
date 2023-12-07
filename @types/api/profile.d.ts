interface TypeGetProfileResponse {
  id: number;
  account_type: number;
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
  start_time: number;
  end_time: number;
  total_ratings: number;
  average_stars: number;
  services: Array<number>;
  status: number;
  relationship: number;
}
