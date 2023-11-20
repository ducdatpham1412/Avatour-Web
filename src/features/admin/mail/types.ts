import { Control, RegisterOptions } from 'react-hook-form';
import { z } from 'zod';

import { mailFormSchema } from '@/lib';

export type MailForm = z.infer<typeof mailFormSchema>;

export interface MailFormFields<T extends Record<string, any>> {
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
        RegisterOptions<Partial<MailForm>>,
        'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
      >
    | undefined;
}
