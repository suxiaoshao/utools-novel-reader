/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 文章的配置
 * */
export interface ContentConfig {
  /**
   * 编码方式
   * */
  encoding: string;
  /**
   * 章节名
   * */
  chapterName: string;
  /**
   * 小说名
   * */
  novelName: string;
  /**
   * 上一章
   * */
  preChapterId: string;
  /**
   * 下一章
   * */
  nextChapterId: string;
  /**
   * 文章内容
   * */
  content: string;
  /**
   * 文章内容切割
   * */
  contentSplit: string | null;
}
