import { initData } from '../../../data/pkg';

export const DOC_ID = 'database';
export const ATTACHMENT_ID = 'data.json';

/**
 * 初始化数据
 * */
export function checkData(): void {
  const buf = get_buffer();
  const newBuf = initData(buf);
  writeToFile(newBuf);
}

/**
 * 将数据写入文件
 * */
export function writeToFile(buf: Uint8Array): void {
  const data = utools.db.get(DOC_ID);
  let rev: string;
  if (data === null) {
    rev =
      utools.db.put({
        _id: DOC_ID,
        data: ATTACHMENT_ID,
      })._rev ?? '';
  } else {
    rev = data._rev ?? '';
  }
  utools.db.putAttachment(DOC_ID, ATTACHMENT_ID, rev, buf, 'text/json');
}

/**
 * 从文件中获取数据
 * */
export function get_buffer(): Uint8Array {
  const data = utools.db.getAttachment(DOC_ID, ATTACHMENT_ID);
  let buf: Uint8Array;
  if (data === null) {
    utools.db.putAttachment(DOC_ID, ATTACHMENT_ID, null, new TextEncoder().encode(''), 'text/json');
    buf = new TextEncoder().encode('');
  } else {
    buf = data;
  }
  return buf;
}
