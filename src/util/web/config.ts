import axios from "axios"
import iconv from "iconv-lite"
import {Buffer} from "buffer";

export async function getHtml(url: string, encoding: string): Promise<string> {
  const response = await axios.get<ArrayBuffer>(url, {
    responseType: "arraybuffer"
  })
  const htmlBuf = response.data
  return iconv.decode(Buffer.from(htmlBuf), encoding)
}

interface Search {
  url: string,
  li: string,
  novel_id: string,
  author: string,
  latest_chapter_id: string,
  latest_chapter_id_regex: string,
  update_time: string | false,
  novel_id_regex: string
}

interface Directory {
  url: string,
  chapter_id: string,
  chapter_id_regex: string,
  slice_left: number | false,
  slice_right: number | false
}

interface Info {
  url: string,
  name: string,
  author: string,
  last_update_time: string,
  latest_chapter_id: string,
  latest_chapter_id_regex: string
}

interface Novel {
  directory: Directory,
  info: Info
}

interface Content {
  url: string,
  chapter_name: string,
  novel_name: string,
  pre_chapter_id: string,
  pre_chapter_id_regex: string,
  next_chapter_id: string,
  next_chapter_id_regex: string,
  content: string,
  content_split: string | false
}

export interface Config {
  encoding: string,
  url: string,
  name: string,
  novel_id_to_url: string,
  url_to_novel_id: string,
  search: Search,
  novel: Novel,
  content: Content
}

export interface Configs {
  [propName: string]: Config
}

//根据selector和regexString获取id，如果找不到返回null，找到了返回结果:string
export function getIdFromHref($: CheerioStatic, selector: string, regexString: string): null | string {
  const href = $(selector).attr("href")
  if (href === undefined) {
    return null
  }
  const re = href.match(regexString)
  if (re === null) {
    return null
  }
  return re.groups === undefined ? null : re.groups['id']
}

