import { RegexConfig } from './config/regexConfig';

export class RegexUtil {
  private config: RegexConfig;

  public constructor(config: RegexConfig) {
    this.config = config;
  }

  /**
   * 获取 novelId
   * */
  public getNovelId(url: string | undefined): string | undefined {
    return url?.match(this.config.novel)?.groups?.[this.config.novelIdPlaceholder];
  }

  /**
   * 获取 chapterId
   * */
  public getChapter(url: string | undefined): string | undefined {
    return url?.match(this.config.chapter)?.groups?.[this.config.chapterIdPlaceholder];
  }
}
