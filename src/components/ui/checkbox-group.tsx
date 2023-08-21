'use client';
import { forwardRef, useId, useMemo, useState } from 'react';

import { cn, omit } from '@/lib';

import { Checkbox } from './checkbox';
import { Label } from './label';

type CheckboxProps = Omit<React.ComponentProps<typeof Checkbox>, 'children' | 'label' | 'key'> & {
  label?: string;
  key: string;
};

export type CheckBoxGroupProps = {
  children?: (props: CheckboxProps & { children: string }, key: string) => React.ReactElement;
  options: (
    | string
    | {
        name: string;
        value: string | number;
      }
  )[];
  value?: (string | number)[];
  onChange?: (e: (string | number)[]) => void;
  className?: string;
};

export const CheckBoxGroup = forwardRef(
  ({ children, options, className, value, onChange, ...props }: CheckBoxGroupProps, ref: any) => {
    const groupId = useId();
    const [insideValue, setInsideValue] = useState(() => {
      if (value && Array.isArray(value)) {
        return value;
      }

      return [];
    });

    const currentValue = useMemo(() => {
      if (value && Array.isArray(value)) {
        return value;
      }

      return insideValue;
    }, [insideValue, value]);

    const childrenProps = useMemo(
      () =>
        options.map((item, index: number) => {
          let itemProps: CheckboxProps & { children: string };
          if (typeof item === 'string') {
            itemProps = {
              key: `${index}`,
              children: item,
              checked: insideValue.includes(item),
              label: item,
              onCheckedChange: (e: boolean) => {
                let newValue = [...currentValue];
                if (e && !newValue.includes(item)) {
                  newValue.push(item);
                } else if (newValue.includes(item)) {
                  newValue = newValue.filter(i => i != item);
                } else {
                  return;
                }

                onChange && onChange(newValue);
                setInsideValue(newValue);
              },
            };
          } else {
            itemProps = {
              key: `${index}`,
              children: item.name,
              checked: insideValue.includes(item.value),
              label: item.name,
              onCheckedChange: (e: boolean) => {
                let newValue = [...currentValue];
                if (e && !newValue.includes(item.value)) {
                  newValue.push(item.value);
                } else if (newValue.includes(item.value)) {
                  newValue = newValue.filter(i => i != item.value);
                } else {
                  return;
                }

                onChange && onChange(newValue);
                setInsideValue(newValue);
              },
            };
          }

          return itemProps;
        }),
      [currentValue, onChange],
    );

    return (
      <div ref={ref} {...props} className={cn('flex flex-col gap-2', className)}>
        {childrenProps.map(cProps =>
          children ? (
            children(cProps, cProps.key.toString())
          ) : (
            <div key={cProps.key} className="flex items-center gap-2">
              <Checkbox id={groupId + cProps.key} {...omit(cProps, 'children', 'key')} />
              <Label className="cursor-pointer" htmlFor={groupId + cProps.key}>
                {cProps.children}
              </Label>
            </div>
          ),
        )}
      </div>
    );
  },
);

CheckBoxGroup.displayName = 'CheckBoxGroup';

export type RadioGroupProps = {
  children?: (props: CheckboxProps & { children: string }) => React.ReactElement;
  options: (
    | string
    | {
        name: string;
        value: string | number;
      }
  )[];
  value?: string | number;
  onChange?: (e: string | number) => void;
  className?: string;
};

export function RadioGroup({
  children,
  className,
  options,
  value,
  onChange,
  ...props
}: RadioGroupProps) {
  const groupId = useId();
  const [insideValue, setInsideValue] = useState(() => {
    if (value != undefined) {
      return value;
    }

    return '';
  });

  const currentValue = useMemo(() => {
    if (value && Array.isArray(value)) {
      return value;
    }

    return insideValue;
  }, [insideValue, value]);

  const childrenProps = useMemo(
    () =>
      options.map((item, index: number) => {
        let itemProps: CheckboxProps & { children: string };
        if (typeof item === 'string') {
          itemProps = {
            key: `${index}`,
            children: item,
            checked: item === currentValue,
            onCheckedChange: (e: boolean) => {
              if (currentValue !== item) {
                onChange && onChange(item);
                setInsideValue(item);
              }
            },
          };
        } else {
          itemProps = {
            key: `${index}`,
            children: item.name,
            checked: item.value === currentValue,
            onCheckedChange: (e: boolean) => {
              if (currentValue !== item.value) {
                onChange && onChange(item.value);
                setInsideValue(item.value);
              }
            },
          };
        }

        return itemProps;
      }),
    [currentValue, onChange],
  );

  return (
    <div {...props} className={cn('flex flex-col gap-2', className)}>
      {childrenProps.map(cProps =>
        children ? (
          children(cProps)
        ) : (
          <div key={cProps.key} className="flex items-center gap-2">
            <Checkbox id={groupId + cProps.key} {...omit(cProps, 'children', 'key')} />
            <Label className="cursor-pointer" htmlFor={groupId + cProps.key}>
              {cProps.children}
            </Label>
          </div>
        ),
      )}
    </div>
  );
}
