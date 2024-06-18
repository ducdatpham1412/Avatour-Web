const statusText = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  306: 'Unused',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Required',
  413: 'Request Entry Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot",
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
} as const;

export const ERROR_MESSAGE = {
  init_err: 'Having error',

  // common
  value_blank: 'value_not_be_blank',
  value_wrong_format: 'value_wrong_format',
  password_not_match: 'password_not_match',
  otp_invalid: 'otp_invalid',
  password_invalid: 'password_invalid',
  old_password_not_true: 'old_password_not_true',
  input_invalid: 'input_invalid',

  // authentication
  register_fail: 'register_fail',
  username_existed: 'username_existed',
  email_existed: 'email_existed',
  phone_existed: 'phone_existed',
  login_fail: 'login_fail',
  token_expired: 'token_expired',
  token_blacklisted: 'token_blacklisted',
  username_not_exist: 'username_not_exist',
  login_facebook_failed: 'login_facebook_failed',
  had_requested_upgrade: 'had_requested_upgrade',
  you_have_lock_your_account: 'you_have_lock_your_account',
  you_are_not_admin: 'you_are_not_admin',

  // setting
  you_have_blocked_this_person: 'you_have_blocked_this_person',
  you_not_block_this_person: 'you_not_block_this_person',

  // profile
  your_have_follow_this_person: 'your_have_follow_this_person',
  you_have_liked_this_post: 'you_have_liked_this_post',
  you_not_liked_this_post: 'you_not_liked_this_post',
  post_not_existed: 'post_not_existed',
  had_saved_this_post: 'had_saved_this_post',
  have_joined_group_buying: 'have_joined_group_buying',
  not_joined_group_buying: 'not_joined_group_buying',
  bought_group_buying: 'bought_group_buying',
  group_buying_out_of_date: 'group_buying_out_of_date',
  still_having_people_join: 'still_having_people_join',
  still_having_location_draft: 'still_having_location_draft',

  // chat
  not_have_permission_delete_message: 'not_have_permission_delete_message',
  conversation_not_existed: 'conversation_not_existed',
};

export const PARSE_ERROR_MESSAGE = {
  default: 'Có một vài lỗi xảy ra',
  [ERROR_MESSAGE.login_fail]: 'Đăng nhập thất bại',
  [ERROR_MESSAGE.email_existed]: 'Email đã tồn tại',
  [ERROR_MESSAGE.input_invalid]: 'Dữ liệu nhập sai',
  [ERROR_MESSAGE.username_existed]: 'Tài khoản đã tồn tại',
  [ERROR_MESSAGE.otp_invalid]: 'Mã OTP không hợp lệ',
};

type StatusCode = keyof typeof statusText;

export { statusText };
export type { StatusCode };
