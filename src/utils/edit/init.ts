import 'monaco-editor/esm/vs/editor/editor.main';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker&inline';
import monankai from './monankai';
import { editor, languages, Uri } from 'monaco-editor';
import { JSONSchema4 } from 'json-schema';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
self.MonacoEnvironment = {
  getWorker() {
    return new JsonWorker();
  },
};
editor.defineTheme('monankai', monankai);

const schema: JSONSchema4 = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    mainPageUrl: {
      type: 'string',
      title: '主页链接',
      description: '小说源主页的链接,用于区分每个源的配置',
    },
    name: {
      type: 'string',
      title: '小说源名',
      description: '用于在搜索页面区分多个源',
    },
    search: {
      title: '搜索部分的配置',
      description: '搜索结果页面的爬取规则',
      type: 'object',
      properties: {
        li: {
          type: 'string',
          title: '每项搜索结果',
          description: '内容是 css 选择器,其他详细信息都应该包含在这其中',
        },
        novelId: {
          type: 'string',
          title: '小说链接的 a 标签',
          description: '注意: 需截取 `li` 选择器之后的 css 选择器',
        },
        authorName: {
          type: 'string',
          title: '包含作者名的元素',
          description: '注意: 需截取 `li` 选择器之后的 css 选择器,可以为空字符串',
        },
        latestChapterId: {
          type: 'string',
          title: '最后章节链接的 a 标签',
          description: '注意: 需截取 `li` 选择器之后的 css 选择器',
        },
        updateTime: {
          type: 'string',
          title: '包含最后更新时间的元素',
          description: '注意: 需截取 `li` 选择器之后的 css 选择器,可以为空字符串',
        },
        image: {
          type: 'string',
          title: '小说图片的 img 标签',
          description: '注意: 需截取 `li` 选择器之后的 css 选择器,可以为空字符串',
        },
        label: {
          type: 'string',
          title: '包含小说类型的元素',
          description: '注意: 需截取 `li` 选择器之后的 css 选择器,可以为空字符串',
        },
        desc: {
          type: 'string',
          title: '包含小说描述的元素',
          description: '注意: 需截取 `li` 选择器之后的 css 选择器,可以为空字符串',
        },
        encoding: {
          type: 'string',
          title: '这个页面的字符集',
        },
      },
      required: ['li', 'novelId', 'authorName', 'latestChapterId', 'updateTime', 'image', 'label', 'desc', 'encoding'],
    },
    novel: {
      type: 'object',
      title: '小说页面的爬取结果',
      properties: {
        info: {
          type: 'object',
          title: '小说信息页面的爬取结果',
          properties: {
            name: {
              type: 'string',
              title: '包含小说名的元素',
              description: '可以为空字符串',
            },
            author: {
              type: 'string',
              title: '包含作者名的元素',
              description: '可以为空字符串',
            },
            lastUpdateTime: {
              type: 'string',
              title: '包含最后更新时间的元素',
              description: '可以为空字符串',
            },
            latestChapterId: {
              type: 'string',
              title: '最新章节的 a 标签',
            },
            encoding: {
              type: 'string',
              title: 'html 页面的字符集',
            },
            image: {
              type: 'string',
              title: '小说图片的 ima 标签',
              description: '可以为空字符串',
            },
            desc: {
              type: 'string',
              title: '包含小说描述的元素',
              description: '可以为空字符串',
            },
          },
          required: ['name', 'author', 'lastUpdateTime', 'latestChapterId', 'encoding', 'image', 'desc'],
        },
        directory: {
          type: 'object',
          title: '章节页的配置',
          properties: {
            chapterId: {
              type: 'string',
              title: '包含小说章节的 a 标签',
            },
            encoding: {
              type: 'string',
              title: '页面字符集',
            },
          },
          required: ['chapterId', 'encoding'],
        },
      },
      required: ['info', 'directory'],
    },
    url: {
      type: 'object',
      title: '链接的配置',
      description: '用于配置各个页面的链接',
      properties: {
        search: {
          type: 'string',
          title: '小说搜索的链接',
          description: '需包含 `searchPlaceholder` 的占位符,实际搜索的时候会把占位符替换成实际搜索内容',
        },
        novelInfo: {
          type: 'string',
          title: '小说页面的链接',
          description: '需包含 `novelPlaceholder` 的占位符,实际访问小说的时候会把占位符替换成实际 `novelId`',
        },
        directory: {
          type: 'string',
          title: '目录页面的链接',
          description: '需包含 `novelPlaceholder` 的占位符,实际访问小说的时候会把占位符替换成实际 `novelId`',
        },
        chapter: {
          type: 'string',
          title: '小说章节的链接',
          description:
            '需包含 `novelPlaceholder`和`chapterPlaceholder` 的占位符,实际访问小说的时候会把占位符替换成实际 `novelId`和`chapterId`',
        },
        searchPlaceholder: {
          type: 'string',
          title: '搜索关键字占位符',
        },
        novelPlaceholder: {
          type: 'string',
          title: '小说 id 的占位符',
        },
        chapterPlaceholder: {
          type: 'string',
          title: '章节 id 的占位符',
        },
      },
      required: [
        'search',
        'novelInfo',
        'directory',
        'chapter',
        'searchPlaceholder',
        'novelPlaceholder',
        'chapterPlaceholder',
      ],
    },
    content: {
      type: 'object',
      title: '章节页面的配置',
      properties: {
        encoding: {
          title: '页面字符集',
          type: 'string',
        },
        chapterName: {
          type: 'string',
          title: '包含章节名的元素',
        },
        novelName: {
          type: 'string',
          title: '包含小说名的元素',
        },
        preChapterId: {
          type: 'string',
          title: '上一章的 a 标签',
        },
        nextChapterId: {
          type: 'string',
          title: '下一章的 a 标签',
        },
        content: {
          type: 'string',
          title: '章节内容',
          description:
            '若章节 css 选择器获取的章节内容是一整段文字,则以 `contentSplit` 的内容分隔开,若获取的内容自己就分了段落, `contentSplit` 就为 null',
        },
        contentSplit: {
          type: ['string', 'null'],
          title: '分割章节内容的字符串',
          description: '可以为 null',
        },
      },
      required: ['encoding', 'chapterName', 'novelName', 'preChapterId', 'nextChapterId', 'content', 'contentSplit'],
    },
    regex: {
      type: 'object',
      title: '用于从链接中解析数据的正则',
      description: '是 js 形式的正则,可通过 js new RegExp()接口查看是否正常',
      properties: {
        novel: {
          type: 'string',
          title: '从小说链接获取小说 id 的正则表达式',
          description:
            '需包含 `novelIdPlaceholder` 的分组 id ,形如 `book\\\\/(?<id>.*?)\\\\/`(假设 novelIdPlaceholder 为`id`)',
        },
        novelIdPlaceholder: {
          type: 'string',
          title: '小说 id 的分组占位符',
        },
        chapterIdPlaceholder: {
          type: 'string',
          title: '章节 id 的分组占位符',
        },
        chapter: {
          type: 'string',
          title: '从章节链接获取章节 id 的正则表达式',
          description:
            '需包含 `chapterIdPlaceholder` 的分组 id ,形如 `\\\\/(?<id>\\\\d+).html`(假设 chapterIdPlaceholder 为`id`)',
        },
      },
      required: ['novel', 'novelIdPlaceholder', 'chapterIdPlaceholder', 'chapter'],
    },
  },
  required: ['mainPageUrl', 'name', 'search', 'novel', 'url', 'content', 'regex'],
};
export const modelUri = Uri.parse('a://b/foo.json');

export const schemas = [
  {
    uri: 'https://myserver/foo-schema.json',
    fileMatch: [modelUri.toString()],
    schema,
  },
];
export const model = editor.createModel('', 'json', modelUri);
languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas,
  schemaValidation: 'error',
  allowComments: true,
  enableSchemaRequest: true,
  schemaRequest: 'error',
  trailingCommas: 'error',
  comments: 'error',
});
