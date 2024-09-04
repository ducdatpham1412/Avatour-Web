'use client';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { apiGetPassport, apiGetResource } from '@/api/common';
import '@/configs/bootstrap';
import { isDev, logger } from '@/lib';
import 'dayjs/locale/vi';

interface Props {
  children: ReactNode;
}

type TourSearches = {
  text: string;
  data: TypeTour[];
};

type ContextValue = {
  initLoading: boolean;
  profile: TypeProfile | undefined;
  resource: Resource | undefined;
  tourSearches: TourSearches | undefined;
  router: {
    history: string[];
    canGoBack: boolean;
  };
};

type TypeContext = [
  ContextValue,
  {
    setProfile: Dispatch<SetStateAction<TypeProfile | undefined>>;
    setTourSearches: Dispatch<SetStateAction<TourSearches | undefined>>;
    setHistory: Dispatch<SetStateAction<string[]>>;
  },
];

const Context = createContext<TypeContext>({} as TypeContext);

export const useAppContext = () => useContext(Context);

const Provider = ({ children }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [initLoading, setInitLoading] = useState(true);
  const [profile, setProfile] = useState<TypeProfile>();
  const [resource, setResource] = useState<Resource>();
  const [tourSearches, setTourSearches] = useState<TourSearches>();
  const [history, setHistory] = useState<string[]>([]);

  const contextValue: ContextValue = {
    initLoading,
    profile,
    resource,
    tourSearches,
    router: {
      history,
      canGoBack: history.length > 1,
    },
  };

  useEffect(() => {
    const params = searchParams.toString();
    const tail = `${pathname}${params ? `?${searchParams}` : ''}`;

    if (!isDev) {
      const host = window.location.href.replace(tail, '');
      if (!host.includes('www.avatour.life')) {
        redirect(`http://www.avatour.life${tail}`);
      }
    }

    setHistory(pre => {
      pre.push(tail);
      if (pre.length > 5) {
        pre.splice(0, 1);
      }
      return [...pre];
    });
  }, [pathname, searchParams, setHistory]);

  useEffect(() => {
    const init = async () => {
      //   const store = localStorage.getItem('context');
      //   if (store) {
      //     const value = JSON.parse(store) as ContextValue;
      //     setProfile(value.profile);
      //     setResource(value.resource);
      //   }

      try {
        const res = await apiGetPassport();
        setProfile(res.profile);
      } catch (err) {
        logger.log('Not have profile => Init anonymous');
      }

      try {
        const resResource = await apiGetResource();
        setResource(resResource);
      } catch (err) {
        logger.log('Get resource failed: ', err);
      }

      setInitLoading(false);
    };

    init().catch(() => null);
  }, [setProfile, setResource, setInitLoading]);

  //   useEffect(() => {
  //     localStorage.setItem('context', JSON.stringify(contextValue));
  //   }, [contextValue]);

  return (
    <Context.Provider
      value={[
        contextValue,
        {
          setProfile,
          setTourSearches,
          setHistory,
        },
      ]}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
        {children}
      </LocalizationProvider>
    </Context.Provider>
  );
};

export default Provider;
