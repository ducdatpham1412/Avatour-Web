'use client';
import { useMemo } from 'react';

import Container from '@/app/container';
import { VideoImage } from '@/components';
import { getAlbum } from '@/lib/storage';

const Album = () => {
  const { name, images } = useMemo(() => {
    const storage = getAlbum();
    return storage ?? { name: '', images: [] };
  }, []);

  return (
    <Container headerTitle={name}>
      <div className="w-full mt-4 inline-flex flex-wrap justify-between gap-y-4">
        {images.map(img => {
          return (
            <VideoImage
              src={img}
              className="w-full md:w-[49.5%] aspect-[4/3] hover-slow rounded-[14px]"
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Album;
