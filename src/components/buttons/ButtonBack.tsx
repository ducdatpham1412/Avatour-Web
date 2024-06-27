import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib';

type Props = PropsWithClassName & {
  onClick?: () => void;
};

const ButtonBack = ({ className, onClick }: Props) => {
  return (
    <button className={cn('p-[8px] bg-gray_200 rounded-full', className)} onClick={onClick}>
      <ArrowLeft size={16} />
    </button>
  );
};

export default ButtonBack;
