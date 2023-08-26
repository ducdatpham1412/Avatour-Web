import { useRouter as useAppRouter } from 'next/navigation';
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

  function push(path: string, options?: TransitionOptions) {
    const showProgressBar = options?.showProgressBar ?? true;
    delete options?.showProgressBar;
    if (showProgressBar) {
      NProgress.start();
    }

    router.push(path, options);
  }

  return {
    ...router,
    push,
  };
}

export default useRouter;
