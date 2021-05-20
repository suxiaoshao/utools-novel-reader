import React from 'react';
import { TotalDataBuild } from '../../data/totalData';

export interface IsStar {
  isStar: boolean;
  getIsStar: () => void;
}

export function useIsStar(novelId: string, mainPageUrl: string): IsStar {
  const [isStar, setIsStar] = React.useState(false);
  const getIsStar = React.useCallback(() => {
    const totalData = TotalDataBuild.getTotalData();
    setIsStar(totalData.checkExists(novelId, mainPageUrl));
  }, [mainPageUrl, novelId]);
  React.useEffect(() => {
    getIsStar();
  }, [getIsStar]);
  return {
    isStar,
    getIsStar,
  };
}
