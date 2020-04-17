function get_directory_and_info(type, nid, that) {
    switch (type) {
        case "1":
            get_meegoq_directory_and_info(nid, that);
            break;
        case "0":
            break;
    }
}

function get_meegoq_directory_and_info(nid, that) {
    that.axios.get(`https://www.meegoq.com/book${nid}.html`).then(response => {
        const doc = new that.xmldom.DOMParser().parseFromString(response.data);
        const nodes = that.xpath.select("/html/body/section/article/ul/li/a", doc);
        that.directory_list = [];
        nodes.forEach(value => {
            try {
                const item_doc = new that.xmldom.DOMParser().parseFromString(value.toString());
                let name = that.xpath.select("/a/text()", item_doc);
                if (name.length !== 1) {
                    name = '';
                } else {
                    name = name[0].toString();
                }
                let cid;
                cid = that.xpath.select1("/a/@href", item_doc).value;
                cid = cid.match(/_(?<id>\d+).html/).groups["id"];
                that.directory_list.push({
                    name: name,
                    cid: cid
                })
            } catch (e) {
                console.log("错误一个")
            }
        });
        if (that.directory_list.length > 9) {
            that.directory_list = that.directory_list.splice(9);
        }
        that.directory_loading = false;
    }).catch(error => {
        that.directory_loading = false;
        console.log(error)
    });
    that.axios.get(`https://www.meegoq.com/info${nid}.html`).then(response => {
        const doc = new that.xmldom.DOMParser().parseFromString(response.data);
        try {
            that.name = that.xpath.select("/html/body/section/div[1]/article[1]/header/h1/text()", doc)[0].toString();
            that.author = that.xpath.select("/html/body/section/div[1]/article[1]/p[1]/i[1]/a/text()", doc)[0].toString();
            that.last_update_time = that.xpath.select("/html/body/section/div[1]/article[1]/p[2]/i/text()", doc)[0].toString();
            that.latest_chapter = that.xpath.select("/html/body/section/div[1]/article[1]/p[3]/i/a/text()", doc)[0].toString();
            that.last_cid = that.xpath.select1("/html/body/section/div[1]/article[1]/p[3]/i/a/@href", doc).value;
            that.last_cid = that.last_cid.match(/_(?<id>\d+).html/).groups['id'];
        } catch (e) {

        }
        that.info_loading = false;
    }).catch(error => {
        that.info_loading = false;
        console.log(error)
    })
}

export default {
    get_directory_and_info
}