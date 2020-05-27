<template>
    <div id="novel" class="router">
        <el-container>
            <el-header height="40px">

                <!-- 页头 -->
                <my-header :name="name" @created-method="created_method"
                           @after-save="get_setting_info"></my-header>
            </el-header>

            <el-main>

                <div v-loading="info_loading">
                    <!-- 标题 -->
                    <div style="text-align: center;"><h4 class="title">{{name}}</h4></div>

                    <!-- 信息 -->
                    <div style="text-align: center;">
                        <p>
                            <span style="margin-right: 10px"><i class="el-icon-user"></i>{{author}} </span>
                            <span style="margin-right: 10px"><i class="el-icon-time"></i>{{last_update_time}} </span>
                            <span style="margin-right: 10px">
                            <i class="el-icon-timer"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_content(nid,last_cid)">{{latest_chapter}}</el-link>
                        </span>

                            <!-- 收藏信息 -->
                            <span style="margin-right: 10px" v-show="!whether_collection">
                            <el-link target="_blank" :underline="false" @click="collect">
                                <i class="el-icon-star-off"></i>
                                加入书架
                            </el-link>
                        </span>
                            <span style="margin-right: 10px" v-show="whether_collection">
                            <el-link target="_blank" :underline="false" @click="cancel_collect">
                                <i class="el-icon-star-on"></i>
                                移除书架
                            </el-link>
                        </span>
                        </p>
                    </div>
                </div>

                <el-divider></el-divider>

                <!-- 章节目录 -->
                <div v-loading="directory_loading">
                    <div style="text-align: center;"><h4 class="title">目录</h4></div>
                    <el-col :span="8" v-for="(item,index) in directory_list" :key="index">
                        <el-link target="_blank" :underline="false" @click="go_to_content(nid,item.cid)">{{item.name}}
                        </el-link>
                    </el-col>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
    import novel_method from "../util/web/novel"
    import setting from "../components/setting.vue";
    import header from "../components/header.vue";
    import db from "../util/db";
    import Vue from "vue"

    export default Vue.extend({
        name: "novel",
        components: {
            // "my-navigation": navigation,
            "my-setting": setting,
            "my-header": header
        },
        data() {
            return {
                name: '',//小说名字
                author: '',//作者名字
                last_update_time: '',//最后更新时间
                latest_chapter: '',//最后更新章节名字
                last_cid: '',//最后更新章节的cid
                directory_list: [],//目录列表
                whether_collection: false,//是否收藏
                info_loading: false,//信息的loading
                directory_loading: false,//目录的loading
            }
        },
        computed: {
            //小说的nid
            nid(): string {
                return this.$route.params.nid;
            },
            //小说的类别
            type(): string {
                return String(this.$route.query.type);
            }
        },
        methods: {

            //获得小说信息和章节
            to_get_directory_and_info() {
                novel_method.get_directory_and_info(this.type, this.nid, this);
            },

            //到小说章节
            go_to_content(nid: string, cid: string) {
                this.myHistory.addNewItem({
                    name: "content",
                    params: {nid: nid, cid: cid},
                    query: {type: String(this.type)}
                })
            },

            //收藏小说
            collect() {
                let data = {
                    _id: this.nid,
                    name: this.name,
                    author: this.author,
                    read_chapter: this.directory_list[0],
                    bookmark_list: [],
                    type: this.type
                };
                db.addNovel(data)
                this.whether_collection = db.existNovel(this.nid, this.type)
            },

            //取消收藏
            cancel_collect() {
                db.removeNovel(this.nid, this.type)
                this.whether_collection = db.existNovel(this.nid, this.type)
            },
            // 创建方法
            created_method() {
                this.whether_collection = db.existNovel(this.nid, this.type)
                window.utools.setSubInput(({text}) => {
                    this.myHistory.addNewItem({name: "search", query: {name: text, type: this.type}})
                }, '搜索在线小说');
                document.onkeydown = null;
                window.utools.subInputBlur();
                this.to_get_directory_and_info();
            },
            get_setting_info() {
            }
        },
        created() {
            this.created_method();
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
