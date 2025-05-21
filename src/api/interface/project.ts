import { TypeItemPost } from './post';
import { TypeItemTopic } from './topic';

export interface TypeItemProject {
  id: string;
  name: string;
  img: string;
  created: string;
  status: 'active';
}

export interface Project extends TypeItemProject {
  topics: ProjectTopic[];
  posts: ProjectPost[];
}

export type ProjectTopic = Pick<TypeItemTopic, 'id' | 'name'>;
export type ProjectPost = Pick<TypeItemPost, 'id' | 'idea'>;
