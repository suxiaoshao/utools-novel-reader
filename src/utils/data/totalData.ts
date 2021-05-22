import { TotalData } from 'data';
import { Chapter } from '../web/novelInfo';
import { getBuffer } from './util';

export class TotalDataBuild {
  private static totalData?: TotalData;

  public static getTotalData(): TotalData {
    if (this.totalData !== undefined) {
      return this.totalData;
    } else {
      this.totalData = TotalData.load(getBuffer());
      return this.totalData;
    }
  }
}

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
