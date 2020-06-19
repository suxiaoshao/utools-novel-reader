<template>
    <div id="search" class="router">
        <el-container>
            <el-header>
                <my-navigation active-index="0" @created-method="created_method"
                               @after-save=""></my-navigation>
            </el-header>

            <el-main>
                <!-- 标题 -->
                <div style="text-align: center;"><h4 class="title">搜索:{{this.$route.query.name}}</h4></div>

                <span style="font-size: 18px">选择源网站</span>

                <!-- 网站源选择器-->
                <el-select v-model="selected_type" placeholder="选择网站源" style="margin-left: 10px;" @change="typeChange">
                    <el-option
                        v-for="(value,index) in config"
                        :key="index"
                        :label="value.name"
                        :value="index">
                    </el-option>
                </el-select>

                <!-- 前往源网站 -->
                <el-link :underline="false" style="margin-left: 10px;font-size: 18px"
                         icon="el-icon-link" @click="openUrl">前往源网站
                </el-link>

                <el-table :data="search_list" v-loading="loading" style="width: 100%;margin-top: 20px" border
                          :stripe="true">

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

<script lang="ts">
    import navigation from "../components/navigation.vue";
    import {search} from "@/util/web/search";
    import config from "../util/web/config"
    import Vue from "vue"
    import {SearchData} from "@/util/interface";

    export default Vue.extend({
        name: "search",
        components: {
            "my-navigation": navigation
        },
        data(): SearchData {
            return {
                search_name: '',
                loading: false,
                search_list: [],
                config: {},
                selected_type: ""
            }
        },
        methods: {
            search() {
                if (this.$route.query.name !== '' && this.$route.query.name !== undefined) {
                    this.loading = true;
                    this.search_list = [];
                    search(this.type, String(this.$route.query.name)).then(searchList => {
                        this.search_list = searchList
                        this.loading = false
                    });
                }
            },
            go_to_novel(nid: string) {
                this.myHistory.addNewItem({name: "novel", params: {nid: nid}, query: {type: String(this.type)}})
            },
            go_to_content(nid: string, cid: string) {
                this.myHistory.addNewItem({
                    name: "content",
                    params: {nid: nid, cid: cid},
                    query: {type: String(this.type)}
                })
            },
            created_method() {
                this.config = config;
                this.selected_type = this.type
                window.utools.setSubInput(({text}) => {
                    this.search_name = text;
                }, '搜索在线小说', true);
                document.onkeydown = (e) => {
                    if (e.key === 'Enter') {
                        this.myHistory.addNewItem({
                            name: "search",
                            query: {name: this.search_name, type: String(this.type)}
                        })
                    }
                };
                if (this.$route.query.name !== undefined) {
                    this.search();
                }
            },
            openUrl() {
                window.utools.shellOpenExternal(this.config[this.selected_type].url)
            },
            typeChange(type: string) {
                this.myHistory.addNewItem({
                    name: "search",
                    query: {name: this.search_name, type: type}
                })
            }
        },
        computed: {
            type(): string {
                return String(this.$route.query.type);
            }
        },
        created() {
            this.created_method();
        },
        watch: {
            "$route": "search"
        }
    })
</script>

<style scoped lang="scss">
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
