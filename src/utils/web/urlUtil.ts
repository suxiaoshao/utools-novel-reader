import { UrlConfig } from './config/urlConfig';

export class UrlUtil {
  private config: UrlConfig;

  public constructor(config: UrlConfig) {
    this.config = config;
  }

  /**
   * 获取搜索 url
   * */
  public getSearchUrl(searchName: string): string {
    return this.config.search.replace(this.config.searchPlaceholder, searchName);
  }

  /**
   * 获取章节内容 url
   * */
  public getChapterUrl(novelId: string, chapterId: string): string {
    return this.config.chapter
      .replace(this.config.novelPlaceholder, novelId)
      .replace(this.config.chapterPlaceholder, chapterId);
  }

  /**
   * 获取小说信息页面 url
   * */
  public getNovelInfoUrl(novelId: string): string {
    return this.config.novelInfo.replace(this.config.novelPlaceholder, novelId);
  }

  /**
   * 获取小说目录页面 url
   * */
  public getDirectoryUrl(novelId: string): string {
    return this.config.directory.replace(this.config.novelPlaceholder, novelId);
  }
}
