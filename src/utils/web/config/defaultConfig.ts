import { TotalConfig } from './totalConfig';

export const defaultConfigs: TotalConfig[] = [
  {
    name: '笔趣阁1',
    mainPageUrl: 'https://www.biqubao.com/',
    encoding: 'utf8',
    url: {
      search: 'https://www.biqubao.com/search.php?q={##searchName##}',
      novelInfo: 'https://www.kuxiaoshuo.com/{##novelId##}/',
      directory: 'https://www.kuxiaoshuo.com/{##novelId##}/',
      chapter: 'https://www.kuxiaoshuo.com/{##novelId##}/{##chapterId##}.html',
      searchPlaceholder: '{##searchName##}',
      novelPlaceholder: '{##novelId##}',
      chapterPlaceholder: '{##chapterId##}',
    },
    regex: {
      novel: 'book\\/(?<id>.*?)\\/',
      novelIdPlaceholder: 'id',
      chapterIdPlaceholder: 'id',
      chapter: '\\/(?<id>\\d+).html',
    },
    search: {
      li: 'body > div.result-list > div',
      novelId: 'div.result-game-item-detail > h3 > a',
      authorName: 'div.result-game-item-detail > div > p:nth-child(1) > span:nth-child(2)',
      latestChapterId: 'div.result-game-item-detail > div > p:nth-child(4) > a',
      updateTime: 'div.result-game-item-detail > div > p:nth-child(3) > span:nth-child(2)',
      image: 'div.result-game-item-pic > a > img',
      desc: 'div.result-game-item-detail > p',
      label: 'div.result-game-item-detail > div > p:nth-child(2) > span:nth-child(2)',
    },
    novel: {
      directory: {
        chapterId: '#list > dl > dd > a',
      },
      info: {
        name: '#info > h1',
        author: '#info > p:nth-child(2)',
        lastUpdateTime: '#info > p:nth-child(4)',
        latestChapterId: '#info > p:nth-child(5) > a',
      },
    },
    content: {
      chapterName: '#wrapper > div.content_read > div > div.bookname > h1',
      novelName: '#wrapper > div.footer > div.footer_cont > p:nth-child(1) > a',
      preChapterId: '#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(1)',
      nextChapterId: '#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)',
      content: '#content',
      contentSplit: '　　',
    },
  },
];
