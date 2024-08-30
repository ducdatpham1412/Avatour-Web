'use client';
import { useMemo } from 'react';

import Container from '@/app/container';
import { getAlbum } from '@/lib/storage';
import { Image } from '@/components/ui';

const Album = () => {
  const { name, images } = useMemo(() => {
    const storage = getAlbum();
    return storage ?? { name: '', images: [] };
  }, []);

  return (
    <Container headerTitle={name}>
      <div className="w-full mt-4 inline-flex flex-wrap justify-between gap-y-2">
        {images.map(img => {
          return <Image src={img} className="w-full md:w-[49.5%] aspect-[4/3] hover-slow" />;
        })}
      </div>
    </Container>
  );
};

export default Album;
