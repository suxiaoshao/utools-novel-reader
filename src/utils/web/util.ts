import { Root } from 'cheerio';
import axios from 'axios';

export async function getHtml(url: string, encoding: string): Promise<string> {
  const response = await axios.get<ArrayBuffer>(url, {
    responseType: 'arraybuffer',
  });
  const htmlBuf = response.data;
  const a = new TextDecoder(encoding);
  return a.decode(htmlBuf);
}

//根据selector和regexString获取id，如果找不到返回null，找到了返回结果:string
export function getIdFromHref($: Root, selector: string, regexString: string): string | undefined {
  return $(selector).attr('href')?.match(regexString)?.groups?.['id'];
}
