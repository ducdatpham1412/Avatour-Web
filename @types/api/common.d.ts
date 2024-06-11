interface TypeApi<T> {
  success: boolean;
  data: T;
}

type TypePrice = {
  number_people: number;
  price: number;
};

interface TypeGroupBuying {
  id: number | null;
  post_type: number;
  name: string;
  content: string;
  images: Array<string>;
  prices: Array<TypePrice> | undefined;
  total_likes: number;
  total_comments: number;
  total_members: number;
  creator: number;
  creator_name: string;
  creator_avatar: string;
  creator_location: string;
  created: string;
  is_liked: boolean;
  status: number;
}

interface TypeTour {
  id: number | null;
  name: string;
  description: string;
  duration: number;
  min_cost: number;
  max_cost: number;
  schedule: Array<TypeProfile[]>;
}

interface Resource {
  top_searches: string[];
  favorite_tours: TypeTour[];
  version: {
    ios: string;
    android: string;
    download_link: string;
  };
}
