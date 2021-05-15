import React from 'react';
import { totalData } from '../../data/totalData';

export interface IsStar {
  isStar: boolean;
  getIsStar: () => void;
}

export function useIsStar(novelId: string, mainPageUrl: string): IsStar {
  const [isStar, setIsStar] = React.useState(false);
  const getIsStar = React.useCallback(() => {
    setIsStar(totalData?.data?.checkExists(novelId, mainPageUrl) ?? false);
  }, [mainPageUrl, novelId]);
  React.useEffect(() => {
    getIsStar();
  }, [getIsStar]);
  return {
    isStar,
    getIsStar,
  };
}
