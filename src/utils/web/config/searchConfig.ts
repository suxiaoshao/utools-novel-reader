/**
 * @author sushao
 * @since 0.4.0
 * @version 0.4.0
 * @description 搜索的配置
 * */
export interface SearchConfig {
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
   * 更新时间的正则,如果没有则为 false
   * */
  updateTime: string;
  /**
   * 小说图片
   * */
  image: string;
  /**
   * 标签
   * */
  label: string;
  /**
   * 描述
   * */
  desc: string;
  /**
   * 编码方式
   * */
  encoding: string;
}
