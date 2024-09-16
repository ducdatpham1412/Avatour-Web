import { ClassValue } from 'clsx';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Avatar, Image } from '@/components/ui';
import { MAGAZINE_ROUTES } from '@/configs/routes';
import { cn } from '@/lib';

interface Props {
  item: TypeMagazine;
  className?: ClassValue;
}

const ItemMagazine = ({ item, className }: Props) => {
  const router = useRouter();
  const firstContent = item.content.find(c => c.type === 'content')?.content;
  const thumbnail = item.content.find(c => c.type === 'image')?.content;

  return (
    <button
      className={cn(
        'w-full inline-flex flex-col md:flex-row gap-2 md:gap-6 bg-white rounded-[14px] hover-scale',
        className,
      )}
      onClick={() => router.push(MAGAZINE_ROUTES.magazineDetail(item.id))}
    >
      <Image
        src={thumbnail ?? ''}
        className="w-full md:w-[40%] aspect-[4.3/3] rounded-[14px] hover:shadow-all"
      />
      <div className="flex flex-1 flex-col items-start">
        <p className="text-[18px] font-medium text-start">{item.title}</p>
        <p className="text-[13px] font-light line-clamp-1 md:line-clamp-3 text-start">
          {item.description || firstContent || ''}
        </p>
        <div className="w-full inline-flex flex-row gap-3 items-center mt-2 md:mt-6">
          <Avatar src={item.creator_avatar} size={25} />
          <p>{item.creator_name}</p>
        </div>
      </div>
    </button>
  );
};

export default ItemMagazine;
