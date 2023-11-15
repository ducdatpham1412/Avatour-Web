import { InputHTMLAttributes, memo } from 'react';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Textarea } from '@/components/ui';

import { MailForm, MailFormFields } from '../types';

type MailFieldProps = MailFormFields<MailForm> & {
  type?: InputHTMLAttributes<any>['type'];
};

const MailField: React.FC<MailFieldProps> = memo(
  ({ control, name, rules, className, placeholder, type }) => (
    <FormField
      control={control}
      name={name as any}
      rules={rules as any}
      render={({ field }) => (
        <FormItem className={className}>
          <FormControl>
            <Input
              type={type ?? 'text'}
              placeholder={placeholder}
              {...field}
              className="border-[0px] bg-white [&[aria-invalid='true']]:!border-[1px]"
              value={field.value ?? ''}
              useForm
            />
          </FormControl>
          <FormMessage className="text-[0.75em] !mt-0 !mb-0" showOnEmpty />
        </FormItem>
      )}
    />
  ),
);

export type { MailFieldProps };
export default MailField;
