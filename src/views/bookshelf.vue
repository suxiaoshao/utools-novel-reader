<template>
    <div id="bookshelf" class="router">
        <el-container style="height: 100%">
            <el-header>
                <my-navigation active-index="1"></my-navigation>
            </el-header>
            <el-main v-loading="loading">
                <el-table style="width: 100%" border :stripe="true" :data="all_book_list">

                    <!--  小说名 -->
                    <el-table-column>
                        <template slot="header">小说名</template>
                        <template slot-scope="scope">
                            <el-link @click="go_to_novel(scope.row._id)" :underline="false">{{scope.row.name}}
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
                                     @click="go_to_content(scope.row._id,scope.row.read_chapter.cid)">
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
                all_book_list: []
            }
        },
        methods: {
            go_to_novel(nid) {
                this.$router.push({name: "novel", params: {nid: nid}})
            },
            go_to_content(nid, cid) {
                this.$router.push({name: "content", params: {nid: nid, cid: cid}})
            },
            cancel_collect(nid) {
                let result = window.utools.db.remove(nid);
                if (result.hasOwnProperty("error") && result["error"]) {
                    this.$notify({
                        title: "错误",
                        message: "移除书架失败",
                        duration: 0,
                        type: "error"
                    });
                } else {
                    this.whether_collection = false;
                    this.$notify({
                        title: "成功",
                        message: "移除书架成功",
                        type: "success"
                    });
                }
                this.all_book_list = window.utools.db.allDocs().filter(item => {
                    return item._id !== "setting"
                });
            }
        },
        created: function () {
            this.all_book_list = window.utools.db.allDocs().filter(item => {
                return item._id !== "setting"
            });
            window.utools.onPluginEnter(({code, type, payload}) => {
                window.utools.setSubInput(({text}) => {
                    this.$router.push({name: "search", query: {name: text}})
                }, '搜索在线小说');
            });
            window.utools.setSubInput(({text}) => {
                this.$router.push({name: "search", query: {name: text}})
            }, '搜索在线小说');
            window.utools.subInputBlur();
            document.onkeydown = undefined;
        }
    }
</script>

<style scoped>

</style>