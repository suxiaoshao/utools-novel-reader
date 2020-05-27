const {Notification} = require("element-ui")
const {Message} = require("element-ui")
import config from "@/util/web/config"
import {DBItem} from "utools-helper/@types/utools";


/*
* 内部方法
* */

function viewIdToDbId(id:string, type:string) {
    if (type !== "0") {
        const {novel_id_to_url} = config[type]
        return novel_id_to_url.replace("{##novel_id##}", id)
    } else {
        return id
    }
}

function dbIdToViewId(id:string, type:string):string {
    if (type !== "0") {
        const {url_to_novel_id} = config[type]
        // @ts-ignore
        return id.match(url_to_novel_id).groups["id"]
    } else {
        return id
    }
}

/*

* */

/**
 * 获取设置信息
 * */
function getSettingInfo() {
    return window.utools.db.get("setting")
}

/**
 * 获取提醒设置内容
 * */
function getSettingRemind() {
    return getSettingInfo().remind
}

/**
 * 获取样式设置内容
 * */
function getSettingStyle() {
    return getSettingInfo().style
}

/**
 * 获取快捷键信息
 * */

function getSettingKeyborad() {
    return getSettingInfo().keyborad
}

/**
 * 更新设置
 * @param data
 * */
function updateSetting(data:DBItem<any>) {
    const setting_data = getSettingInfo()
    const result = window.utools.db.put(data)
    if (result.hasOwnProperty("error") && result["error"]) {
        if (setting_data.remind.settings_saved_remind >= 2) {
            Notification({
                title: "错误",
                message: "保存设置失败",
                duration: 0,
                type: "error"
            });
        }
        return false
    } else {
        if (setting_data.remind.settings_saved_remind >= 3) {
            Notification({
                title: "成功",
                message: "保存设置成功",
                type: "success"
            });
        }
        return true
    }
}

/**
 * 获取所有小说
 * */

function getAllNovelData() {
    return window.utools.db.allDocs().filter(value => {
        return value._id !== "setting"
    }).map(value => {
        value._id = dbIdToViewId(value._id, value.type)
        return value
    })
}

/**
 * 删除小说
 * */

function removeNovel(id:string, type:string) {
    id = viewIdToDbId(id, type)
    const result = window.utools.db.remove(id);
    const remind = getSettingRemind()
    if (result.hasOwnProperty("error") && result["error"]) {
        if (remind.collect_remind >= 2) {
            Notification({
                title: "错误",
                message: "移除书架失败",
                duration: 0,
                type: "error"
            });
        }
        return false
    } else {
        if (remind.collect_remind >= 3) {
            Notification({
                title: "成功",
                message: "移除书架成功",
                type: "success"
            });
        }
        return true
    }
}

/**
 * 添加小说
 * */

function addNovel(item:DBItem<any>) {
    item._id = viewIdToDbId(item._id, item.type)
    const result = window.utools.db.put(item);
    const remind = getSettingRemind()
    //加入数据库失败
    if (result.hasOwnProperty("error") && result["error"]) {
        if (remind.collect_remind >= 2) {
            Notification({
                title: "错误",
                message: "加入书架失败",
                duration: 0,
                type: "error"
            });
        }
        return false
    } else {
        if (remind.collect_remind >= 3) {
            Notification({
                title: "成功",
                message: "加入书架成功",
                type: "success"
            });
        }
        return true
    }
}

/**
 * 判断小说是否存在
 * */

function existNovel(id:string, type:string):boolean {
    id = viewIdToDbId(id, type)
    const result = window.utools.db.get(id)
    return result !== null;
}

function updateNovel(data:DBItem<any>) {
    data._id = viewIdToDbId(data._id, data.type)
    const result = window.utools.db.put(data);
    const remind = getSettingRemind()
    if (result.hasOwnProperty("error") && result["error"]) {
        if (remind.update_reading_section >= 2) {
            Notification({
                title: "错误",
                message: "更新最后阅读章节失败",
                duration: 0,
                type: "error"
            });
        }
    } else {
        if (remind.update_reading_section >= 3) {
            Message({
                showClose: true,
                message: '更新最后阅读章节成功',
                type: 'success'
            });
        }
    }
}

/**
 * 获取小说数据
 * */

function getOneNovelData(id:string, type:string) {
    id = viewIdToDbId(id, type)
    const result = window.utools.db.get(id)
    result._id = dbIdToViewId(result._id, type)
    return result
}

export default {
    getSettingInfo,
    getAllNovelData,
    getSettingStyle,
    removeNovel,
    updateSetting,
    addNovel,
    existNovel,
    getOneNovelData,
    updateNovel,
    getSettingKeyborad
}
