import config from "./config.json"

function search(type, search_name, that) {
    if (type !== "0") {
        meegoq_search(search_name, that, type)
    }
}

function meegoq_search(search_name, that, type) {
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
        const cheerio = require("cheerio")
        const $ = cheerio.load(str, {decodeEntities: false});
        $(li).each((index, value) => {
            const $value = $.load($.html(value), {decodeEntities: false,xmlMode: true})
            const name = $value(novel_id_selector).text()
            let novel_id = $value(novel_id_selector).attr("href")
            const author = $value(author_selector).text()
            const latest_chapter_name = $value(latest_chapter_id_selector).text()
            let latest_chapter_id = $value(latest_chapter_id_selector).attr("href");
            const update_time = $value(update_time_selector).text()
            if (novel_id !== undefined) {
                novel_id = novel_id.match(RegExp(novel_id_regex)).groups["id"];
                latest_chapter_id = latest_chapter_id.match(RegExp(latest_chapter_id_regex)).groups["id"];
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
