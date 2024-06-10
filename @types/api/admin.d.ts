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

interface TypeJoinPersonal {
  id: number | null;
  sale_id: number;
  amount: number;
  price: number;
  deposit: number;
  creator: number;
  creator_name: string;
  creator_avatar: string;
  created: string;
  group: {
    id: number | null;
    name: string;
    total_members: number;
  };
}

interface TypeJoinEstimate {
  id: number;
  amount: number;
  time_will_buy: string;
  note: string;
  hash: string;
  deposit: number;
  creator: number;
  creator_name: string;
  created: string;
  expired: string;
  status: number;
  sale: {
    id: number;
    name: string;
    images: string[];
    creator_name: string;
  };
  list_personals: TypeJoinPersonal[];
}

interface DynamicObject<T = any> {
  [key: string]: T;
}

interface Passport {
  profile: {
    id: number;
    avatar: string;
    account_type: 'holder' | 'admin' | 'user' | 'shop' | 'location' | 'tour-guide';
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

interface UpgradeAccount {
  name: string;
  location: string;
  phone: string;
  bank_code: string;
  bank_account: string;
}
interface UpdateBank {
  bank_code: string;
  bank_account: string;
}
interface UpdatePrice {
  sale: TypeGroupBuying;
  prices: TypePrice[];
}

type TypeAuthRequest = typeof import('@/configs/constants').TYPE_AUTH_REQUEST;

type TypeGetRequestResponse =
  | {
      id: number;
      created: string;
      expired: string;
      creator: number;
      creator_name: string;
      creator_avatar: string;
      status: number;
    } & (
      | {
          type: TypeAuthRequest['update_price'];
          data: UpdatePrice;
        }
      | {
          type: TypeAuthRequest['update_bank'];
          data: UpdateBank;
        }
      | {
          type: TypeAuthRequest['upgrade_to_shop'];
          data: UpgradeAccount;
        }
      | {
          type: TypeAuthRequest['suggest_location'];
          data: TypeProfile;
        }
    );
