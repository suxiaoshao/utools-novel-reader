import { useQuery } from '../useQuery';
import React from 'react';
import { TotalConfig } from '../../web/config/totalConfig';
import { useTotalConfigs } from '../../store/config.store';

export function useActiveConfig(): TotalConfig | undefined {
  const mainPageUrl = useQuery('url');
  const [totalConfigs] = useTotalConfigs();
  return React.useMemo(() => {
    return totalConfigs.find((value) => value.mainPageUrl === mainPageUrl);
  }, [mainPageUrl, totalConfigs]);
}
