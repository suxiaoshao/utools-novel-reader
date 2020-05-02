<template>
    <div id="search" class="router">
        <el-container style="height: 100%">
            <el-header>
                <my-navigation active-index="0" @created-method="created_method"
                               @after-save="console.log(1)"></my-navigation>
            </el-header>

            <el-main v-loading="loading">
                <!-- 标题 -->
                <div style="text-align: center;"><h4 class="title">搜索:{{this.$route.query.name}}</h4></div>

                <el-table :data="search_list" style="width: 100%" border :stripe="true">

                    <!-- 小说名 -->
                    <el-table-column>
                        <template slot="header">小说名</template>
                        <template slot-scope="scope">
                            <el-link @click="go_to_novel(scope.row.novel_id)" :underline="false">{{scope.row.name}}
                            </el-link>
                        </template>
                    </el-table-column>

                    <!-- 作者 -->
                    <el-table-column prop="author" label="作者"></el-table-column>

                    <!-- 最后章节 -->
                    <el-table-column>
                        <template slot="header">最后章节</template>
                        <template slot-scope="scope">
                            <el-link :underline="false"
                                     @click="go_to_content(scope.row.novel_id,scope.row.latest_chapter_id)">
                                {{scope.row.latest_chapter_name}}
                            </el-link>
                        </template>
                    </el-table-column>

                    <!-- 更新时间 -->
                    <el-table-column prop="update_time" label="更新时间"></el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";
    import search_method from "../assets/js/search";

    export default {
        name: "search",
        components: {
            "my-navigation": navigation
        },
        data() {
            return {
                "search_name": '',
                loading: false,
                search_list: []
            }
        },
        methods: {
            search() {
                search_method.search(this.type, String(this.$route.query.name), this);
            },
            go_to_novel(nid) {
                this.$router.push({name: "novel", params: {nid: nid}, query: {type: String(this.type)}})
            },
            go_to_content(nid, cid) {
                this.$router.push({name: "content", params: {nid: nid, cid: cid}, query: {type: String(this.type)}})
            },
            created_method() {
                this.plugin_enter();
                window.utools.setSubInput(({text}) => {
                    this.search_name = text;
                }, '搜索在线小说', true);
                document.onkeydown = (e) => {
                    if (e.key === 'Enter') {
                        this.$router.push({name: "search", query: {name: this.search_name, type: String(this.type)}});
                    }
                };
                if (this.$route.query.name !== undefined) {
                    this.search();
                }
            },
            plugin_enter() {
                window.utools.onPluginEnter(({code, type, payload, optional}) => {
                    //分流
                    if (code === "search") {
                        window.utools.setSubInput(({text}) => {
                            this.search_name = text;
                            // 这里的 text 就是输入的内容, 实时变化
                        }, '搜索在线小说', true);
                    } else if (code === 'bookshelf') {
                        this.$router.push({name: "bookshelf"})
                    } else if (code === "read_novel") {
                        //读取本地小说
                        console.log(code, type, payload)
                        this.$router.push({
                            name: 'read_file',
                            query: {"path": payload[0].path}
                        })
                    }
                });
            }
        },
        computed: {
            type() {
                return this.$route.query.type;
            }
        },
        created() {
            this.created_method();
        },
        watch: {
            "$route": "search"
        }
    }
</script>

<style scoped lang="less">
    .title {
        margin: 0;
        padding: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        float: left;
        height: 42px;
        width: 100%;
        font-size: 26px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
    }
</style>