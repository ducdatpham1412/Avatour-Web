import { cn } from '@/lib';

interface Props {
  number: number;
  title: string;
  status: 'open' | 'close';
  onClick?: () => void;
  disable?: boolean;
}

const TabTrigger = ({ number, title, status, onClick, disable }: Props) => {
  const isOpen = status === 'open';

  return (
    <div
      className={cn('inline-flex gap-[10px] items-center', disable ? 'opacity-[0.4]' : '')}
      role="button"
      onClick={disable ? undefined : onClick}
    >
      <div
        className={cn(
          'w-[30px] h-[30px] rounded-full inline-flex items-center justify-center',
          isOpen ? 'bg-black' : 'border-[1px]',
        )}
      >
        <p className={cn('text-[14px]', isOpen ? 'text-white' : '')}>{number}</p>
      </div>
      <p className={cn('text-[14px]', isOpen ? '' : 'hidden')}>{title}</p>
    </div>
  );
};

export default TabTrigger;
