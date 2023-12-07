import isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Execution } from '@/lib';

const queryCache = new Map();

type QueryOptions<T> = {
  interval?: number;
  initialValue?: T;
  cache?: boolean;
};

type QueryReturn<T> = [
  {
    data: T;
    loading: boolean;
    calling: boolean;
    error: Error | undefined;
  },
  {
    mutate: (mutateOptions?: { force?: boolean }) => Promise<void>;
  },
];

export const useQuery = <T, K = T>(
  keys: number | string | undefined | (number | string | undefined)[],
  fn: (skipQuery: VoidFunction) => T | Promise<T>,
  options?: QueryOptions<K>,
): QueryReturn<T> => {
  const queryKey = useMemo(() => JSON.stringify(keys), [...(Array.isArray(keys) ? keys : [keys])]);
  const isUseCache = options?.cache ?? true;
  const [data, setData] = useState(getQueryCache<T>(queryKey, isUseCache) ?? options?.initialValue);
  const [loading, setLoading] = useState(isUseCache ? !queryCache.get(queryKey) : true);
  const [calling, setCalling] = useState(true);
  const [error, setError] = useState<Error | undefined>();
  const execution = useRef(new Execution());
  const mount = useRef(false);

  const recall = useRef<NodeJS.Timeout>();

  useEffect(() => {
    mount.current = true;
    initRecall();
    void mutate();

    return () => {
      mount.current = false;

      clearInterval(recall.current);
    };
  }, []);

  useEffect(() => {
    const cacheData = queryCache.get(queryKey);
    const newData = cacheData ?? options?.initialValue;

    if (!newData) {
      setLoading(!newData);
    }
    if (isUseCache) {
      setData(newData);
    } else {
      setData(options?.initialValue);
    }
  }, [queryKey]);

  function initRecall() {
    if (!mount) {
      return;
    }
    clearInterval(recall.current);
    if (options?.interval) {
      recall.current = setInterval(() => void updateData(), options.interval);
    }
  }

  function updateData() {
    return execution.current.run(async (c, isC) => {
      setCalling(true);
      if (!fn) {
        return;
      }
      let isSkiped = false;
      const skipQuery = () => {
        isSkiped = true;
        throw new Error();
      };
      try {
        const newData = await fn(skipQuery);

        const oldData = data;
        if (isC(c)) {
          if (!isEqual(oldData, newData)) {
            setData(newData ?? options?.initialValue);
            queryCache.set(queryKey, newData);
          }
        }
      } catch (err) {
        if (isSkiped) {
          return;
        }
        if (isC(c)) {
          setError(err as Error);
        }
      } finally {
        if (isC(c)) {
          if (!isSkiped) {
            setLoading(false);
          }
          setCalling(false);
        }
      }
    });
  }

  async function mutate(mutateOptions?: { force?: boolean }) {
    if (mutateOptions?.force) {
      setLoading(true);
    }
    await updateData();
    initRecall();
  }

  return [
    {
      data: data as any,
      loading,
      calling,
      error,
    },
    {
      mutate,
    },
  ];
};

function getQueryCache<T>(key: string, isUseCache = true) {
  if (isUseCache) {
    return queryCache.get(key) as T;
  }
}