const config: Configs = {
  "1": {
    "encoding": "utf-8",
    "url": "https://www.meegoq.com",
    "name": "米趣小说网",
    "novel_id_to_url": "https://www.meegoq.com/info{##novel_id##}.html",
    "url_to_novel_id": "info(?<id>\\d+)\\.html",
    "search": {
      "url": "https://www.meegoq.com/search.htm?keyword={##search_name##}",
      "li": "body > section > div.left > section > ul > li",
      "novel_id": "span.n2 > a",
      "author": "span.a2 > a",
      "latest_chapter_id": "span.c2 > a",
      "latest_chapter_id_regex": "_(?<id>\\d+).html",
      "update_time": "span.t",
      "novel_id_regex": "info(?<id>\\d+)\\.html"
    },
    "novel": {
      "directory": {
        "url": "https://www.meegoq.com/book{##novel_id##}.html",
        "chapter_id": "body > section > article > ul > li > a",
        "chapter_id_regex": "_(?<id>\\d+).html",
        "slice_left": 9,
        "slice_right": false
      },
      "info": {
        "url": "https://www.meegoq.com/info{##novel_id##}.html",
        "name": "body > section > div.left > article.info > header > h1",
        "author": "body > section > div.left > article.info > p.detail.pt20 > i:nth-child(1) > a",
        "last_update_time": "body > section > div.left > article.info > p:nth-child(4) > i",
        "latest_chapter_id": "body > section > div.left > article.info > p:nth-child(5) > i > a",
        "latest_chapter_id_regex": "_(?<id>\\d+).html"
      }
    },
    "content": {
      "url": "https://www.meegoq.com/book/{##novel_id##}_{##chapter_id##}.html",
      "chapter_name": "body > article > header > h1",
      "novel_name": "body > article > header > div > span:nth-child(1) > a",
      "pre_chapter_id": "body > article > div.operate > ul > li:nth-child(1) > a",
      "pre_chapter_id_regex": "_(?<id>\\d+).html",
      "next_chapter_id": "body > article > div.operate > ul > li.last > a",
      "next_chapter_id_regex": "_(?<id>\\d+).html",
      "content": "#content",
      "content_split": "　　"
    }
  },
  "2": {
    "name": "笔趣阁1",
    "url": "https://www.kuxiaoshuo.com/",
    "encoding": "gbk",
    "novel_id_to_url": "https://www.kuxiaoshuo.com/{##novel_id##}/",
    "url_to_novel_id": "com\\/(?<id>.*?)\\/",
    "search": {
      "url": "https://www.kuxiaoshuo.com/modules/article/search.php?searchkey={##search_name##}",
      "li": "#hotcontent > table > tbody > tr",
      "novel_id": "td:nth-child(1) > a",
      "author": "td:nth-child(3)",
      "latest_chapter_id": "td:nth-child(2) > a",
      "latest_chapter_id_regex": "\\/(?<id>\\d+).html",
      "update_time": "td:nth-child(5)",
      "novel_id_regex": "com\\/(?<id>.*?)\\/"
    },
    "novel": {
      "directory": {
        "url": "https://www.kuxiaoshuo.com/{##novel_id##}/",
        "chapter_id": "#list > dl > dd > a",
        "chapter_id_regex": "\\/(?<id>\\d+).html",
        "slice_left": 9,
        "slice_right": false
      },
      "info": {
        "url": "https://www.kuxiaoshuo.com/{##novel_id##}/",
        "name": "#info > h1",
        "author": "#info > p:nth-child(2)",
        "last_update_time": "#info > p:nth-child(4)",
        "latest_chapter_id": "#list > dl > dd:nth-child(2) > a",
        "latest_chapter_id_regex": "\\/(?<id>\\d+).html"
      }
    },
    "content": {
      "url": "https://www.kuxiaoshuo.com/{##novel_id##}/{##chapter_id##}.html",
      "chapter_name": "#wrapper > div.content_read > div > div.bookname > h1",
      "novel_name": "#wrapper > div.content_read > div > div.con_top > a:nth-child(4)",
      "pre_chapter_id": "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(3)",
      "pre_chapter_id_regex": "\\/(?<id>\\d+).html",
      "next_chapter_id": "#wrapper > div.content_read > div > div.bookname > div.bottem1 > a:nth-child(5)",
      "next_chapter_id_regex": "\\/(?<id>\\d+).html",
      "content": "#content",
      "content_split": "　　"
    }
  },
  "3": {
    encoding: "utf-8",
    url: "https://www.9txs.com/",
    name: "九桃小说",
    novel_id_to_url: "https://www.9txs.com/book/{##novel_id##}.html",
    url_to_novel_id: "\\/(?<id>\\w+)\\.html",
    search: {
      url: "https://www.9txs.com/search.html?searchkey={##search_name##}",
      li: "body > div.main > div > div.box.left.w_840 > ul > li",
      novel_id: "a.bookname",
      author: "p:nth-child(4) > a.author",
      latest_chapter_id: "a.chapter",
      latest_chapter_id_regex: "\\/(?<id>\\w+)\\.html",
      update_time: false,
      novel_id_regex: "\\/(?<id>\\w+)\\.html"
    },
    novel: {
      directory: {
        url: "https://www.9txs.com/book/{##novel_id##}/",
        chapter_id: "body > div.main > div > div:nth-child(2) > div.read > dl > dd > a",
        chapter_id_regex: "\\/(?<id>\\w+)\\.html",
        slice_left: 12,
        slice_right: false
      },
      info: {
        url: "https://www.9txs.com/book/{##novel_id##}.html",
        name: "body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > h1",
        author: "body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > p:nth-child(3) > a:nth-child(1)",
        latest_chapter_id: "body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > p:nth-child(6) > a",
        last_update_time: "body > div.main > div > div.left.w_860 > div:nth-child(1) > div.detail > p:nth-child(6) > span",
        latest_chapter_id_regex: "\\/(?<id>\\w+)\\.html",
      }
    },
    content: {
      url: "https://www.9txs.com/book/{##novel_id##}/{##chapter_id##}.html",
      chapter_name: "#chapter > div.main > div > div.area > h1",
      novel_name: "#chapter > div.main > div > div.box > div > a:nth-child(5)",
      pre_chapter_id: "#chapter > div.main > div > div.area > div.page > a:nth-child(1)",
      pre_chapter_id_regex: "\\/(?<id>\\w+)\\.html",
      next_chapter_id: "#chapter > div.main > div > div.area > div.page > a:nth-child(3)",
      next_chapter_id_regex: "\\/(?<id>\\w+)\\.html",
      content: "#content > p",
      content_split: false
    }
  }
}
export default config
