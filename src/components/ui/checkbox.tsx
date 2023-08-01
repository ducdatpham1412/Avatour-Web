'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Show } from './show';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'children'> & {
    children?: (value: boolean | string | undefined) => React.ReactElement;
  }
>(({ className, children, ...props }, ref) => {
  const componentRef = React.useRef<HTMLButtonElement>(null);
  const style = React.useMemo(
    () => (children ? { width: 0, height: 0, border: 0, padding: 0 } : {}),
    [children],
  );

  React.useImperativeHandle(ref, () => componentRef.current!);

  const onClick = React.useCallback(() => {
    if (componentRef.current) {
      componentRef.current.click();
    }
  }, []);

  return (
    <React.Fragment>
      <CheckboxPrimitive.Root
        ref={componentRef}
        className={cn(
          'peer h-[1.2em] w-[1.2em] shrink-0 rounded-sm border-2 border-gray-800 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
          className,
        )}
        {...props}
        style={style}
      >
        <CheckboxPrimitive.Indicator
          className={cn('flex items-center justify-center text-current')}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <Show when={typeof children === 'function'}>
        <div onClick={onClick} className="contents">
          {children && children(!!props.checked)}
        </div>
      </Show>
    </React.Fragment>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
