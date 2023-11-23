export const STATUS_JOIN_ESTIMATE = {
  notActive: 0,
  active: 1,
  adminConfirm: 2,
  overtime: 3,
  consumerConfirmed: 4,
  supplierConfirmed: 5,
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
};

export type STATUS_JOIN_ESTIMATE = (typeof STATUS_JOIN_ESTIMATE)[keyof typeof STATUS_JOIN_ESTIMATE];
