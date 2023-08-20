import { Fragment, ReactNode, memo } from 'react';

interface ShowProps {
  when: boolean | undefined;
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ShowMemoProps extends ShowProps {
  childrenDependencies?: any[];
  fallbackDependencies?: any[];
}

const ShowDefault = memo<ShowProps>(({ when, children, fallback }) => (
  <Fragment>{when ? children : fallback}</Fragment>
));

const ShowConst = memo<ShowProps>(
  ({ when, children, fallback }) => <Fragment>{when ? children : fallback}</Fragment>,
  (prev, next) => prev.when === next.when,
);

const ShowMemo = memo<ShowMemoProps>(
  ({ when, children, fallback }) => <Fragment>{when ? children : fallback}</Fragment>,
  compareDependencies,
);

function compareDependencies(prev: ShowMemoProps, next: ShowMemoProps) {
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

const Show = Object.assign(ShowDefault, { Memo: ShowMemo, Const: ShowConst });

export type { ShowProps, ShowMemoProps };
export { Show };
