interface TypeSearchResponse {
  transports: Array<any>;
  hotels: Array<any>;
  tours: Array<
    Array<{
      id: string;
      name: string;
      description: string;
      avatar: string;
      location: string;
      lat: number;
      lng: number;
      min_cost: string;
      max_cost: string;
      duration: number;
      total_ratings: number;
      average_stars: number;
    }>
  >;
}

interface FavoriteTourData {
  transport?: string;
  hotel?: string;
  schedule: string[];
  location: string;
  start_location: string;
  number_people: number;
  start_time: string;
  end_time: string;
  start_price: number;
  end_price: number;
  creator: number;
  creator_name: string;
  creator_avatar: string;
}
