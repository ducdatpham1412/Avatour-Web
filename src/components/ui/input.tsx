'use client';
import { useRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

import { useFormField } from './form';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps & { useForm?: boolean }>(
  ({ className, type, useForm, ...props }, ref) => {
    const requireForm = useRef(useForm);
    if (requireForm.current) {
      return <FormInput ref={ref} className={className} type={type} {...props} />;
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        autoComplete="off"
        ref={ref}
        {...props}
      />
    );
  },
);

const FormInput = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  const { error } = useFormField();
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
        error ? 'border-red focus-visible:ring-red/50' : '',
      )}
      autoComplete="off"
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
