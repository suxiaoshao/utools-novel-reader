import {getOneNovelData} from "../db";
import config, {getHtml, getIdFromHref} from "./config"
import {FileNovelItem} from "@/util/interface";
import * as cheerio from "cheerio"

interface ContentWebData {
    novel_name: string
    chapter_name: string
    content_list: string[]
    pre_cid: string | null
    next_cid: string | null
}

export async function getContent(type: string, nid: string, cid: string,): Promise<ContentWebData> {
    let data: ContentWebData
    if (type === "0") {
        data = get_file_content(nid, cid, type)
    } else {
        data = await get_meegoq_content(nid, cid, type);
    }
    return data
}

async function get_meegoq_content(nid: string, cid: string, type: string): Promise<ContentWebData> {
    //网页url
    const url = config[type].content.url.replace("{##novel_id##}", nid).replace("{##chapter_id##}", cid)
    //网页编码方式
    const encoding = config[type].encoding
    //配置信息
    const {chapter_name, content, content_split, next_chapter_id, next_chapter_id_regex, novel_name, pre_chapter_id, pre_chapter_id_regex} = config[type].content
    const htmlString = await getHtml(url, encoding)
    const $ = cheerio.load(htmlString, {decodeEntities: false, xmlMode: true});

    const chapterName: string = $(chapter_name).text()
    const novelName = $(novel_name).text()
    const content_list: string[] = []

    //获取pre_cid和next_cid
    const pre_cid = getIdFromHref($, pre_chapter_id, pre_chapter_id_regex)
    const next_cid = getIdFromHref($, next_chapter_id, next_chapter_id_regex)
    if (content_split !== false) {
        $(content).text().split(content_split).forEach((item: string) => {
            if (item !== "") {
                content_list.push(item)
            }
        })
    } else {
        $(content).each(((index, element) => {
            content_list.push($(element).text())
        }))
    }
    return {
        chapter_name: chapterName,
        content_list: content_list,
        pre_cid: pre_cid,
        next_cid: next_cid,
        novel_name: novelName
    }
}

function get_file_content(nid: string, cid: string, type: string): ContentWebData {
    let result = getOneNovelData(nid, type) as FileNovelItem
    const novel_name = result.name;
    const chapter_name = result.directory_list[Number(cid)].name;
    //如果是用正则区分
    let content
    if (result.is_regex) {
        const re = RegExp(result.regex, "g")
        content = result.content.split(re)[Number(cid) + 1]
    }
    //不用正则
    else {
        content = result.content.slice(Number(cid) * Number(result.split_num), (Number(cid) + 1) * Number(result.split_num))
    }

    //获取内容数组
    const content_list: string[] = content.split(/\r\n|\n/).filter((value: string) => {
        return value !== ''
    }).map((value: string) => {
        if (!/^( +|　+).*$/.test(String(value))) {
            return value
        } else {
            return value.replace(/ +/, "")
        }
    })
    const pre_cid = Number(cid) - 1 >= 0 ? String(Number(cid) - 1) : null
    let next_cid: string | null
    if (result.directory_list.length === Number(cid) + 1) {
        next_cid = null;
    } else {
        next_cid = String(Number(cid) + 1)
    }
    return {
        pre_cid: pre_cid,
        novel_name: novel_name,
        chapter_name: chapter_name,
        content_list: content_list,
        next_cid: next_cid
    }
}

export default {
    get_content: getContent
}
