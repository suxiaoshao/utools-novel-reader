import {Message} from "element-ui";
import {Notification} from "element-ui";
import config from "@/util/web/config"
import {Keyboard, NovelItem, Remind, Setting, Style} from "@/util/interface";
import {DBItem} from "utools-helper/@types/utools";


/*
* 内部方法
* */

function viewIdToDbId(id: string, type: string) {
  if (type !== "0") {
    const {novel_id_to_url} = config[type]
    return novel_id_to_url.replace("{##novel_id##}", id)
  } else {
    return id
  }
}

function dbIdToViewId(id: string, type: string): string {
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
export function getSettingInfo(): Setting {
  return window.utools.db.get("setting") as unknown as Setting
}

/**
 * 获取提醒设置内容
 * */
function getSettingRemind(): Remind {
  return getSettingInfo().remind
}

/**
 * 获取样式设置内容
 * */
export function getSettingStyle(): Style {
  return getSettingInfo().style
}

/**
 * 获取快捷键信息
 * */

export function getSettingKeyboard(): Keyboard {
  return getSettingInfo().keyboard
}

/**
 * 更新设置
 * @param data
 * */
export function updateSetting(data: Setting): boolean {
  const setting_data = getSettingInfo()
  const result = window.utools.db.put(data as unknown as DBItem<any>)
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

export function getAllNovelData(): NovelItem[] {
  let show: boolean = true
  return (window.utools.db.allDocs() as unknown as NovelItem[]).filter((value) => {
    if (value.content !== undefined &&
      Buffer.from(value.content, "utf-8").byteLength > 2097152) {
      removeNovel(value._id, value.type)
      if (show) {
        Notification({
          title: "错误",
          message: "因为utools官方数据库的压力,删除数据大于2MB的本地小说,以免官方的流量浪费",
          type: "error"
        });
        show = false
      }
      return false
    }
    return value._id !== "setting"
  }).map(value => {
    value._id = dbIdToViewId(value._id, value.type)
    return value
  })
}

/**
 * 删除小说
 * */

export function removeNovel(id: string, type: string): boolean {
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

export function addNovel(item: NovelItem) {
  item._id = viewIdToDbId(item._id, item.type)
  const result = window.utools.db.put(item as unknown as DBItem<any>);
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

export function existNovel(id: string, type: string): boolean {
  id = viewIdToDbId(id, type)
  const result = window.utools.db.get(id)
  return result !== null;
}

export function updateNovel(data: NovelItem): void {
  data._id = viewIdToDbId(data._id, data.type)
  const result = window.utools.db.put(data as unknown as DBItem<any>);
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

export function getOneNovelData(id: string, type: string): NovelItem {
  id = viewIdToDbId(id, type)
  const result = window.utools.db.get(id) as unknown as NovelItem
  result._id = dbIdToViewId(result._id, type)
  return result
}
