import { ReactElement } from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface Props {
  trigger?: string | ReactElement;
  label?: string;
  options: Array<{
    value: string;
    check: boolean;
    type?: 'box-item' | 'menu-item';
  }>;
  onCheck?: (v: string) => void;
}

const DropDown = ({ trigger, label, options, onCheck }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {!!label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        <DropdownMenuSeparator />
        {options.map(ot => {
          if (ot.type === 'menu-item') {
            return (
              <DropdownMenuItem onClick={() => onCheck?.(ot.value)}>{ot.value}</DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuCheckboxItem
              checked={ot.check}
              onCheckedChange={() => onCheck?.(ot.value)}
              key={ot.value}
            >
              {ot.value}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
