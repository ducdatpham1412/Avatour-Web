import Link from 'next/link';
import React from 'react';

import { type TypeItemProject } from '@/api/interface/project';
import { PROJECT_ROUTES } from '@/configs/routes';

interface Props {
  item: TypeItemProject;
}

const ItemProject = ({ item }: Props) => {
  return (
    <Link
      className="w-[48%] aspect-[4/3] bg-gray_100 rounded-[40px] hover-slow inline-flex items-center justify-center"
      href={PROJECT_ROUTES.projectDetail(item.id)}
    >
      <h1 className="font-medium text-[20px]">{item.name}</h1>
    </Link>
  );
};

export default ItemProject;
