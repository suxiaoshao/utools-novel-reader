import React from 'react';
import { ReadRecord, totalData } from '../../data/totalData';

/**
 * 获取阅读记录数据
 * */
export function useReadRecords(): { readRecords: ReadRecord[]; updateReadRecords(): void } {
  const [readRecords, setReadRecords] = React.useState<ReadRecord[]>([]);
  const updateReadRecords = React.useCallback(() => {
    setReadRecords(totalData.data?.getAllReadRecord() ?? []);
  }, []);
  React.useEffect(() => {
    updateReadRecords();
  }, [updateReadRecords]);
  return { readRecords, updateReadRecords };
}
