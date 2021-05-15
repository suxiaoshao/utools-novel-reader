import { TotalData } from 'data';
import { Chapter } from '../web/novelInfo';

export const totalData: { data?: TotalData } = {};

export interface ReadRecord {
  author: string;
  name: string;
  chapter: Chapter;
  mainPageUrl: string;
  novelId: string;
  /**
   * 图片
   * */
  image: string | null;
  /**
   * 小说描述
   * */
  desc: string;
}
