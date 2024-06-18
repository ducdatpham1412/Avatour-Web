import { memo } from 'react';

import { Input, Textarea } from '@/components/ui';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { FormFieldProps } from '../types';

type Props = FormFieldProps<Record<string, any>> & { type?: 'input' | 'textarea' };

/**
 * TODO: Move this to app's components
 */
const InputField = memo(({ control, name, rules, label, className, placeholder, type }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={className}>
          {!!label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {type === 'textarea' ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                className="bg-white w-full rounded-[10px]"
                value={(field.value as string) || ''}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                className="bg-white w-full h-[40px] rounded-[10px]"
                value={(field.value as string) || ''}
                useForm
                type=""
              />
            )}
          </FormControl>
          <FormMessage className="h-[1em] text-[0.75em] !mt-0 !mb-[0.5em]" showOnEmpty />
        </FormItem>
      )}
    />
  );
});

export default InputField;
