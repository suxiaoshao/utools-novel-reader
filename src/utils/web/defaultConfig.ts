import { SearchConfig } from './search';
import { NovelInfoConfig } from './novelInfo';
import { ContentConfig } from './content';

export interface NovelConfig {
  encoding: string;
  url: string;
  name: string;
  novel_id_to_url: string;
  url_to_novel_id: string;
  search: SearchConfig;
  novel: NovelInfoConfig;
  content: ContentConfig;
}

export const defaultConfigs: NovelConfig[] = [
  {
    name: '笔趣阁1',
    url: 'https://www.biqubao.com/',
    encoding: 'utf8',
    novel_id_to_url: 'https://www.biqubao.com/book/{##novelId##}/',
    url_to_novel_id: 'com\\/(?<id>.*?)\\/',
    search: {
      url: 'https://www.biqubao.com/search.php?q={##searchName##}',
      li: 'body > div.result-list > div',
      novelId: 'div.result-game-item-detail > h3 > a',
      authorName: 'div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)',
      latestChapterId: 'div.result-game-item-detail > div > p:nth-child(4) > a',
      latestChapterIdRegex: '\\/(?<id>\\d+).html',
      updateTime: 'div.result-game-item-detail > div > p:nth-child(3) > span:nth-child(2)',
      novelIdRegex: 'book\\/(?<id>.*?)\\/',
    },
    novel: {
      directory: {
        url: 'https://www.kuxiaoshuo.com/{##novelId##}/',
        chapterId: '#list > dl > dd > a',
        chapterIdRegex: '\\/(?<id>\\d+).html',
      },
      info: {
        url: 'https://www.kuxiaoshuo.com/{##novelId##}/',
        name: '#info > h1',
        author: '#info > p:nth-child(2)',
        lastUpdateTime: '#info > p:nth-child(4)',
        latestChapterId: '#info > p:nth-child(5) > a',
        latestChapterIdRegex: '\\/(?<id>\\d+).html',
      },
    },
    content: {
      url: 'https://www.kuxiaoshuo.com/{##novelId##}/{##chapterId##}.html',
      chapterName: '#wrapper > div.content_read > div > div.bookname > h1',
      novelName: '#wrapper > div.footer > div.footer_cont > p:nth-child(1) > a',
      preChapterId: '#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(1)',
      preChapterIdRegex: '\\/(?<id>\\d+).html',
      nextChapterId: '#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)',
      nextChapterIdRegex: '\\/(?<id>\\d+).html',
      content: '#content',
      contentSplit: '　　',
    },
  },
];
