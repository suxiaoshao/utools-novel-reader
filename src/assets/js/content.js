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
    that.axios.get(`https://www.meegoq.com/book/${nid}_${cid}.html`).then(response => {
        that.loading = false;
        const doc = new that.xmldom.DOMParser().parseFromString(response.data);
        that.chapter_name = that.xpath.select("/html/body/article/header/h1/text()", doc)[0].toString();
        that.novel_name = that.xpath.select("/html/body/article/header/div/span[1]/a/text()", doc)[0].toString();
        that.content_list = [];
        that.pre_cid = that.xpath.select1("/html/body/article/div[2]/ul/li[1]/a/@href", doc).value.match(/_(?<id>\d+).html/);
        if (that.pre_cid === null) {
            that.pre_cid = -1
        } else {
            that.pre_cid = that.pre_cid.groups['id']
        }
        that.next_cid = that.xpath.select1("/html/body/article/div[2]/ul/li[6]/a/@href", doc).value.match(/_(?<id>\d+).html/);
        if (that.next_cid === null) {
            that.next_cid = -1
        } else {
            that.next_cid = that.next_cid.groups['id']
        }
        let result_list = that.xpath.select("//*[@id=\"content\"]/text()", doc);
        result_list.forEach(value => {
            let re = /^　*$/;
            //判断字符串是否全为为空格
            if (!re.test(value.toString())) {
                that.content_list.push(value.toString())
            }

        });
        that.update_reading_section();
    }).catch(error => {
        that.loading = false;
        console.log(error)
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