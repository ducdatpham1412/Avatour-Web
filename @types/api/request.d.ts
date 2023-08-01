interface RequestOptions extends RequestInit {
  baseUrl?: string;
  queries?: URLSearchParams;
}

interface API {
  <T = any>(path: string, params?: Record<string, any>, options?: RequestOptions): Promise<T>;
}

interface HTTPRequest extends API {
  post: API;
  put: API;
  delete: API;
}
