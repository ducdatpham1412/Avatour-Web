import { ClassValue } from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Carousel } from '@/components';
import { Button, Image } from '@/components/ui';
import { ORDER_ROUTES } from '@/configs/routes';
import { cn } from '@/lib';
import { formatPrice } from '@/lib/format';

interface Props {
  item: TypeProduct;
  className?: ClassValue;
}

const ItemProduct = ({ item, className }: Props) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  return (
    <div
      className={cn('inline-flex flex-col hover-scale', className)}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="w-full rounded-[14px] hover:shadow-all">
        <Carousel
          data={item.images}
          renderItem={img => {
            return <Image src={img} className="w-full aspect-[1/1] rounded-[14px]" />;
          }}
          className="w-full"
          showIndicator={item.images.length > 1}
          showArrow={false}
        />
      </div>

      <div className="w-full inline-flex flex-col items-start px-[4px] mt-[8px]">
        {hover ? (
          <Button
            className="w-[90%] self-center"
            onClick={() => {
              router.push(ORDER_ROUTES.product(item.id));
            }}
          >
            Đặt mua
          </Button>
        ) : (
          <>
            <p className="font-medium">{item.name}</p>
            <p className="text-p_700">{formatPrice(item.price)}đ</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemProduct;
