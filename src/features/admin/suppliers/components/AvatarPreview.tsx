import { memo, useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Image } from '@/components/ui';

import { FormFieldProps } from '../types';

type AvatarPreviewProps = Pick<FormFieldProps<TypeProfile>, 'control'> & {
  defaultValue?: string;
};

const AvatarPreview: React.FC<AvatarPreviewProps> = memo(({ control, defaultValue }) => {
  const [url, setUrl] = useState(defaultValue ?? '');
  const fistcall = useRef(true);

  const avatar = useWatch({ control, name: 'avatar', defaultValue: '' }) as string;

  useEffect(() => {
    if (!fistcall.current) {
      const timeout = setTimeout(() => {
        setUrl(avatar);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      fistcall.current = false;
    }
  }, [avatar]);

  return (
    <Image
      src={url}
      className="h-[250px] w-[250px] rounded-[16px] bg-white border-[2px] border-gray-300"
      fit="cover"
    />
  );
});

export type { AvatarPreviewProps };
export default AvatarPreview;
