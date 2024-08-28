'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Container from '@/app/container';
import { Carousel, TourLoadingIcon } from '@/components';
import { MAGAZINE_ROUTES, PROFILE_ROUTES } from '@/configs/routes';
import { Image } from '@/components/ui';

import { ItemBuddy } from './components';
import { useBuddies } from './hooks';
import { useMagazines } from '../magazine/hooks';
import { ItemMagazine } from '../profile/components';

type ImgCarousel = {
  img: string;
  magazineId: string;
};

const BuddyScreen = () => {
  const router = useRouter();
  const [{ data, loading }] = useBuddies();
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

  const content = () => {
    if (loading || !data) {
      return <TourLoadingIcon className="w-[200px] h-[200px] mx-auto mt-[10vh]" />;
    }

    return (
      <div className="w-full inline-flex flex-wrap justify-between gap-y-7 sm:gap-y-12 mt-8">
        {data.map(buddy => {
          return (
            <ItemBuddy
              item={buddy}
              onClick={() => {
                router.push(PROFILE_ROUTES.profileId(buddy.id));
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <Container
      showHeader={false}
      metaData={{
        title: 'Avatour Buddy',
        keywords: 'Buddy, Buddy bản địa, Buddy Avatour, Hướng dẫn viên du lịch bản địa',
      }}
    >
      <div className="inline-flex flex-col items-start mt-[12px]">
        <p className="text-black text-[26px] font-medium">Buddy là gì nhỉ?</p>
        <p>
          Buddy là một người dân bản địa, đồng hành cùng bạn trên một chặng đường, giúp bạn trải
          nghiệm đậm nét văn hoá địa phương.
        </p>
      </div>

      {content()}

      <p className="text-black text-[26px] font-medium mt-[60px]">Tạp chí du lịch</p>
      {!!magazines?.length && (
        <div className="w-full mt-8 inline-flex gap-[7vw] mb-[100px]">
          <div className="flex flex-1 gap-y-10 flex-col">
            {magazines.map(m => {
              return <ItemMagazine key={m.id} item={m} />;
            })}
          </div>

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
        </div>
      )}
    </Container>
  );
};

export default BuddyScreen;
