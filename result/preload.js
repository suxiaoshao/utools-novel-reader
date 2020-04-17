const fs=require("fs")
const electron =require("electron")

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
            version: "0.0.7"
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
            version: "0.0.7",
            style: {
                theme: "base-theme",
                fort_size: 18
            },
            _rev: _rev
        };
        new_setting = Object.assign(new_setting, {keyborad: setting});
        window.utools.db.put(new_setting)
    } else if (setting.version === "0.0.6") {

        // 版本是0.0.6
        setting.style = {
            theme: "base-theme",
            fort_size: 18
        };
        setting.value = "0.0.7"
        window.utools.db.put(setting)
    }

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
window.electron=electron;
