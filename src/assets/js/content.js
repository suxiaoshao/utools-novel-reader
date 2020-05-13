function get_content(type, nid, cid, that) {
    switch (type) {
        case "1":
            get_meegoq_content(nid, cid, that);
            break;
        case "0":
            get_file_content(nid, cid, that)
            break;
    }
}

function get_meegoq_content(nid, cid, that) {
    that.loading = true;
    window.getHtml(`https://www.meegoq.com/book/${nid}_${cid}.html`, "utf-8", str => {
        const cheerio = require("cheerio")
        const $ = cheerio.load(str, {decodeEntities: false});
        that.chapter_name = $("body > article > header > h1").text()
        that.novel_name = $("body > article > header > div > span:nth-child(1) > a").text()
        that.content_list = []
        that.pre_cid = $("body > article > div.operate > ul > li:nth-child(1) > a").attr("href").match(/_(?<id>\d+).html/);
        if (that.pre_cid === null) {
            that.pre_cid = -1
        } else {
            that.pre_cid = that.pre_cid.groups['id']
        }
        that.next_cid = $("body > article > div.operate > ul > li.last > a").attr("href").match(/_(?<id>\d+).html/);
        if (that.next_cid === null) {
            that.next_cid = -1
        } else {
            that.next_cid = that.next_cid.groups['id']
        }
        $("#content").text().split("　　").forEach(value => {
            if (value !== "") {
                that.content_list.push("　　" + value)
            }
        })
        that.update_reading_section();
        that.loading = false
    })
}

function get_file_content(nid, cid, that) {
    let result = window.utools.db.get(nid)
    if (result === null) {
        that.$notify({
            title: "错误",
            message: "没有此章节,三秒后将返回",
            duration: 0,
            type: "error"
        })
        window.setTimeout(() => {
            that.$router.go(-1)
        }, 3000)
    } else {
        that.novel_name = result.name;
        that.chapter_name = result.directory_list[Number(cid)].name;
        //如果是用正则区分
        let content
        if (result.is_regex) {
            const re = new RegExp(result.regex, "g")
            content = result.content.split(re)[Number(cid) + 1]
        }
        //不用正则
        else {
            content = result.content.slice(Number(cid) * Number(result.split_num), (Number(cid) + 1) * Number(result.split_num))
        }

        //获取内容数组
        that.content_list = content.split(/\r\n|\n/).filter(value => {
            return value !== ''
        }).map(value => {
            if (!/^( +|　+).*$/.test(String(value))) {
                return "　　" + value
            } else {
                return value.replace(/ +/, "　　")
            }
        })
        that.pre_cid = Number(cid) - 1
        if (result.directory_list.length === Number(cid) + 1) {
            that.next_cid = -1;
        } else {
            that.next_cid = Number(cid) + 1
        }
        that.update_reading_section();
    }
}

export default {
    get_content
}