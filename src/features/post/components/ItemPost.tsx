import { BookMinus } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

import { ProjectPost } from '@/api/interface/project';
import { POST_ROUTES } from '@/configs/routes';

interface Props {
  item: ProjectPost;
}

const ItemPost = ({ item }: Props) => {
  return (
    <Link
      className="w-[30%] aspect-[4/1.3] bg-p_200 rounded-[20px] hover-slow inline-flex items-center gap-x-4 px-4"
      href={POST_ROUTES.postId(item.id)}
    >
      <BookMinus size={24} strokeWidth={1.3} className="shrink-0" />
      <h1 className="text-[12px] line-clamp-2">{item.idea}</h1>
    </Link>
  );
};

export default memo(ItemPost);
