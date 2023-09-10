import { cn } from '@/lib';

interface DividerProps {
  className?: string;
  flow?: 'row' | 'column';
  size?: keyof typeof dividerSize;
}

const dividerSize = {
  sm: {
    row: 'w-full h-[2px]',
    column: 'w-[2px] h-full',
    strokeWidth: 2,
  },
  md: {
    row: 'w-full h-[3px]',
    column: 'w-[3px] h-full',
    strokeWidth: 3,
  },
  lg: {
    row: 'w-full h-[4px]',
    column: 'w-[4px] h-full',
    strokeWidth: 4,
  },
  xl: {
    row: 'w-full h-[5px]',
    column: 'w-[5px] h-full',
    strokeWidth: 5,
  },
};

function Divider({ className, flow = 'row', size = 'sm' }: DividerProps) {
  const cln = dividerSize[size]?.[flow];

  return (
    <svg className={cn('text-gray_300/60', cln, className)}>
      <line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke="currentColor"
        strokeWidth={dividerSize[size]?.strokeWidth}
      />
    </svg>
  );
}

export { type DividerProps, Divider as default };
