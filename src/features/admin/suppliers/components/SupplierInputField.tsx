import { memo } from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Textarea } from '@/components/ui';

import { FormFieldProps } from '../types';

type SupplierFieldProps = FormFieldProps<Record<string, any>> & { type?: 'input' | 'textarea' };

const SupplierField: React.FC<SupplierFieldProps> = memo(
  ({ control, name, rules, label, className, placeholder, type }) => (
    <FormField
      control={control}
      name={name as any}
      rules={rules as any}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label ?? name}</FormLabel>
          <FormControl>
            {type === 'textarea' ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                className="bg-white w-full rounded-[10px]"
                value={field.value ?? ''}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                className="bg-white w-full h-[46px] rounded-[10px]"
                value={field.value ?? ''}
                useForm
              />
            )}
          </FormControl>
          <FormMessage className="h-[1em] text-[0.75em] !mt-0 !mb-[0.5em]" showOnEmpty />
        </FormItem>
      )}
    />
  ),
);

export type { SupplierFieldProps };
export default SupplierField;
