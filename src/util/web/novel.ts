import {getOneNovelData} from "../db";
import config, {getIdFromHref} from "./config"
import {Message} from "element-ui";
import {FileNovelItem, NovelData} from "@/util/interface";
import * as cheerio from "cheerio"

function get_directory_and_info(type: string, nid: string, that: NovelData) {
    if (type === "0") {
        get_file_directory_and_info(nid, that, type)
    } else {
        get_meegoq_directory_and_info(nid, that, type);
    }
}

function get_meegoq_directory_and_info(nid: string, that: NovelData, type: string) {
    that.info_loading = true;
    that.directory_loading = true;

    // 获取章节信息
    const directoryUrl: string = config[type]["novel"].directory.url.replace("{##novel_id##}", nid)
    const encoding: string = config[type].encoding
    window.getHtml(directoryUrl, encoding, str => {
        const {chapter_id, chapter_id_regex, slice_left, slice_right} = config[type]["novel"].directory
        const $ = cheerio.load(str, {decodeEntities: false});
        that.directory_list = []
        $(chapter_id).each((index: number, value: CheerioElement) => {
            const $value = $(value)
            const name = $value.text()
            const href = $value.attr("href")

            // 获取目录
            if (href !== undefined) {
                const re = href.match(chapter_id_regex)
                if (re !== null) {
                    const cid = re.groups === undefined ? null : re.groups['id']
                    if (cid !== null) {
                        that.directory_list.push({
                            name: name,
                            cid: cid
                        })
                    }
                }
            }
        })
        const left = slice_left === false ? 0 : slice_left
        const right = slice_right === false ? that.directory_list.length : slice_right
        that.directory_list = that.directory_list.splice(left, right);
        that.directory_loading = false;
    })

    //获取小说信息
    const infoUrl = config[type]['novel'].info.url.replace("{##novel_id##}", nid)
    window.getHtml(infoUrl, encoding, str => {
        const {name, author, last_update_time, latest_chapter_id, latest_chapter_id_regex} = config[type]["novel"].info
        const $ = cheerio.load(str, {decodeEntities: false, xmlMode: true});
        that.name = $(name).text()
        that.author = $(author).text()
        that.last_update_time = $(last_update_time).text()
        that.latest_chapter = $(latest_chapter_id).text()
        const last_cid = getIdFromHref($,latest_chapter_id,latest_chapter_id_regex)
        if (last_cid !== null) {
            that.last_cid = last_cid
        } else {
            Message({
                showClose: true,
                message: '网站解析发生错误',
                type: 'error'
            })
        }
        that.info_loading = false;
    })
}

function get_file_directory_and_info(nid: string, that: NovelData, type: string) {
    const result = getOneNovelData(nid, type) as FileNovelItem
    that.name = result.name;
    that.author = result.author;
    that.last_update_time = "未知";
    that.latest_chapter = result.directory_list[result.directory_list.length - 1].name;
    that.last_cid = String(result.directory_list[result.directory_list.length - 1].cid);
    that.directory_list = result.directory_list;
    that.whether_collection = true;
    that.directory_loading = false;
    that.info_loading = false;
}

export default {
    get_directory_and_info
}
