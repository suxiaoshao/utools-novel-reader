import { SearchConfig } from './searchConfig';
import { NovelInfoConfig } from './novelInfoConfig';
import { ContentConfig } from './contentConfig';
import { UrlConfig } from './urlConfig';
import { RegexConfig } from './regexConfig';

/**
 * 全部配置
 * */
export interface TotalConfig {
  /**
   * 网站地址
   * */
  mainPageUrl: string;
  /**
   * 标识名
   * */
  name: string;
  /**
   * 搜索配置
   * */
  search: SearchConfig;
  /**
   * 小说页面配置
   * */
  novel: NovelInfoConfig;
  /**
   * 内容页配置
   * */
  content: ContentConfig;
  /**
   * url 配置
   * */
  url: UrlConfig;
  /**
   * 正则配置
   * */
  regex: RegexConfig;
}
