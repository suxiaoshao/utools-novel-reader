import { getHtml, getIdFromHref } from './util';
import cheerio from 'cheerio';

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 搜索的配置
 * */
export interface SearchConfig {
  /**
   * url 的总体格式
   * */
  url: string;
  /**
   * 搜索结果的每一项 query 路径
   * */
  li: string;
  /**
   * 在搜索结果中获取 小说 id 的 query 路径
   * */
  novelId: string;
  /**
   * 在搜索结果中获取 小说名字 的 query 路径
   * */
  authorName: string;
  /**
   * 最后一章的路径
   * */
  latestChapterId: string;
  /**
   * 获取最后一章正则
   * */
  latestChapterIdRegex: string;
  /**
   * 更新时间的正则,如果没有则为 false
   * */
  updateTime: string | false;
  /**
   * 获取小说 id 的 正则
   * */
  novelIdRegex: string;
}

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
export class Search implements SearchConfig {
  /**
   * url 的总体格式
   * */
  url: string;
  /**
   * 搜索结果的每一项 query 路径
   * */
  li: string;
  /**
   * 在搜索结果中获取 小说 id 的 query 路径
   * */
  novelId: string;
  /**
   * 在搜索结果中获取 小说名字 的 query 路径
   * */
  authorName: string;
  /**
   * 最后一章的路径
   * */
  latestChapterId: string;
  /**
   * 获取最后一章正则
   * */
  latestChapterIdRegex: string;
  /**
   * 更新时间的正则,如果没有则为 false
   * */
  updateTime: string | false;
  /**
   * 获取小说 id 的 正则
   * */
  novelIdRegex: string;
  /**
   * 小说网站的编码方式
   * */
  encoding: string;

  constructor(searchConfig: SearchConfig, encoding: string) {
    this.updateTime = searchConfig.updateTime;
    this.url = searchConfig.url;
    this.authorName = searchConfig.authorName;
    this.latestChapterId = searchConfig.latestChapterId;
    this.latestChapterIdRegex = searchConfig.latestChapterIdRegex;
    this.li = searchConfig.li;
    this.novelId = searchConfig.novelId;
    this.novelIdRegex = searchConfig.novelIdRegex;
    this.encoding = encoding;
  }

  public async getSearchList(searchName: string): Promise<SearchListItem[]> {
    const searchList: SearchListItem[] = [];
    /**
     * 获取搜索结果的 html 树
     * */
    const url = this.url.replace('{##searchName##}', searchName);
    const htmlString = await getHtml(url, this.encoding);
    const $ = cheerio.load(htmlString, { decodeEntities: false });
    /**
     * 遍历每个搜索结果
     * */
    $(this.li).each((index, element) => {
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
    const novelName: string = $searchItem(this.novelId).text().trim();
    const authorName: string = $searchItem(this.authorName).text();
    const latestChapterName: string = $searchItem(this.latestChapterId).text();
    /**
     * 获取最近更新时间
     * */
    const updateTime = this.updateTime ? $searchItem(this.updateTime).text() : '网站未提供';
    /**
     * 获取章节和小说 id
     * */
    const novelId = getIdFromHref($searchItem, this.novelId, this.novelIdRegex);
    const latestChapterId = getIdFromHref($searchItem, this.latestChapterId, this.latestChapterIdRegex);
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
