const fs = require("fs")

function set_initialization() {
    let setting = window.utools.db.get("setting");
    // 如果没有设置数据
    if (setting === null) {

        // 设置数据优化
        const new_setting = {
            _id: "setting",
            keyborad: {
                using_keyboard: false,
                pre_key: "ArrowLeft",
                next_key: "ArrowRight"
            },
            remind: {
                collect_remind: 3,
                update_reading_section: 3,
                settings_saved_remind: 3
            },
            style: {
                theme: "base-theme",
                fort_size: 18
            },
            version: "0.1.2"
        }
        window.utools.db.put(new_setting)
    } else if (!setting.hasOwnProperty("version")) {//如果是0.0.6之前版本的设置数据

        // 设置数据优化
        delete setting._id;
        const _rev = setting._rev;
        delete setting._rev;
        let new_setting = {
            _id: "setting",
            keyborad: {
                using_keyboard: false,
                pre_key: "ArrowLeft",
                next_key: "ArrowRight"
            },
            remind: {
                collect_remind: 3,
                update_reading_section: 3,
                settings_saved_remind: 3
            },
            version: "0.1.2",
            style: {
                theme: "base-theme",
                fort_size: 18
            },
            _rev: _rev
        };
        new_setting = Object.assign(new_setting, {keyborad: setting});
        window.utools.db.put(new_setting)
    } else if (setting.version === "0.0.6" || setting.version === "0.0.7") {

        // 版本是0.0.6或者0.0.7
        setting.style = {
            theme: "base-theme",
            fort_size: 18
        };
        setting.version = "0.1.2"
        window.utools.db.put(setting)
    }

    setting = window.utools.db.get("setting");
    setting.version = "0.2.3"

    // 按键设置加入活动快捷键
    setting.keyborad = Object.assign({
        using_keyboard: false,
        pre_key: "ArrowLeft",
        next_key: "ArrowRight",
        scroll_key: " ",
        scroll_distance: 150,
        scroll_speed: 5
    }, setting.keyborad);

    // 设置行高
    setting.style = Object.assign({
        theme: "base-theme",
        fort_size: 18,
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
        window.utools.db.put(item)
    });
}

window.set_initialization = set_initialization;
window.qs = fs;

function getHtml(url, encoding, then) {
    const iconv=require("iconv-lite")
    let https
    if (url.indexOf("https")===0){
        https = require("https");
    }else{
        https = require("http");
    }
    let req = https.get(url, (res) => {
        let chunks = [];
        res.on("data", (chunk) => {
            chunks.push(chunk);
        });
        res.on("end", () => {
            let html = iconv.decode(Buffer.concat(chunks), encoding);
            then(html)
        });
    });
    req.end();
}

window.getHtml = getHtml