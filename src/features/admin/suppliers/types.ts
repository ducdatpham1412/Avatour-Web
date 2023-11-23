import { Control, RegisterOptions } from 'react-hook-form';

type SupplierData = Partial<TypeGetProfileResponse>;

interface EditSuppliersFormProps {
  defaultValues?: SupplierData;
  onSubmit: (data: SupplierData, type: 'update' | 'create') => Promise<void>;
}

type FormFieldProps<T extends Record<string, any>> = {
  control: Control<Partial<T> | T, any>;
  className?: string;
  name: keyof T;
  label?: string;
  options?: {
    id: number;
    name: string;
  }[];
  placeholder?: string;
  rules?:
    | Omit<
        RegisterOptions<Partial<TypeGetProfileResponse>>,
        'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
};

type FormFieldDefine<T extends Record<string, any>> = Record<
  keyof T,
  Omit<FormFieldProps<T>, 'control'>
>;

export type { SupplierData, EditSuppliersFormProps, FormFieldDefine, FormFieldProps };
