function search(type, search_name, that) {
    switch (type) {
        case "1":
            meegoq_search(search_name, that);
            break;
        case "0":
            break;
    }
}

function meegoq_search(search_name, that) {
    that.loading = true;
    that.search_list = [];
    window.getHtml("https://www.meegoq.com/search.htm?keyword=" + encodeURI(search_name), "utf-8", str => {
        that.loading = false;
        const cheerio = require("cheerio")
        const $ = cheerio.load(str, {decodeEntities: false});
        $("body > section > div.left > section > ul > li").each((index, value) => {
            const $value = $.load($.html(value), {decodeEntities: false})
            const name = $value("span.n2 > a").text()
            let novel_id = $value("span.n2 > a").attr("href")
            const author = $value("span.a2 > a").text()
            const latest_chapter_name = $value("span.c2 > a").text()
            let latest_chapter_id = $value("span.c2 > a").attr("href");
            const update_time = $value("span.t").text()
            if (novel_id !== undefined) {
                novel_id = novel_id.match(/info(?<id>\d+)\.html/).groups["id"];
                latest_chapter_id = latest_chapter_id.match(/_(?<id>\d+).html/).groups["id"];
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