import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';

const useMySearchParams = () => {
  const queryString = useSearchParams();
  const [searchParams, setSearchParams] = useState(parseParams(queryString));

  useEffect(() => {
    const newSearchParams = parseParams(queryString);
    if (!isEqual(newSearchParams, searchParams)) {
      setSearchParams(searchParams);
    }
  }, [queryString]);

  return searchParams;
};

function parseParams(searchParams: ReadonlyURLSearchParams) {
  const params: Record<string, any> = {};

  for (const param of searchParams) {
    if (params[param[0]]) {
      if (Array.isArray(params[param[0]])) {
        params[param[0]].push(param[1]);
      } else {
        params[param[0]] = [params[param[0]], param[1]];
      }
    } else {
      params[param[0]] = param[1];
    }
  }
  return params;
}

export default useMySearchParams;
