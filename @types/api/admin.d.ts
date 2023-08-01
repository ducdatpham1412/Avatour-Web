interface TypeInputSupplierRequest {
  email: string;
  phone: string;
  account_type: number;
  name: string;
  description: string;
  avatar: string;
  location: string;
  lat: number;
  lng: number;
  services: Array<string>;
  min_cost: number;
  max_cost: number;
  duration: number;
}

interface TypeSupplier {
  id: number;
  account_type: number | string;
  services: number[];
  email: string;
  phone: string | number;
  name: string;
  description: string;
  avatar: string;
  location: string;
  lat: number | string;
  lng: number | string;
  min_cost: number | string;
  max_cost: number | string;
  duration: number | string;
}

interface TypeJoinEstimate {
  id: number;
  amount: number;
  time_will_buy: string;
  note: string;
  deposit: number;
  price: number;
  hash: string;
  creator: number;
  creator_name: string;
  creator_avatar: string;
  created: string;
  expired: string;
  sale: {
    id: number;
    name: string;
    content: string;
  };
  status: number;
}

interface GetSuppliersFilter {
  sv: string[] | string;
  at: string;
}

interface GetDepositsFilter {
  status: number[];
  page_index: number;
  limit: number;
}

interface SuppliersProps {
  data: TypeSupplier[];
  query: Record<string, any>;
}

interface SupplierPageProps {
  data: TypeSupplier[];
}

interface DynamicObject<T = any> {
  [key: string]: T;
}

interface AdminProfile {
  profile: {
    id: number;
    avatar: string;
    account_type: number;
    services: number[];
    information: {
      facebook: string;
      email: string;
      phone: string;
      bank_account: string;
      bank_code: string;
    };
    name: string;
    description: string;
    followers: number;
    followings: number;
    gender: number;
    birthday: string;
    theme: number;
    language: number;
    location: number;
    lat: number;
    lng: number;
    min_cost: number;
    max_cost: number;
    duration: number;
    start_time: number;
    end_time: number;
    total_ratings: number;
    average_stars: number;
  };
  new_notifications: number;
}
