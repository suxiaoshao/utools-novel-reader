import { SearchConfig } from './search';
import { NovelInfo } from './novelInfo';
import { Content } from './content';

export interface NovelConfig {
  encoding: string;
  url: string;
  name: string;
  novel_id_to_url: string;
  url_to_novel_id: string;
  search: SearchConfig;
  novel: NovelInfo;
  content: Content;
}

export const configs: NovelConfig[] = [
  {
    encoding: 'utf-8',
    url: 'https://www.meegoq.com',
    name: '米趣小说网',
    novel_id_to_url: 'https://www.meegoq.com/info{##novelId##}.html',
    url_to_novel_id: 'info(?<id>\\d+)\\.html',
    search: {
      url: 'https://www.meegoq.com/search.htm?keyword={##searchName##}',
      li: 'body > section > div.left > section > ul > li',
      novelId: 'span.n2 > a',
      authorName: 'span.a2 > a',
      latestChapterId: 'span.c2 > a',
      latestChapterIdRegex: '_(?<id>\\d+).html',
      updateTime: 'span.t',
      novelIdRegex: 'info(?<id>\\d+)\\.html',
    },
    novel: {
      directory: {
        url: 'https://www.meegoq.com/book{##novel_id##}.html',
        chapter_id: 'body > section > article > ul > li > a',
        chapter_id_regex: '_(?<id>\\d+).html',
        slice_left: 9,
        slice_right: false,
      },
      info: {
        url: 'https://www.meegoq.com/info{##novel_id##}.html',
        name: 'body > section > div.left > article.info > header > h1',
        author: 'body > section > div.left > article.info > p.detail.pt20 > i:nth-child(1) > a',
        last_update_time: 'body > section > div.left > article.info > p:nth-child(4) > i',
        latest_chapter_id: 'body > section > div.left > article.info > p:nth-child(5) > i > a',
        latest_chapter_id_regex: '_(?<id>\\d+).html',
      },
    },
    content: {
      url: 'https://www.meegoq.com/book/{##novel_id##}_{##chapter_id##}.html',
      chapter_name: 'body > article > header > h1',
      novel_name: 'body > article > header > div > span:nth-child(1) > a',
      pre_chapter_id: 'body > article > div.operate > ul > li:nth-child(1) > a',
      pre_chapter_id_regex: '_(?<id>\\d+).html',
      next_chapter_id: 'body > article > div.operate > ul > li.last > a',
      next_chapter_id_regex: '_(?<id>\\d+).html',
      content: '#content',
      content_split: '　　',
    },
  },
  {
    name: '笔趣阁1',
    url: 'https://www.kuxiaoshuo.com/',
    encoding: 'gbk',
    novel_id_to_url: 'https://www.kuxiaoshuo.com/{##novelId##}/',
    url_to_novel_id: 'com\\/(?<id>.*?)\\/',
    search: {
      url: 'https://www.kuxiaoshuo.com/modules/article/search.php?searchkey={##searchName##}',
      li: '#hotcontent > table > tbody > tr',
      novelId: 'td:nth-child(1) > a',
      authorName: 'td:nth-child(3)',
      latestChapterId: 'td:nth-child(2) > a',
      latestChapterIdRegex: '\\/(?<id>\\d+).html',
      updateTime: 'td:nth-child(5)',
      novelIdRegex: 'com\\/(?<id>.*?)\\/',
    },
    novel: {
      directory: {
        url: 'https://www.kuxiaoshuo.com/{##novel_id##}/',
        chapter_id: '#list > dl > dd > a',
        chapter_id_regex: '\\/(?<id>\\d+).html',
        slice_left: 9,
        slice_right: false,
      },
      info: {
        url: 'https://www.kuxiaoshuo.com/{##novel_id##}/',
        name: '#info > h1',
        author: '#info > p:nth-child(2)',
        last_update_time: '#info > p:nth-child(4)',
        latest_chapter_id: '#list > dl > dd:nth-child(2) > a',
        latest_chapter_id_regex: '\\/(?<id>\\d+).html',
      },
    },
    content: {
      url: 'https://www.kuxiaoshuo.com/{##novel_id##}/{##chapter_id##}.html',
      chapter_name: '#wrapper > div.content_read > div > div.bookname > h1',
      novel_name: '#wrapper > div.content_read > div > div.con_top > a:nth-child(4)',
      pre_chapter_id: '#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)',
      pre_chapter_id_regex: '\\/(?<id>\\d+).html',
      next_chapter_id: '#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(5)',
      next_chapter_id_regex: '\\/(?<id>\\d+).html',
      content: '#content',
      content_split: '　　',
    },
  },
  {
    encoding: 'utf-8',
    url: 'https://www.9txs.com/',
    name: '九桃小说',
    novel_id_to_url: 'https://www.9txs.com/book/{##novelId##}.html',
    url_to_novel_id: '\\/(?<id>\\w+)\\.html',
    search: {
      url: 'https://www.9txs.com/search.html?searchkey={##searchName##}',
      li: 'body > div.main > div > div.box.left.w_840 > ul > li',
      novelId: 'a.bookname',
      authorName: 'p:nth-child(4) > a.authorName',
      latestChapterId: 'a.chapter',
      latestChapterIdRegex: '\\/(?<id>\\w+)\\.html',
      updateTime: false,
      novelIdRegex: '\\/(?<id>\\w+)\\.html',
    },
    novel: {
      directory: {
        url: 'https://www.9txs.com/book/{##novel_id##}/',
        chapter_id: 'body > div.main > div > div:nth-child(2) > div.read > dl > dd > a',
        chapter_id_regex: '\\/(?<id>\\w+)\\.html',
        slice_left: 12,
        slice_right: false,
      },
      info: {
        url: 'https://www.9txs.com/book/{##novel_id##}.html',
        name: 'body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > h1',
        author:
          'body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > p:nth-child(3) > a:nth-child(1)',
        latest_chapter_id:
          'body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > p:nth-child(6) > a',
        last_update_time:
          'body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > p:nth-child(6) > span',
        latest_chapter_id_regex: '\\/(?<id>\\w+)\\.html',
      },
    },
    content: {
      url: 'https://www.9txs.com/book/{##novel_id##}/{##chapter_id##}.html',
      chapter_name: '#chapter > div.main > div > div.area > h1',
      novel_name: '#chapter > div.main > div > div.box > div > a:nth-child(5)',
      pre_chapter_id: '#chapter > div.main > div > div.area > div.page > a:nth-child(1)',
      pre_chapter_id_regex: '\\/(?<id>\\w+)\\.html',
      next_chapter_id: '#chapter > div.main > div > div.area > div.page > a:nth-child(3)',
      next_chapter_id_regex: '\\/(?<id>\\w+)\\.html',
      content: '#content > p',
      content_split: false,
    },
  },
];
