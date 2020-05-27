import db from "../db";
import config from "./config"

function get_content(type:string, nid:string, cid:string, that:any) {
    if (type === "0") {
        get_file_content(nid, cid, that)
    } else {
        get_meegoq_content(nid, cid, that, type);
    }
}
function get_meegoq_content(nid:string, cid:string, that:any, type:string) {
    that.loading = true;
    //网页url
    const url = config[type].content.url.replace("{##novel_id##}", nid).replace("{##chapter_id##}", cid)
    //网页编码方式
    const encoding = config[type].encoding
    //配置信息
    const {chapter_name, content, content_split, next_chapter_id, next_chapter_id_regex, novel_name, pre_chapter_id, pre_chapter_id_regex} = config[type].content
    window.getHtml(url, encoding, str => {
        const cheerio = require("cheerio")
        const $ = cheerio.load(str, {decodeEntities: false});
        that.chapter_name = $(chapter_name).text()
        that.novel_name = $(novel_name).text()
        that.content_list = []
        that.pre_cid = $(pre_chapter_id).attr("href").match(RegExp(pre_chapter_id_regex));
        if (that.pre_cid === null) {
            that.pre_cid = null
        } else {
            that.pre_cid = that.pre_cid.groups['id']
        }
        that.next_cid = $(next_chapter_id).attr("href").match(RegExp(next_chapter_id_regex));
        if (that.next_cid === null) {
            that.next_cid = null
        } else {
            that.next_cid = that.next_cid.groups['id']
        }
        $(content).text().split(content_split).forEach((item: string) => {
            if (item !== "") {
                that.content_list.push(item)
            }
        })
        that.update_reading_section();
        that.loading = false
    })
}

function get_file_content(nid:string, cid:string, that:any) {
    let result = db.getOneNovelData(nid, that.type)
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
    that.pre_cid = Number(cid) - 1
    if (result.directory_list.length === Number(cid) + 1) {
        that.next_cid = null;
    } else {
        that.next_cid = Number(cid) + 1
    }
    that.update_reading_section();
}

export default {
    get_content
}
