import React, { useMemo } from 'react';

import { isVideo } from '@/lib';

import { Video, Image } from './ui';

interface Props extends PropsWithClassName {
  src: string;
}

const VideoImage = ({ src, className }: Props) => {
  const video = useMemo(() => isVideo(src), [src]);

  if (video) {
    return <Video src={src} className={className} />;
  }

  return <Image src={src} className={className} />;
};

export default VideoImage;
