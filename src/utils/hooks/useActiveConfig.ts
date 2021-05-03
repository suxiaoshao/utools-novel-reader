import { useQuery } from './useQuery';
import React from 'react';
import { defaultConfigs } from '../web/config/defaultConfig';
import { TotalConfig } from '../web/config/totalConfig';

export function useActiveConfig(): TotalConfig | undefined {
  const mainPageUrl = useQuery('url');
  return React.useMemo(() => {
    return defaultConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl]);
}
