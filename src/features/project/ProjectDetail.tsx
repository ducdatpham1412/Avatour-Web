'use client';

import { useRouter } from 'next/navigation';
import { Album, BookMinus } from 'lucide-react';

import { CreateBtn, HeaderTitle } from '@/components';
import Metadata from '@/app/metadata';
import { POST_ROUTES, TOPIC_ROUTES } from '@/configs/routes';

import { useProject } from './hooks';
import { ItemTopic } from '../topic/components';
import { ItemPost } from '../post/components';

type Props = PageProps<{ project_id: string }>;

const ProjectDetail = ({ params }: Props) => {
  const router = useRouter();
  const [{ data, loading }] = useProject(params.project_id);

  if (loading || !data) {
    return null;
  }

  return (
    <>
      <Metadata title={`Project | ${data.name}`} />
      <HeaderTitle
        title={`Project: ${data.name}`}
        canGoBack
        RightComponent={
          <CreateBtn
            options={[
              {
                value: 'topic',
                label: 'Topic',
                icon: <Album strokeWidth={1.5} size={16} />,
                onClick: () => {
                  const query = new URLSearchParams();
                  query.append('p', data.id);
                  router.push(`${TOPIC_ROUTES.createTopic}?${query.toString()}`);
                },
              },
              {
                value: 'post',
                label: 'Post',
                icon: <BookMinus strokeWidth={1.5} size={16} />,
                onClick: () => router.push(POST_ROUTES.createPost),
              },
            ]}
          />
        }
      />
      <h1 className="text-[14px] md:text-[24px] mt-8">Topics</h1>
      <div className="w-full inline-flex flex-wrap justify-between mt-4">
        {data.topics.map(topic => {
          return <ItemTopic key={topic.id} item={topic} />;
        })}
      </div>

      <h1 className="text-[14px] md:text-[24px] mt-16">Posts</h1>
      <div className="w-full inline-flex flex-wrap justify-between mt-4">
        {data.posts.map(post => {
          return <ItemPost key={post.id} item={post} />;
        })}
      </div>
    </>
  );
};

export default ProjectDetail;
