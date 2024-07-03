import { useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import CloseIcon from '@/components/icon/CloseIcon';
import { Button, FormControl, FormField, FormItem, FormLabel, Input, Image } from '@/components/ui';
import { cn } from '@/lib';

import { FormFieldProps } from '../types';

type Props = FormFieldProps<Record<string, any>>;

/**
 * TODO: Move this to app's components
 */
const ListField = ({ control, name, rules, className, label, placeholder }: Props) => {
  const [show, setShow] = useState(true);

  const renderList = (
    field: ControllerRenderProps<Record<string, TypeProfile['link']>, string>,
  ) => {
    return (
      <div className="flex flex-wrap items-center gap-4">
        {field.value.map((v, i) => {
          if (!show) {
            return;
          }

          return (
            <div className="flex flex-col gap-2">
              <div key={i} className="flex items-center">
                <Input
                  className="bg-white w-[300px] h-[40px] rounded-[10px]"
                  defaultValue={v.link}
                  placeholder={placeholder}
                  useForm
                  type="text"
                  onChange={e => {
                    field.value[i] = {
                      img: v.img,
                      link: e.target.value.trim(),
                    };
                    field.onChange(field.value);
                  }}
                />
                <div
                  className="ml-2 cursor-pointer"
                  onClick={() => {
                    field.onChange(field.value.filter((_, index) => index !== i));
                    // TODO: Find way better to change defaultValue
                    setShow(false);
                    setTimeout(() => {
                      setShow(true);
                    }, 50);
                  }}
                >
                  <CloseIcon />
                </div>
              </div>

              <div className="w-full inline-flex items-center gap-[10px]">
                <Image src={v.img} className="w-[40px] h-[40px] rounded-[10px]" />
                <Input
                  className="bg-white w-[250px] h-[40px] rounded-[10px]"
                  defaultValue={v.img}
                  placeholder={placeholder}
                  useForm
                  type="text"
                  onChange={e => {
                    field.value[i] = {
                      img: e.target.value.trim(),
                      link: v.link,
                    };
                    field.onChange(field.value);
                  }}
                />
              </div>
            </div>
          );
        })}

        <Button
          type="button"
          className="w-[100px] h-[40px] rounded-full bg-gray_200"
          onClick={() => {
            field.value.push({ img: '', link: '' });
            field.onChange(field.value);
          }}
        >
          Thêm link
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
