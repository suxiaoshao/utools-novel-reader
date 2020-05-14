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
    },
    //更改当前节点
    replaceHeadItem(item) {
        this.history_list = this.history_list.slice(0, this.head_item + 1)
        this.history_list[this.head_item] = item
    },
    //返回上个节点
    goBackItem() {
        if (this.head_item - 1 >= 0) {
            this.head_item--
            return this.history_list[this.head_item]
        } else {
            return false
        }
    },
    //前进一个节点
    goNextItem() {
        if (this.head_item < this.history_list.length - 1) {
            this.head_item++
            return this.history_list[this.head_item]
        } else {
            return false
        }
    },
    //获取全部节点
    getAllItem() {
        return this.history_list
    }
}