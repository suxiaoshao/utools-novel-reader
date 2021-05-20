import React from 'react';
import { ReadRecord, TotalDataBuild } from '../../data/totalData';

/**
 * 获取阅读记录数据
 * */
export function useReadRecords(): { readRecords: ReadRecord[]; updateReadRecords(): void } {
  const [readRecords, setReadRecords] = React.useState<ReadRecord[]>([]);
  const updateReadRecords = React.useCallback(() => {
    const totalData = TotalDataBuild.getTotalData();
    setReadRecords(totalData.getAllReadRecord());
  }, []);
  React.useEffect(() => {
    updateReadRecords();
  }, [updateReadRecords]);
  return { readRecords, updateReadRecords };
}
