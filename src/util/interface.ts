import {Configs} from "@/util/web/config";

// 样式设置
export interface Style {
    theme: string
    font_size: number
    line_height: number
}
//快捷键设置
export interface Keyboard {
    using_keyboard: boolean;
    pre_key: string;
    next_key: string;
    scroll_key: string;
    scroll_distance: number;
    scroll_speed: number;
}
//提醒设置
export interface Remind {
    collect_remind: number;
    update_reading_section: number;
    settings_saved_remind: number;
}
//设置信息
export interface Setting {
    _id: string;
    _rev?: string;
    keyboard: Keyboard
    remind: Remind
    style: Style
    version:string
}
//章节信息
export interface Chapter {
    name: string
    cid: string | number
}
//小说信息
export interface NovelItem {
    author: string
    content?: string
    directory_list?: Chapter[]
    is_regex?: boolean
    name: string
    read_chapter: Chapter
    regex?: string
    split_num?: number
    type: string
    _id: string
    _rev?: string
}
//文件类型小说信息
export interface FileNovelItem extends NovelItem{
    directory_list:Chapter[]
    is_regex: boolean
    content: string
    regex: string
    split_num: number
}
//bookshelf的vue的data属性
export interface BookshelfData {
    loading: boolean
    all_book_list: NovelItem[]
}
//content的vue data属性
export interface ContentData {
    loading: boolean
    novel_name: string
    chapter_name: string
    content_list: string[]
    pre_cid: string | null
    next_cid: string | null
    style: Style
}
// novel的vue data属性
export interface NovelData {
    name: string
    author: string
    last_update_time: string
    latest_chapter: string
    last_cid: string
    directory_list: Chapter[]
    whether_collection: boolean
    info_loading: boolean
    directory_loading: boolean
}
//搜索的每一个信息
export interface SearchListItem {
    name: string
    novel_id: string
    author: string
    latest_chapter_name: string,
    latest_chapter_id: string,
    update_time: string
}
// search 的vue data属性
export interface SearchData {
    search_name: string,
    loading: boolean,
    search_list: SearchListItem[],
    config: Configs,
    selected_type: string
}
