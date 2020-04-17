function search(type, search_name, that) {
    switch (type) {
        case "1":
            meegoq_search(search_name,that);
            break;
        case "0":
            break;
    }
}

function meegoq_search(search_name, that) {
    that.loading = true;
    that.search_list = [];
    that.axios.get("https://www.meegoq.com/search.htm?keyword=" + encodeURI(search_name)).then(response => {
        that.loading = false;
        const doc = new that.xmldom.DOMParser().parseFromString(response.data);
        const nodes = that.xpath.select("/html/body/section/div[1]/section/ul/li", doc);
        nodes.slice(1).forEach(value => {
            try {
                const item_doc = new that.xmldom.DOMParser().parseFromString(value.toString());
                let name = that.xpath.select("/li/span[2]/a/text()", item_doc);
                if (name.length !== 1) {
                    name = '';
                } else {
                    name = name[0].toString();
                }
                let novel_id = that.xpath.select1("/li/span[2]/a/@href", item_doc).value;
                novel_id = novel_id.match(/info(?<id>\d+)\.html/).groups["id"];
                let author = that.xpath.select("/li/span[4]/a/text()", item_doc);
                if (author.length !== 1) {
                    author = ''
                } else {
                    author = author[0].nodeValue;
                }
                let latest_chapter_name = that.xpath.select("/li/span[3]/a/text()", item_doc);
                if (latest_chapter_name.length !== 1) {
                    latest_chapter_name = ''
                } else {
                    latest_chapter_name = latest_chapter_name[0].toString();
                }
                let latest_chapter_id;
                try {
                    latest_chapter_id = that.xpath.select1("/li/span[3]/a/@href", item_doc).value;
                    latest_chapter_id = latest_chapter_id.match(/_(?<id>\d+).html/).groups["id"];
                } catch (e) {
                    latest_chapter_id = '';
                }
                let update_time = that.xpath.select("/li/span[5]/text()", item_doc);
                if (update_time.length !== 1) {
                    update_time = ''
                } else {
                    update_time = update_time[0].toString()
                }
                that.search_list.push({
                    name: name,
                    novel_id: novel_id,
                    author: author,
                    latest_chapter_name: latest_chapter_name,
                    latest_chapter_id: latest_chapter_id,
                    update_time: update_time
                });
            } catch (e) {
                console.log("出错一次")
            }
        });
    }).catch(error => {
        that.loading = false;
        console.log(error)
    });
}
export default {
    search
}