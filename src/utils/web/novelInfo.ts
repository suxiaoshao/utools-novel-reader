import * as cheerio from 'cheerio';
import { getHtml, getIdFromHref } from './util';

//章节信息
export interface Chapter {
  name: string;
  chapterId: string;
}

export interface NovelData {
  /**
   * 小说名
   * */
  name: string;
  /**
   * 作者
   * */
  author: string;
  /**
   * 最后更新时间
   * */
  lastUpdateTime: string;
  /**
   * 最新章节
   * */
  latestChapter: Chapter;
}

export interface NovelAllData extends NovelData {
  directories: Chapter[];
}

export interface Directory {
  /**
   * 文章列表信息
   * */
  url: string;
  chapterId: string;
  chapterIdRegex: string;
}

export interface Info {
  /**
   * 小说基本信息
   * */
  url: string;
  /**
   * 小说名
   * */
  name: string;
  /**
   * 作者
   * */
  author: string;
  /**
   * 最后更新时间
   * */
  lastUpdateTime: string;
  /**
   * 最新章节
   * */
  latestChapterId: string;
  /**
   * 最新章节正则
   * */
  latestChapterIdRegex: string;
}

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 章节列表的配置
 * */
export interface NovelInfoConfig {
  directory: Directory;
  info: Info;
}

export class NovelInfo implements NovelInfoConfig {
  directory: Directory;
  info: Info;
  encoding: string;

  constructor(novelInfoConfig: NovelInfoConfig, encoding: string) {
    this.directory = novelInfoConfig.directory;
    this.info = novelInfoConfig.info;
    this.encoding = encoding;
  }

  /**
   * 获取信息
   * */
  public async getDirectoryAndInfo(novelId: string): Promise<NovelAllData> {
    const directoryUrl = this.directory.url.replace('{##novel_id##}', novelId);
    const infoUrl = this.info.url.replace('{##novel_id##}', novelId);
    if (infoUrl === directoryUrl) {
      const htmlString = await getHtml(directoryUrl, this.encoding);
      const $ = cheerio.load(htmlString, { decodeEntities: false, xmlMode: true });
      return {
        ...this.getInfo($),
        directories: this.getDirectory($),
      };
    } else {
      const [infoHtml, directoryHtml] = await Promise.all([
        getHtml(infoUrl, this.encoding),
        getHtml(directoryUrl, this.encoding),
      ]);
      return {
        ...this.getInfo(cheerio.load(infoHtml, { decodeEntities: false, xmlMode: true })),
        directories: this.getDirectory(cheerio.load(directoryHtml, { decodeEntities: false, xmlMode: true })),
      };
    }
  }

  /**
   * 获取章节信息
   * */
  private getDirectory($directory: cheerio.Root): Chapter[] {
    return Array.from($directory(this.directory.chapterId))
      .map((element) => {
        const $element = $directory(element);
        const name = $element.text();
        const chapterId = $element.attr('href')?.match(this.directory.chapterIdRegex)?.groups?.id;
        return chapterId ? { name, chapterId } : null;
      })
      .filter((value) => value !== null) as Chapter[];
  }

  /**
   * 获取小说基本信息
   * */
  private getInfo($info: cheerio.Root): NovelData {
    const novelName = $info(this.info.name).text();
    const authorName = $info(this.info.author).text();
    const lastUpdateTime = $info(this.info.lastUpdateTime).text();
    const latestChapterName = $info(this.info.latestChapterId).text();
    const lastId = getIdFromHref($info, this.info.latestChapterId, this.info.latestChapterIdRegex);
    if (lastId === undefined) {
      throw new Error('网站解析错误');
    }
    return {
      name: novelName,
      author: authorName,
      lastUpdateTime,
      latestChapter: {
        name: latestChapterName,
        chapterId: lastId,
      },
    };
  }
}
