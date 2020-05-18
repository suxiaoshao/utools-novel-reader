import router from "../router";
import {Message} from "element-ui";

export default {
    //浏览记录
    history_list: [],
    //浏览的头节点
    head_item: -1,
    //增加一个记录
    addNewItem(item) {
        this.history_list = this.history_list.slice(0, this.head_item + 1)
        this.history_list.push(item)
        this.head_item++
        router.push(item).then()
    },
    //更改当前节点
    replaceHeadItem(item) {
        this.history_list = this.history_list.slice(0, this.head_item + 1)
        this.history_list[this.head_item] = item
        router.replace(item).then()
    },
    //返回上个节点
    goBackItem() {
        if (this.head_item - 1 >= 0) {
            this.head_item--
            router.push(this.history_list[this.head_item]).then()
        } else {
            Message({
                showClose: true,
                message: '没有上一个页面了',
                type: 'error'
            })
        }
    },
    //前进一个节点
    goNextItem() {
        if (this.head_item < this.history_list.length - 1) {
            this.head_item++
            router.push(this.history_list[this.head_item]).then()
        } else {
            Message({
                showClose: true,
                message: '没有下一个页面了',
                type: 'error'
            })
        }
    },
    //获取全部节点
    getAllItem() {
        return this.history_list
    }
}
