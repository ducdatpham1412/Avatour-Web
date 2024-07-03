import { memo, useEffect, useRef, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { Image } from '@/components/ui';
import { SupplierData } from '@/api/admin';

import { FormFieldProps } from '../types';

type AvatarPreviewProps = Pick<FormFieldProps<SupplierData>, 'control'> & {
  defaultValue?: string;
};

const AvatarPreview: React.FC<AvatarPreviewProps> = memo(({ control, defaultValue }) => {
  const [url, setUrl] = useState(defaultValue ?? '');
  const fistcall = useRef(true);

  const avatar = useWatch({ control, name: 'avatar', defaultValue });

  useEffect(() => {
    if (!fistcall.current) {
      const timeout = setTimeout(() => {
        setUrl(avatar ?? '');
      }, 200);
      return () => clearTimeout(timeout);
    } else {
      fistcall.current = false;
    }
  }, [avatar]);

  return (
    <Image
      src={url}
      className="h-[200px] w-[200px] rounded-[16px] bg-white border-[2px] border-gray-300"
      fit="cover"
    />
  );
});

export type { AvatarPreviewProps };
export default AvatarPreview;
