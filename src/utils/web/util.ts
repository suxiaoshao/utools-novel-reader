import axios from 'axios';
import { Buffer } from 'buffer';
import * as iconv from 'iconv-lite';
import { Root } from 'cheerio';

export async function getHtml(url: string, encoding: string): Promise<string> {
  const response = await axios.get<Buffer>(url, {
    responseType: 'arraybuffer',
  });
  const htmlBuf = response.data;
  return iconv.decode(htmlBuf, encoding);
}

//根据selector和regexString获取id，如果找不到返回null，找到了返回结果:string
export function getIdFromHref($: Root, selector: string, regexString: string): string | undefined {
  return $(selector).attr('href')?.match(regexString)?.groups?.['id'];
}
