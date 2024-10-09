export const STATUS_JOIN_ESTIMATE = {
  expired: -1, // custom
  notActive: 0,
  active: 1,
  adminConfirm: 2,
  supplierConfirm: 6,
  supplierRejected: 7,
  overtime: 3,
  consumerConfirmed: 4,
  checkedIn: 8,
  supplierConfirmBought: 5,
  checkedInAndConfirmedBought: 9,
} as const;

export const TYPE_AUTH_REQUEST = {
  lock_account: 0,
  delete_account: 1,
  upgrade_to_shop: 2,
  update_price: 3,
  update_bank: 5,
  suggest_location: 6,
} as const;

export const REQUEST_STATUS = {
  notActive: 0,
  active: 1,
  confirmed: 2,
  rejected: 3,
} as const;

export const USER_STATUS = {
  notActive: 0,
  active: 1,
};

export const ACCOUNT_TYPE = {
  holder: 'holder',
  user: 'user',
  shop: 'shop',
  admin: 'admin',
  location: 'location',
  buddy: 'buddy',
};

export type REQUEST_STATUS = (typeof REQUEST_STATUS)[keyof typeof REQUEST_STATUS];
export type TYPE_AUTH_REQUEST = (typeof TYPE_AUTH_REQUEST)[keyof typeof TYPE_AUTH_REQUEST];
export type STATUS_JOIN_ESTIMATE = (typeof STATUS_JOIN_ESTIMATE)[keyof typeof STATUS_JOIN_ESTIMATE];

export const CONTAINER_WIDTH = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};
