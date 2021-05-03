export interface DirectoryConfig {
  chapterId: string;
  /**
   * 编码方式
   * */
  encoding: string;
}

export interface InfoConfig {
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
   * 编码方式
   * */
  encoding: string;
  /**
   * 小说图片
   * */
  image: string;
  /**
   * 描述
   * */
  desc: string;
}

/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 章节列表的配置
 * */
export interface NovelInfoConfig {
  directory: DirectoryConfig;
  info: InfoConfig;
}
