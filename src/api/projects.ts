'use server';

import request from './request';

export interface CreateTopicBody {
  project_id: string;
  name: string;
}

export const apiCreateTopic = async (data: CreateTopicBody) => {
  const res: { topic_id: string } = await request.post('/profile/post', data);
  return res;
};
