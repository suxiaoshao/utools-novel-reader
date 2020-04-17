<template>
    <div id="novel" class="router">
        <el-container style="height: 100%">
            <el-header height="40px">

                <!-- 页头 -->
                <my-header :name="name" @created-method="created_method"
                           @after-save="get_setting_info"></my-header>
            </el-header>

            <el-main v-loading="directory_loading||info_loading">

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
                <el-divider></el-divider>

                <!-- 章节目录 -->
                <div>
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

<script>
    import novel_method from "../assets/js/novel"
    import setting from "../components/setting";
    import header from "../components/header";

    export default {
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
                info_loading: true,//信息的loading
                directory_loading: true,//目录的loading
                remind: {
                    collect_remind: 3,
                    update_reading_section: 3,
                    settings_saved_remind: 3
                },//提醒的设置
            }
        },
        computed: {
            //小说的nid
            nid() {
                return this.$route.params.nid;
            },
            //小说的类别
            type() {
                return this.$route.query.type;
            }
        },
        methods: {

            //获得小说信息和章节
            to_get_directory_and_info() {
                novel_method.get_directory_and_info(this.type, this.nid, this);
            },

            //到小说章节
            go_to_content(nid, cid) {
                this.$router.push({name: "content", params: {nid: nid, cid: cid}, query: {type: String(this.type)}})
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
                let result = window.utools.db.put(data);

                //加入数据库失败
                if (result.hasOwnProperty("error") && result["error"]) {
                    if (this.remind.collect_remind >= 2) {
                        this.$notify({
                            title: "错误",
                            message: "加入书架失败",
                            duration: 0,
                            type: "error"
                        });
                    }
                } else {
                    this.whether_collection = true;
                    if (this.remind.collect_remind >= 3) {
                        this.$notify({
                            title: "成功",
                            message: "加入书架成功",
                            type: "success"
                        });
                    }
                }
            },

            //取消收藏
            cancel_collect() {
                let result = window.utools.db.remove(this.nid);

                //成功
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
            },
            // 创建方法
            created_method() {
                this.whether_collection = (window.utools.db.get(this.nid) !== null);
                window.utools.setSubInput(({text}) => {
                    this.$router.push({name: "search", query: {name: text, type: "1"}})
                }, '搜索在线小说');
                document.onkeydown = undefined;
                window.utools.subInputBlur();
                this.remind = window.utools.db.get("setting").remind;
                this.to_get_directory_and_info();
            },
            get_setting_info() {
                this.remind = window.utools.db.get("setting").remind;
            }
        },
        created() {
            this.created_method();
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