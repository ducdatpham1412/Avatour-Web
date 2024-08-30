import { ClassValue } from 'clsx';
import React from 'react';

import { cn } from '@/lib';
import { Image } from '@/components/ui';
import { formatPrice } from '@/lib/format';
import { Carousel } from '@/components';

interface Props {
  item: TypeProduct;
  className?: ClassValue;
}

const ItemProduct = ({ item, className }: Props) => {
  return (
    <div className={cn('inline-flex flex-col hover-scale', className)}>
      <Carousel
        data={item.images}
        renderItem={img => {
          return (
            <Image src={img} className="w-full aspect-[1/1] rounded-[14px] hover:shadow-all" />
          );
        }}
        className="w-full"
        showIndicator={item.images.length > 1}
        showArrow={item.images.length > 1}
      />
      <div className="w-full inline-flex flex-col items-start px-[4px] mt-[8px]">
        <p className="font-medium">{item.name}</p>
        <p className="text-p_700">{formatPrice(item.price)}đ</p>
      </div>
    </div>
  );
};

export default ItemProduct;
