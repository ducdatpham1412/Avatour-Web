import { useRouter as useAppRouter, usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
  showProgressBar?: boolean;
}

function useRouter() {
  const router = useAppRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function push(path: string, options?: TransitionOptions) {
    const showProgressBar = options?.showProgressBar ?? true;
    delete options?.showProgressBar;

    const currentUrl = new URL(pathname + '?' + params.toString(), location.href);
    const targetUrl = new URL(path, location.href);

    if (showProgressBar && !isSameURL(currentUrl, targetUrl)) {
      NProgress.start();
    }

    router.push(path, options);
  }

  return {
    ...router,
    push,
  };
}

function isSameURL(target: URL, current: URL) {
  const cleanTarget = target.protocol + '//' + target.host + target.pathname;
  const cleanCurrent = current.protocol + '//' + current.host + current.pathname;
  return cleanTarget === cleanCurrent && isSameParams(target.searchParams, current.searchParams);
}

function isSameParams(a: URLSearchParams, b: URLSearchParams) {
  a.sort();
  b.sort();
  return a.toString() === b.toString();
}

export default useRouter;
