import { ProjectPost } from './project';

export interface TypeItemTopic {
  id: string;
  project: string;
  name: string;
  img: string;
  created: number;
  status: 'active' | 'not-active';
}

export interface Topic extends TypeItemTopic {
  posts: ProjectPost[];
}
