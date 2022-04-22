export const Doc_Id = 'database';

/**
 * 将数据写入文件
 * */
export function writeToFile(buf: Uint8Array): void {
  utools.db.remove(Doc_Id);
  utools.db.postAttachment(Doc_Id, buf, 'text/json');
}

/**
 * 从文件中获取数据
 * */
export function getBuffer(): Uint8Array {
  const data = utools.db.getAttachment(Doc_Id);
  let buf: Uint8Array;
  if (data === null) {
    buf = new TextEncoder().encode('');
  } else {
    buf = data;
  }
  return buf;
}
