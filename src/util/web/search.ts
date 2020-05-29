import config, {getIdFromHref} from "./config"
import {SearchData} from "@/util/interface";
import cheerio from "cheerio"


function search(type: string, search_name: string, that: SearchData) {
    if (type !== "0") {
        meegoq_search(search_name, that, type)
    }
}

function meegoq_search(search_name: string, that: SearchData, type: string) {
    that.loading = true;
    that.search_list = [];

    const url = config[type].search.url.replace("{##search_name##}", search_name)
    const encoding = config[type].encoding
    window.getHtml(url, encoding, str => {
        const {
            li,
            novel_id: novel_id_selector,
            author: author_selector,
            latest_chapter_id: latest_chapter_id_selector,
            update_time: update_time_selector,
            novel_id_regex,
            latest_chapter_id_regex
        } = config[type]["search"]
        that.loading = false;
        const $ = cheerio.load(str, {decodeEntities: false});
        $(li).each((index: number, value: CheerioElement) => {
            const $value = cheerio.load($.html(value), {decodeEntities: false, xmlMode: true})
            const name: string = $value(novel_id_selector).text()
            const author: string = $value(author_selector).text()
            const latest_chapter_name: string = $value(latest_chapter_id_selector).text()
            const update_time: string = $value(update_time_selector).text()
            let novel_id: string | null = getIdFromHref($value, novel_id_selector, novel_id_regex)
            let latest_chapter_id: string | null = getIdFromHref($value, latest_chapter_id_selector, latest_chapter_id_regex)
            if (novel_id !== null && latest_chapter_id !== null) {
                that.search_list.push({
                    name: name,
                    novel_id: novel_id,
                    author: author,
                    latest_chapter_name: latest_chapter_name,
                    latest_chapter_id: latest_chapter_id,
                    update_time: update_time
                })
            }
        })
    })
}

export default {
    search
}
