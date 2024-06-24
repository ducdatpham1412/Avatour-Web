'use client';
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
import { logger } from '@/lib';

interface Props {
  children: ReactNode;
}

type ContextValue = {
  initLoading: boolean;
  profile: TypeProfile | undefined;
  resource: Resource | undefined;
};

type TypeContext = [
  ContextValue,
  {
    setProfile: Dispatch<SetStateAction<TypeProfile | undefined>>;
  },
];

const Context = createContext<TypeContext>({} as TypeContext);

export const useAppContext = () => useContext(Context);

const Provider = ({ children }: Props) => {
  const [initLoading, setInitLoading] = useState(true);
  const [profile, setProfile] = useState<TypeProfile>();
  const [resource, setResource] = useState<Resource>();

  const contextValue: ContextValue = {
    initLoading,
    profile,
    resource,
  };

  useEffect(() => {
    const init = async () => {
      const store = localStorage.getItem('context');
      if (store) {
        const value = JSON.parse(store) as ContextValue;
        setProfile(value.profile);
        setResource(value.resource);
        setInitLoading(false);
      }

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

  useEffect(() => {
    localStorage.setItem('context', JSON.stringify(contextValue));
  }, [contextValue]);

  return (
    <Context.Provider
      value={[
        contextValue,
        {
          setProfile,
        },
      ]}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
