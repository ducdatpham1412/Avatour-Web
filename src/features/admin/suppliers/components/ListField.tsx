import { ControllerRenderProps } from 'react-hook-form';

import CloseIcon from '@/components/icon/CloseIcon';
import { Button, FormControl, FormField, FormItem, FormLabel, Input } from '@/components/ui';
import { cn } from '@/lib';

import { FormFieldProps } from '../types';

type Props = FormFieldProps<Record<string, any>>;

/**
 * TODO: Move this to app's components
 */
const ListField = ({ control, name, rules, className, label }: Props) => {
  const renderList = (field: ControllerRenderProps<Record<string, string[]>, string>) => {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {field.value.map((v, i) => {
          return (
            <div className="flex items-center">
              <Input
                className="bg-white w-[300px] h-[40px] rounded-[10px]"
                defaultValue={v}
                useForm
                type="text"
                onChange={e => {
                  field.value[i] = e.target.value.trim();
                  field.onChange(field.value);
                }}
              />
              <div
                className="ml-1 cursor-pointer"
                onClick={() => {
                  field.onChange(field.value.filter((_, index) => index !== i));
                }}
              >
                <CloseIcon />
              </div>
            </div>
          );
        })}
        <Button
          type="button"
          className="w-[100px] h-[40px] rounded-full bg-gray_200"
          onClick={() => {
            field.onChange(field.value.concat(''));
          }}
        >
          {'Thêm link'}
        </Button>
      </div>
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem className={cn('space-y-0 gap-4', className)}>
          <FormLabel>{label ?? className}</FormLabel>
          <FormControl>{renderList(field)}</FormControl>
        </FormItem>
      )}
    />
  );
};

export default ListField;
