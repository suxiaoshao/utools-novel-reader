import {getOneNovelData} from "../db";
import config, {getHtml, getIdFromHref} from "./config"
import {Message} from "element-ui";
import {Chapter, FileNovelItem} from "@/util/interface";
import * as cheerio from "cheerio"

interface NovelWebData {
    name: string
    author: string
    last_update_time: string
    latest_chapter: string
    last_cid: string
    directory_list: Chapter[]
}

export async function getDirectoryAndInfo(type: string, nid: string):Promise<NovelWebData> {
    let data: NovelWebData
    if (type === "0") {
        data=get_file_directory_and_info(nid, type)
    } else {
        data=await get_meegoq_directory_and_info(nid, type);
    }
    return data
}

async function get_meegoq_directory_and_info(nid: string, type: string): Promise<NovelWebData> {
    const encoding: string = config[type].encoding

    // 获取章节信息
    const directoryUrl: string = config[type]["novel"].directory.url.replace("{##novel_id##}", nid)
    const direString = await getHtml(directoryUrl, encoding)

    //具体操作
    const {chapter_id, chapter_id_regex, slice_left, slice_right} = config[type]["novel"].directory
    const dire$ = cheerio.load(direString, {decodeEntities: false});
    let directory_list: Chapter[] = []
    dire$(chapter_id).each((index: number, value: CheerioElement) => {
        const $value = dire$(value)
        const name = $value.text()
        const href = $value.attr("href")

        // 获取目录
        if (href !== undefined) {
            const re = href.match(chapter_id_regex)
            if (re !== null) {
                const cid = re.groups === undefined ? null : re.groups['id']
                if (cid !== null) {
                    directory_list.push({
                        name: name,
                        cid: cid
                    })
                }
            }
        }
    })
    const left = slice_left === false ? 0 : slice_left
    const right = slice_right === false ? directory_list.length : slice_right
    directory_list = directory_list.splice(left, right);


    //获取小说信息
    const infoUrl = config[type]['novel'].info.url.replace("{##novel_id##}", nid)
    const infoString = await getHtml(infoUrl, encoding)
    const {name, author, last_update_time, latest_chapter_id, latest_chapter_id_regex} = config[type]["novel"].info
    const info$ = cheerio.load(infoString, {decodeEntities: false, xmlMode: true});
    const novelName = info$(name).text()
    const authorName = info$(author).text()
    const lastUpdateTime = info$(last_update_time).text()
    const latestChapter = info$(latest_chapter_id).text()
    let last_cid = getIdFromHref(info$, latest_chapter_id, latest_chapter_id_regex)
    if (last_cid === null) {
        last_cid=""
        Message({
            showClose: true,
            message: '网站解析发生错误',
            type: 'error'
        })
    }
    return {
        name:novelName,
        author:authorName,
        last_update_time:lastUpdateTime,
        latest_chapter:latestChapter,
        last_cid:last_cid,
        directory_list:directory_list
    }

}

function get_file_directory_and_info(nid: string, type: string): NovelWebData {
    const result = getOneNovelData(nid, type) as FileNovelItem
    return {
        name: result.name,
        author: result.author,
        last_update_time: "未知",
        latest_chapter: result.directory_list[result.directory_list.length - 1].name,
        last_cid: String(result.directory_list[result.directory_list.length - 1].cid),
        directory_list: result.directory_list
    }
}
