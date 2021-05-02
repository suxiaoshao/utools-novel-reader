import { useLocation } from 'react-router';
import React from 'react';

/**
 * 获取 url query
 * */
export function useQuery(key: string): string | null {
  const pageLocation = useLocation();
  const value = React.useMemo(() => {
    return new URLSearchParams(pageLocation.search).get(key);
  }, [key, pageLocation.search]);
  return value;
}
