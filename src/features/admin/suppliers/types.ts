import { Control, RegisterOptions } from 'react-hook-form';

type SupplierData = Partial<TypeProfile>;

type FormFieldProps<T extends Record<string, any>> = {
  control: Control<Partial<T> | T, any>;
  className?: string;
  name: keyof T;
  label?: string;
  options?: {
    id: number | string;
    name: string;
  }[];
  placeholder?: string;
  rules?:
    | Omit<
        RegisterOptions<Partial<TypeProfile>>,
        'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
};

type FormFieldDefine<T extends Record<string, any>> = Record<
  keyof T,
  Omit<FormFieldProps<T>, 'control'>
>;

export type { FormFieldDefine, FormFieldProps, SupplierData };
