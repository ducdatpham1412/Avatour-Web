'use client';
import { Fragment, ReactElement, forwardRef, useRef } from 'react';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftComponent?: ReactElement;
};

type Form = {
  useForm: true;
  errorMessage?: string;
  renderError?: (error: boolean) => ReactElement;
};

const Input = forwardRef<HTMLInputElement, InputProps & ({ useForm?: false } | Form)>(
  ({ className, type, useForm, ...props }, ref) => {
    const requireForm = useRef(useForm);
    if (requireForm.current) {
      return <FormInput ref={ref} className={className} type={type} useForm {...props} />;
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

const FormInput = forwardRef<HTMLInputElement, InputProps & Form>(
  ({ className, type, errorMessage, renderError, ...rest }, ref) => {
    const isError = !!errorMessage;

    const error = () => {
      if (renderError) {
        return renderError(isError);
      }
      if (isError) {
        return <p className={cn('text-sm text-red mt-2 ml-2', className)}>{errorMessage}</p>;
      }
      return null;
    };

    return (
      <Fragment>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
            isError ? 'border-red focus-visible:ring-red/50' : '',
          )}
          autoComplete="off"
          ref={ref}
          {...rest}
        />
        {error()}
      </Fragment>
    );
  },
);

Input.displayName = 'Input';

export { Input };
