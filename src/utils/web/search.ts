import { getHtml } from './util';
import cheerio from 'cheerio';
import { TotalConfig } from './config/totalConfig';
import { SearchConfig } from './config/searchConfig';
import { UrlUtil } from './urlUtil';
import { RegexUtil } from './regexUtil';

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 搜索每一项的内容
 * */
export interface SearchListItem {
  /**
   * 小说名字
   * */
  novelName: string;
  /**
   * 小说 id
   * */
  novelId: string;
  /**
   * 作者
   * */
  authorName: string;
  /**
   * 最后一章的名字
   * */
  latestChapterName: string;
  /**
   * 最后一章 id
   * */
  latestChapterId: string;
  /**
   * 更新时间
   * */
  updateTime: string;
}

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 搜索类,用于读取配置并搜素
 * */
export class Search {
  /**
   * 搜索配置
   * */
  config: SearchConfig;
  /**
   * 小说网站的编码方式
   * */
  encoding: string;
  /**
   * url 配置
   * */
  url: UrlUtil;
  /**
   * 正则配置
   * */
  regex: RegexUtil;

  constructor(config: TotalConfig) {
    this.config = config.search;
    this.encoding = config.encoding;
    this.url = new UrlUtil(config.url);
    this.regex = new RegexUtil(config.regex);
  }

  public async getSearchList(searchName: string): Promise<SearchListItem[]> {
    const searchList: SearchListItem[] = [];
    /**
     * 获取搜索结果的 html 树
     * */
    const url = this.url.getSearchUrl(searchName);
    const htmlString = await getHtml(url, this.encoding);
    const $ = cheerio.load(htmlString, { decodeEntities: false });
    /**
     * 遍历每个搜索结果
     * */
    $(this.config.li).each((index, element) => {
      const searchItem = this.getSearchItem($.html(element));
      if (searchItem) {
        searchList.push(searchItem);
      }
    });
    return searchList;
  }

  public getSearchItem(html: string): SearchListItem | null {
    /**
     * 获取小说名,作者名,最后章节小说名
     * */
    const $searchItem = cheerio.load(html, { decodeEntities: false, xmlMode: true });
    const novelName: string = $searchItem(this.config.novelId).text().trim();
    const authorName: string = $searchItem(this.config.authorName).text();
    const latestChapterName: string = $searchItem(this.config.latestChapterId).text();
    /**
     * 获取最近更新时间
     * */
    const updateTime = $searchItem(this.config.updateTime).text() || '网站未提供';
    /**
     * 获取章节和小说 id
     * */
    const novelId = this.regex.getNovelId($searchItem(this.config.novelId).attr('href'));
    const latestChapterId = this.regex.getChapter($searchItem(this.config.latestChapterId).attr('href'));
    if (novelId && latestChapterId) {
      return {
        novelName,
        authorName,
        latestChapterId,
        latestChapterName,
        updateTime,
        novelId,
      };
    } else {
      return null;
    }
  }
}
