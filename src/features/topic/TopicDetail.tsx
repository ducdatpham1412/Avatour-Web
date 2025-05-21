'use client';

import { HeaderTitle, TourLoadingIcon } from '@/components';
import Metadata from '@/app/metadata';

import { useTopic } from './hooks';
import { ItemPost } from '../post/components';

type Props = PageProps<{ topic_id: string }>;

const TopicDetail = ({ params }: Props) => {
  const [{ data, loading }] = useTopic(params.topic_id);

  const renderData = () => {
    if (loading) {
      return <TourLoadingIcon />;
    }

    if (!data) return null;

    return (
      <div className="w-full inline-flex flex-wrap justify-between mt-8">
        {data.posts.map(post => {
          return <ItemPost key={post.id} item={post} />;
        })}
      </div>
    );
  };

  return (
    <>
      {!!data?.name && <Metadata title={`Topic | ${data.name}`} />}
      <HeaderTitle title={`Topic${data?.name ? `: ${data.name}` : ''}`} canGoBack />
      {renderData()}
    </>
  );
};

export default TopicDetail;
