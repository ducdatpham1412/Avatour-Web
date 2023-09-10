import { Fragment, ReactNode, memo } from 'react';

interface ShowProps<T> {
  when: T | undefined;
  children?: ((value: NonNullable<T>) => ReactNode) | ReactNode;
  fallback?: ReactNode;
}

interface ShowMemoProps<T> extends ShowProps<T> {
  childrenDependencies?: any[];
  fallbackDependencies?: any[];
}

type ShowComponent = {
  <T>({ when, children, fallback }: ShowProps<T>): JSX.Element;
  displayName: string;
};

type ShowMemoComponent = {
  <T>({ when, children, fallback }: ShowMemoProps<T>): JSX.Element;
  displayName: string;
};

const ShowDefault = <T,>({ when, children, fallback }: ShowProps<T>) => {
  if (typeof children === 'function') {
    return <Fragment>{when ? children(when) : fallback}</Fragment>;
  }

  return <Fragment>{when ? children : fallback}</Fragment>;
};

const ShowConst = memo(
  <T,>(props: ShowProps<T>) => <ShowDefault {...props} />,
  (prev, next) => prev.when === next.when,
);

const ShowMemo = memo(<T,>(props: ShowProps<T>) => <ShowDefault {...props} />, compareDependencies);

function compareDependencies<T>(prev: ShowMemoProps<T>, next: ShowMemoProps<T>) {
  if (prev.when !== next.when) return false;

  const prevChilren = prev.childrenDependencies ?? [];
  const nextChilren = next.childrenDependencies ?? [];

  if (prevChilren.some((pc, index) => pc !== nextChilren[index])) {
    return false;
  }

  const prevFallback = prev.fallbackDependencies ?? [];
  const nextFallback = next.fallbackDependencies ?? [];

  if (prevFallback.some((pc, index) => pc !== nextFallback[index])) {
    return false;
  }

  return true;
}

ShowDefault.displayName = 'ShowDefault';
ShowConst.displayName = 'ShowConst';
ShowMemo.displayName = 'ShowMemo';

const Show = Object.assign(memo(ShowDefault) as ShowComponent, {
  Memo: ShowMemo as ShowComponent,
  Const: ShowConst as ShowMemoComponent,
});

export type { ShowProps, ShowMemoProps };
export { Show };
