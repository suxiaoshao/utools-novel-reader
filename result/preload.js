const fs = require("fs")

function set_initialization() {
    let setting = window.utools.db.get("setting");
    // 如果没有设置数据
    if (setting === null || !setting.hasOwnProperty("version") || setting.version === "0.0.6" || setting.version === "0.0.7") {

        // 设置数据优化
        const new_setting = {
            _id: "setting",
            keyboard: {
                using_keyboard: false,
                pre_key: "ArrowLeft",
                next_key: "ArrowRight",
                scroll_key: " ",
                scroll_distance: 150,
                scroll_speed: 5
            },
            remind: {
                collect_remind: 3,
                update_reading_section: 3,
                settings_saved_remind: 3
            },
            style: {
                theme: "base-theme",
                font_size: 18,
                line_height: 25
            },
            version: "0.2.9"
        }
        window.utools.db.put(new_setting)
    }

    setting = window.utools.db.get("setting");
    setting.version = "0.2.9"
    setting.style = Object.assign({
        theme: "base-theme",
        font_size: 18,
        line_height: 25
    }, setting.style);

    if (setting.hasOwnProperty("keyborad")) {// 按键设置加入活动快捷键
        setting.keyboard = Object.assign({
            using_keyboard: false,
            pre_key: "ArrowLeft",
            next_key: "ArrowRight",
            scroll_key: " ",
            scroll_distance: 150,
            scroll_speed: 5
        }, setting.keyborad);

        delete setting.keyborad
    }
    // 设置行高
    setting.style = Object.assign({
        theme: "base-theme",
        font_size: 18,
        line_height: 25
    }, setting.style)

    window.utools.db.put(setting)

    // 收藏书架的数据优化
    let novel_data = window.utools.db.allDocs().filter(item => {
        return item._id !== "setting"
    });
    novel_data.forEach(item => {
        if (!item.hasOwnProperty("type")) {
            item["type"] = "1";
        }
        if (item.type === "1" && item._id.indexOf("meegoq") === -1) {
            const old_id = item._id
            item._id = "https://www.meegoq.com/info{##novel_id##}.html".replace("{##novel_id##}", old_id)
            delete item._rev
            window.utools.db.put(item)
            window.utools.db.remove(old_id)
        }
    });
}

window.set_initialization = set_initialization;
window.readFile = fs.readFile;

function getHtml(url, encoding, then) {
    const iconv = require("iconv-lite")
    let https
    if (url.indexOf("https") === 0) {
        https = require("https");
    } else {
        https = require("http");
    }
    let req = https.get(url, (res) => {
        let chunks = [];
        let chunkLength = 0
        res.on("data", (chunk) => {
            chunks.push(chunk);
            chunkLength += chunk.length
        });
        res.on("end", () => {
            let html = iconv.decode(Buffer.concat(chunks, chunkLength), encoding);
            then(html)
        });
    });
    req.end();
}

window.getHtml = getHtml
