import { env } from 'process';

export const { API_ENDPOINT, SERVER_ENDPOINT } = {
  API_ENDPOINT: env.API_ENDPOINT,
  SERVER_ENDPOINT: env.SERVER_ENDPOINT,
};
