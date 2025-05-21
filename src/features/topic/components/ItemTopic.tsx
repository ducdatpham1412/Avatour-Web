import Link from 'next/link';
import { memo } from 'react';

import { ProjectTopic } from '@/api/interface/project';
import { TOPIC_ROUTES } from '@/configs/routes';

interface Props {
  item: ProjectTopic;
}

const ItemTopic = ({ item }: Props) => {
  return (
    <Link
      className="w-[48%] aspect-[4/1] bg-gray_100 rounded-[20px] hover-slow inline-flex items-center justify-center"
      href={TOPIC_ROUTES.topicId(item.id)}
    >
      <h1 className="font-medium text-[20px]">{item.name}</h1>
    </Link>
  );
};

export default memo(ItemTopic);
