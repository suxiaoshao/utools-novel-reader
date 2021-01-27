import config, {getHtml, getIdFromHref} from "./config"
import {SearchListItem} from "@/util/interface";
import * as cheerio from "cheerio"


export async function search(type: string, search_name: string): Promise<SearchListItem[]> {
    let searchList: SearchListItem[] = []
    const url = config[type].search.url.replace("{##search_name##}", search_name)
    const encoding = config[type].encoding
    const htmlString = await getHtml(url, encoding)
    const {
        li,
        novel_id: novel_id_selector,
        author: author_selector,
        latest_chapter_id: latest_chapter_id_selector,
        update_time: update_time_selector,
        novel_id_regex,
        latest_chapter_id_regex
    } = config[type]["search"]
    const $ = cheerio.load(htmlString, {decodeEntities: false});
    $(li).each((index: number, value: CheerioElement) => {
        const $value = cheerio.load($.html(value), {decodeEntities: false, xmlMode: true})
        const name: string = $value(novel_id_selector).text()
        const author: string = $value(author_selector).text()
        const latest_chapter_name: string = $value(latest_chapter_id_selector).text()

        //获取更新时间如果没有，返回"源网站不显示更新时间"
        let update_time: string
        if (update_time_selector === false) {
            update_time = "源网站不显示更新时间"
        } else {
            update_time = $value(update_time_selector).text()
        }
        let novel_id: string | null = getIdFromHref($value, novel_id_selector, novel_id_regex)
        let latest_chapter_id: string | null = getIdFromHref($value, latest_chapter_id_selector, latest_chapter_id_regex)
        if (novel_id !== null && latest_chapter_id !== null) {
            searchList.push({
                name: name,
                novel_id: novel_id,
                author: author,
                latest_chapter_name: latest_chapter_name,
                latest_chapter_id: latest_chapter_id,
                update_time: update_time
            })
        }
    })
    return searchList
}

export default {
    search
}
