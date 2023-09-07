const STATUS_JOIN_ESTIMATE = {
  notActive: 0,
  active: 1,
  adminConfirm: 2,
  overtime: 3,
  consumerConfirmed: 4,
  supplierConfirmed: 5,
};

/**
 * @deprecated
 */
const JOIN_ESTIMATE_FILTER_STATUS = {
  confirmed: 0, // -> STATUS_JOIN_ESTIMATE.adminConfirm
  notConfirmed: 1, // -> STATUS_JOIN_ESTIMATE.active
  expired: 2, // -> STATUS_JOIN_ESTIMATE.overtime
  cancelled: 3, // -> STATUS_JOIN_ESTIMATE.notActive
};

export { STATUS_JOIN_ESTIMATE, JOIN_ESTIMATE_FILTER_STATUS };
