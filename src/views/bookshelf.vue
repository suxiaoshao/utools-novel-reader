<template>
    <div id="bookshelf" class="router">
        <el-container style="height: 100%">
            <el-header>
                <my-navigation active-index="1" @created-method="created_method"
                               @after-save="get_setting_info"></my-navigation>
            </el-header>
            <el-main v-loading="loading">
                <el-table style="width: 100%" border :stripe="true" :data="all_book_list">

                    <!--  小说名 -->
                    <el-table-column>
                        <template slot="header">小说名</template>
                        <template slot-scope="scope">
                            <el-link @click="go_to_novel(scope.row._id,scope.row.type)" :underline="false">
                                {{scope.row.name}}
                            </el-link>
                        </template>
                    </el-table-column>

                    <!-- 作者 -->
                    <el-table-column prop="author" label="作者"></el-table-column>

                    <!-- 最后阅读 -->
                    <el-table-column>
                        <template slot="header">最后阅读</template>
                        <template slot-scope="scope">
                            <el-link :underline="false"
                                     @click="go_to_content(scope.row._id,scope.row.read_chapter.cid,scope.row.type)">
                                {{scope.row.read_chapter.name}}
                            </el-link>
                        </template>
                    </el-table-column>

                    <!-- 管理 -->
                    <el-table-column>
                        <template slot="header">管理</template>
                        <template slot-scope="scope">
                            <el-link :underline="false" type="danger"
                                     @click="cancel_collect(scope.row._id)">移除
                            </el-link>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";

    export default {
        name: "bookshelf",
        components: {
            "my-navigation": navigation
        },
        data() {
            return {
                loading: false,
                all_book_list: [],
                remind: {
                    collect_remind: 3,
                    update_reading_section: 3,
                    settings_saved_remind: 3
                }
            }
        },
        methods: {
            go_to_novel(nid, type) {
                this.$router.push({name: "novel", params: {nid: nid}, query: {type: type}})
            },
            go_to_content(nid, cid, type) {
                this.$router.push({name: "content", params: {nid: nid, cid: cid}, query: {type: type}})
            },
            cancel_collect(nid) {
                let result = window.utools.db.remove(nid);
                if (result.hasOwnProperty("error") && result["error"]) {
                    if (this.remind.collect_remind >= 2) {
                        this.$notify({
                            title: "错误",
                            message: "移除书架失败",
                            duration: 0,
                            type: "error"
                        });
                    }
                } else {
                    this.whether_collection = false;
                    if (this.remind.collect_remind >= 3) {
                        this.$notify({
                            title: "成功",
                            message: "移除书架成功",
                            type: "success"
                        });
                    }
                }
                this.all_book_list = window.utools.db.allDocs().filter(item => {
                    return item._id !== "setting"
                });
            },
            created_method() {
                this.all_book_list = window.utools.db.allDocs().filter(item => {
                    return item._id !== "setting"
                });
                window.utools.setSubInput(({text}) => {
                    this.$router.push({name: "search", query: {name: text, type: "1"}})
                }, '搜索在线小说');
                window.utools.subInputBlur();
                document.onkeydown = undefined;
                this.remind = window.utools.db.get("setting").remind;
            },
            get_setting_info(){
                this.remind = window.utools.db.get("setting").remind;
            }
        },
        created: function () {
            this.created_method();
        }
    }
</script>

<style scoped lang="less">

</style>