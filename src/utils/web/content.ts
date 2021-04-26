import { getHtml, getIdFromHref } from './util';
import cheerio from 'cheerio';

/**
 * 文章内容数据
 * */
export interface ContentData {
  novelName: string;
  chapterName: string;
  contentList: string[];
  preChapterId: string | undefined;
  nextChapterId: string | undefined;
}

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 文章的配置
 * */
export interface ContentConfig {
  /**
   * url 的总体格式
   * */
  url: string;
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
   * 上一章正则
   * */
  preChapterIdRegex: string;
  /**
   * 下一章
   * */
  nextChapterId: string;
  /**
   * 下一章正则
   * */
  nextChapterIdRegex: string;
  /**
   * 文章内容
   * */
  content: string;
  /**
   * 文章内容切割
   * */
  contentSplit?: string;
}

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 章节内容类,用于读取配置
 * */
export class Content implements ContentConfig {
  /**
   * url 的总体格式
   * */
  url: string;
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
   * 上一章正则
   * */
  preChapterIdRegex: string;
  /**
   * 下一章
   * */
  nextChapterId: string;
  /**
   * 下一章正则
   * */
  nextChapterIdRegex: string;
  /**
   * 文章内容
   * */
  content: string;
  /**
   * 文章内容切割
   * */
  contentSplit?: string;
  /**
   * 小说网站的编码方式
   * */
  encoding: string;

  constructor(content: ContentConfig, encoding: string) {
    this.contentSplit = content.contentSplit;
    this.preChapterId = content.preChapterId;
    this.chapterName = content.chapterName;
    this.url = content.url;
    this.novelName = content.novelName;
    this.content = content.content;
    this.nextChapterIdRegex = content.nextChapterIdRegex;
    this.nextChapterId = content.nextChapterId;
    this.preChapterIdRegex = content.preChapterIdRegex;
    this.encoding = encoding;
  }

  /**
   * 获取文章
   * */
  async getContent(novelId: string, chapterId: string): Promise<ContentData> {
    const url = this.url.replace('{##novel_id##}', novelId).replace('{##chapter_id##}', chapterId);
    const htmlString = await getHtml(url, this.encoding);
    const $content = cheerio.load(htmlString, { decodeEntities: false, xmlMode: true });
    const chapterName = $content(this.chapterName).text();
    const novelName = $content(this.novelName).text();
    const preChapterId = getIdFromHref($content, this.preChapterId, this.preChapterIdRegex);
    const nextChapterId = getIdFromHref($content, this.nextChapterId, this.nextChapterIdRegex);
    const contentList =
      this.contentSplit !== undefined
        ? $content(this.content)
            .text()
            .split(this.contentSplit)
            .filter((value) => value !== '')
        : Array.from($content(this.content)).map((element) => $content(element).text());
    return {
      contentList,
      chapterName,
      preChapterId,
      nextChapterId,
      novelName,
    };
  }
}
