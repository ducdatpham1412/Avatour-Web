'use server';
import request from './request';

export const apiGetGPTPrompt = async (url: string) => {
  const res: TypeApi<{ prompt: string }> = await request.get('/admin/link', {
    url: url,
  });
  return res.data;
};
