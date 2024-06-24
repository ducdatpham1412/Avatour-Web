import { cn } from '@/lib';

interface Props {
  title: string;
  className?: string;
}

const HeaderCreateTour = ({ title, className }: Props) => {
  return <p className={cn('text-[16px] sm:text-[24px]', className)}>{title}</p>;
};

export default HeaderCreateTour;
