declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        API_ENDPOINT: string;
        SERVER_ENDPOINT: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
      }
    }
  }
}
