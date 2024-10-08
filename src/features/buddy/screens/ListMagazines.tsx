'use client';
import Link from 'next/link';

import { Carousel } from '@/components';
import { Image } from '@/components/ui';
import { MAGAZINE_ROUTES } from '@/configs/routes';
import { useMagazines } from '@/features/magazine/hooks';
import { ItemMagazine } from '@/features/profile/components';
import { cn } from '@/lib';

interface Props {
  showPreview?: boolean;
  className?: string;
}

type ImgCarousel = {
  img: string;
  magazineId: string;
};

const ListMagazines = ({ showPreview = true, className }: Props) => {
  const [{ data: magazines }] = useMagazines();
  const images = magazines?.reduce((pre: ImgCarousel[], cur) => {
    const temp = cur.content.reduce((p: ImgCarousel[], c) => {
      if (c.type === 'image') {
        p.push({
          img: c.content,
          magazineId: cur.id,
        });
      }
      return p;
    }, [] as ImgCarousel[]);

    pre.push(...temp);

    return pre;
  }, [] as ImgCarousel[]);

  return (
    <>
      {!!magazines?.length && (
        <div className={cn('mt-[60px]', className)}>
          <p className="text-black text-[26px] font-medium">Tạp chí du lịch</p>
          <div className="w-full mt-8 inline-flex gap-[7vw] mb-[100px]">
            <div className="flex flex-1 gap-y-10 flex-col">
              {magazines.map(m => {
                return <ItemMagazine key={m.id} item={m} />;
              })}
            </div>

            {showPreview && (
              <>
                {images?.length ? (
                  <Carousel
                    className="hidden md:block w-[25vw] h-[25vw]"
                    data={images}
                    renderItem={img => {
                      return (
                        <Link
                          key={img.img}
                          className="w-full"
                          href={MAGAZINE_ROUTES.magazineDetail(img.magazineId)}
                          target="_blank"
                        >
                          <Image
                            src={img.img}
                            className="w-full aspect-[1/1] rounded-[14px] hover-slow"
                          />
                        </Link>
                      );
                    }}
                  />
                ) : (
                  <div className="hidden md:block w-[25vw] h-[25vw]" />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ListMagazines;
