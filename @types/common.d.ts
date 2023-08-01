declare type PageParams = Record<string, string | string[] | undefined>;

declare interface PageProps<P = PageParams, S = PageParams> {
  params: P;
  searchParams: S;
}

declare type ActionResponse<T = any> = {
  data?: T;
  error?: {
    message: string;
    code?: number;
  };
};

declare type NextAction = <T>(...params: any[]) => ActionResponse<T> | Promise<ActionResponse<T>>;

declare type BaseIconProps = {
  color?: string;
  className?: string;
};

declare type NextPage = import('next').NextPage<PageProps>;
