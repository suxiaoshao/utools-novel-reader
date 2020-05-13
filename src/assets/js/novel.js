function get_directory_and_info(type, nid, that) {
    switch (type) {
        case "1":
            get_meegoq_directory_and_info(nid, that);
            break;
        case "0":
            get_file_directory_and_info(nid, that)
            break;
    }
}

function get_meegoq_directory_and_info(nid, that) {

    // 获取章节信息
    window.getHtml(`https://www.meegoq.com/book${nid}.html`, "utf-8", str => {
        const cheerio = require("cheerio")
        const $ = cheerio.load(str, {decodeEntities: false});
        that.directory_list = []
        $("body > section > article > ul > li > a").each((index, value) => {
            const $value = $(value)
            const name = $value.text()
            let cid = $value.attr("href")
            cid = cid.match(/_(?<id>\d+).html/).groups["id"];
            that.directory_list.push({
                name: name,
                cid: cid
            })
        })
        if (that.directory_list.length > 9) {
            that.directory_list = that.directory_list.splice(9);
        }
        that.directory_loading = false;
    })

    //获取小说信息
    window.getHtml(`https://www.meegoq.com/info${nid}.html`, "utf-8", str => {
        const cheerio = require("cheerio")
        const $ = cheerio.load(str, {decodeEntities: false});
        that.name = $("body > section > div.left > article.info > header > h1").text()
        that.author = $("body > section > div.left > article.info > p.detail.pt20 > i:nth-child(1) > a").text()
        that.last_update_time = $("body > section > div.left > article.info > p:nth-child(4) > i").text()
        const last = $("body > section > div.left > article.info > p:nth-child(5) > i > a")
        that.latest_chapter = last.text()
        that.last_cid = last.attr("href")
        that.last_cid = that.last_cid.match(/_(?<id>\d+).html/).groups['id'];
        that.info_loading = false;
    })
}

function get_file_directory_and_info(nid, that) {
    const result = window.utools.db.get(nid)
    that.name = result.name;
    that.author = result.author;
    that.last_update_time = "未知";
    that.latest_chapter = result.directory_list[result.directory_list.length - 1].name;
    that.last_cid = result.directory_list[result.directory_list.length - 1].cid;
    that.directory_list = result.directory_list;
    that.whether_collection = true;
    that.directory_loading = false;
    that.info_loading = false;
}

export default {
    get_directory_and_info
}