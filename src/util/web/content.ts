import {getOneNovelData} from "../db";
import config, {getIdFromHref} from "./config"
import {ContentData, FileNovelItem} from "@/util/interface";
import * as cheerio from "cheerio"
import {netLog} from "electron";

interface ContentDataExtend extends ContentData {

    update_reading_section(): void;
}

function get_content(type: string, nid: string, cid: string, that: ContentDataExtend) {
    if (type === "0") {
        get_file_content(nid, cid, that, type)
    } else {
        get_meegoq_content(nid, cid, that, type);
    }
}

function get_meegoq_content(nid: string, cid: string, that: ContentDataExtend, type: string) {
    that.loading = true;
    //网页url
    const url = config[type].content.url.replace("{##novel_id##}", nid).replace("{##chapter_id##}", cid)
    //网页编码方式
    const encoding = config[type].encoding
    //配置信息
    const {chapter_name, content, content_split, next_chapter_id, next_chapter_id_regex, novel_name, pre_chapter_id, pre_chapter_id_regex} = config[type].content
    window.getHtml(url, encoding, str => {
        const $ = cheerio.load(str, {decodeEntities: false, xmlMode: true});
        that.chapter_name = $(chapter_name).text()
        that.novel_name = $(novel_name).text()
        that.content_list = []

        //获取pre_cid和next_cid
        that.pre_cid = getIdFromHref($, pre_chapter_id, pre_chapter_id_regex)
        that.next_cid = getIdFromHref($, next_chapter_id, next_chapter_id_regex)
        if (content_split !== false) {
            $(content).text().split(content_split).forEach((item: string) => {
                if (item !== "") {
                    that.content_list.push(item)
                }
            })
        } else {
            $(content).each(((index, element) => {
                that.content_list.push($(element).text())
            }))
        }
        that.update_reading_section();
        that.loading = false
    })
}

function get_file_content(nid: string, cid: string, that: ContentDataExtend, type: string) {
    let result = getOneNovelData(nid, type) as FileNovelItem
    that.novel_name = result.name;
    that.chapter_name = result.directory_list[Number(cid)].name;
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
    that.content_list = content.split(/\r\n|\n/).filter((value: string) => {
        return value !== ''
    }).map((value: string) => {
        if (!/^( +|　+).*$/.test(String(value))) {
            return value
        } else {
            return value.replace(/ +/, "")
        }
    })
    that.pre_cid = Number(cid) - 1 >= 0 ? String(Number(cid) - 1) : null
    if (result.directory_list.length === Number(cid) + 1) {
        that.next_cid = null;
    } else {
        that.next_cid = String(Number(cid) + 1)
    }
    that.update_reading_section();
}

export default {
    get_content
}
