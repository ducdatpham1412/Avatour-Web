interface TourDetail {
  id: number;
  transport: null;
  hotel: null;
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
  schedule: Array<Array<TypeProfile>>;
}

type Tour = Pick<
  TourDetail,
  | 'id'
  | 'location'
  | 'number_people'
  | 'start_price'
  | 'end_price'
  | 'creator'
  | 'creator_name'
  | 'creator_avatar'
> & {
  schedule: string[][];
};
