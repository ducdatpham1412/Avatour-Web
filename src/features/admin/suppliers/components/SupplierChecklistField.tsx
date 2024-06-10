import { memo, useCallback, useMemo } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { Checkbox } from '@/components/ui';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib';

import { FormFieldProps } from '../types';

type SupplierChecklistFieldProps = FormFieldProps<Record<string, any>> & {
  multiple?: boolean;
  checkbox?: boolean;
};

/**
 * TODO: Change name to CheckListField and move it to app's components
 */
const SupplierChecklistField = memo(
  ({
    control,
    name,
    label,
    rules,
    className,
    options,
    multiple,
    checkbox,
  }: SupplierChecklistFieldProps) => {
    const isChecked = useCallback(
      (
        values: string | number | (string | number)[] | undefined,
        value: number | string | undefined,
      ) => {
        if (!values || !value) return false;

        if (Array.isArray(values)) {
          return values.includes(value);
        }

        return values === value;
      },
      [],
    );
    const onChange = useCallback(
      (
        field: ControllerRenderProps<Record<string, any>, string>,
        checked: string | boolean,
        id: string | number,
      ) => {
        const values = field.value;
        if (multiple) {
          if (Array.isArray(values)) {
            checked
              ? field.onChange([...values, id])
              : field.onChange(values.filter(value => value !== id));
          } else {
            checked ? field.onChange([id]) : field.onChange([]);
          }
        } else {
          checked ? field.onChange(id) : field.onChange(undefined);
        }
      },
      [options],
    );

    const renderOptions = useMemo(
      () =>
        options?.map(option => (
          <FormField
            key={option.id}
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem className="flex flex-row items-start cursor-pointer">
                <FormControl>
                  <Checkbox
                    checked={isChecked(field.value, option.id)}
                    onCheckedChange={checked => onChange(field, checked, option.id)}
                  >
                    {!checkbox
                      ? checked => (
                          <div
                            className={cn(
                              'p-[4px_8px] rounded-[50px] border-[1px] border-gray_500 whitespace-nowrap text-[11px]',
                              checked ? 'bg-p_600' : '',
                            )}
                          >
                            {option.name}
                          </div>
                        )
                      : undefined}
                  </Checkbox>
                </FormControl>
              </FormItem>
            )}
          />
        )),
      [options, control],
    );

    return (
      <div>
        <FormLabel>{label ?? name}</FormLabel>
        <FormField
          control={control}
          name={name}
          rules={rules}
          render={() => (
            <FormItem
              className={cn('flex flex-wrap items-center space-y-0 gap-1 mt-[8px]', className)}
            >
              {renderOptions}
            </FormItem>
          )}
        />
      </div>
    );
  },
);

export type { SupplierChecklistFieldProps };
export default SupplierChecklistField;
