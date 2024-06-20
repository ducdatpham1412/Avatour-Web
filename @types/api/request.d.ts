interface RequestOptions extends RequestInit {
  baseUrl?: string;
  queries?: URLSearchParams;
  authorize?: boolean;
}

interface API {
  <T = TypeApi<None>>(
    path: string,
    params?: Record<string, any>,
    options?: RequestOptions,
  ): Promise<T>;
}

interface HTTPRequest extends API {
  get: API;
  post: API;
  put: API;
  delete: API;
}

type APIPagingResponse<T> = {
  totalPages: number;
  totalItems: number;
  take: number;
  pageIndex: number;
  data: T;
};
