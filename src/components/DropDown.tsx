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

export interface DropDownProps {
  trigger?: string | ReactElement;
  label?: string;
  options: Array<{
    value: string;
    label: string;
    icon?: ReactElement;
    check?: boolean;
    type?: 'box-item' | 'menu-item';
    onClick?: () => void;
  }>;
  onCheck?: (v: string) => void;
}

const DropDown = ({ trigger, label, options, onCheck }: DropDownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {!!label && (
          <>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        {options.map(ot => {
          if (ot.type === 'menu-item') {
            return (
              <DropdownMenuItem
                key={ot.value}
                onClick={() => {
                  ot.onClick?.();
                  onCheck?.(ot.value);
                }}
                className="cursor-pointer"
              >
                <div className="inline-flex items-center gap-x-2">
                  {ot.icon}
                  {ot.label}
                </div>
              </DropdownMenuItem>
            );
          }

          return (
            <DropdownMenuCheckboxItem
              checked={ot.check}
              onCheckedChange={() => {
                ot.onClick?.();
                onCheck?.(ot.value);
              }}
              key={ot.value}
              className="cursor-pointer"
            >
              <div className="inline-flex items-center gap-x-2">
                {ot.icon}
                {ot.label}
              </div>
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
