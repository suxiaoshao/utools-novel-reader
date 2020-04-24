<template>
    <div id="content" class="router">
        <el-container style="height: 100%">

            <el-header height="40px">
                <my-header :name="`${novel_name}-${chapter_name}`" @created-method="created_method"
                           @after-save="get_setting_info"></my-header>
            </el-header>
            <el-main v-loading="loading" :class="style.theme" id="main">
                <!-- 标题 -->
                <div style="text-align: center;margin-bottom: 10px"><h4 class="title" id="title">{{chapter_name}}</h4>
                </div>

                <!-- 章节选择器 -->
                <div style="text-align: center;">
                    <p style="margin-block-end: 0">
                        <span style="margin-right: 10px" v-show="pre_cid!==-1">
                            <i class="el-icon-caret-left"></i>
                            <el-link target="_blank" :underline="false"
                                     :type="style.theme==='gray-theme'?'info':'default'"
                                     @click="go_to_content(nid,pre_cid)">上一章</el-link>
                        </span>
                        <span style="margin-right: 10px">
                            <i class="el-icon-menu"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_novel(nid)"
                                     :type="style.theme==='gray-theme'?'info':'default'">目录</el-link>
                        </span>
                        <span v-show="next_cid!==-1" style="margin-right: 10px">
                            <i class="el-icon-caret-right"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_content(nid,next_cid)"
                                     :type="style.theme==='gray-theme'?'info':'default'">下一章</el-link>
                        </span>
                    </p>
                </div>

                <!-- 小说内容 -->
                <div class="content">
                    <p v-for="(item,index) in content_list" :key="index" :style="`font-size:${style.fort_size}px`">
                        {{item}}
                    </p>
                </div>

                <!-- 章节选择器 -->
                <div style="text-align: center;">
                    <p style="margin-block-start: 0">
                        <span style="margin-right: 10px" v-show="pre_cid!==-1">
                            <i class="el-icon-caret-left"></i>
                            <el-link target="_blank" :underline="false"
                                     :type="style.theme==='gray-theme'?'info':'default'"
                                     @click="go_to_content(nid,pre_cid)">上一章</el-link>
                        </span>
                        <span style="margin-right: 10px">
                            <i class="el-icon-menu"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_novel(nid)"
                                     :type="style.theme==='gray-theme'?'info':'default'">目录</el-link>
                        </span>
                        <span v-show="next_cid!==-1" style="margin-right: 10px">
                            <i class="el-icon-caret-right"></i>
                            <el-link target="_blank" :underline="false"
                                     :type="style.theme==='gray-theme'?'info':'default'"
                                     @click="go_to_content(nid,next_cid)">下一章</el-link>
                        </span>
                    </p>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
    import content_method from "../assets/js/content";
    import header from "../components/header";

    export default {
        name: "content",
        components: {
            "my-header": header
        },
        mounted() {
            this.created_method();
        },
        data() {
            return {
                loading: false,
                novel_name: '',
                chapter_name: '',
                content_list: [],
                pre_cid: -1,
                next_cid: -1,
                remind: {
                    collect_remind: 3,
                    update_reading_section: 3,
                    settings_saved_remind: 3
                },
                style: {
                    theme: "base-theme",
                    fort_size: 18
                }
            }
        },
        methods: {
            go_back() {
                this.$router.go(-1);
            },
            get_text_and_info() {
                content_method.get_content(this.type, this.nid, this.cid, this);
            },
            go_to_novel(nid) {
                this.$router.push({name: "novel", params: {nid: nid}, query: {type: String(this.type)}})
            },
            go_to_content(nid, cid) {
                this.$router.replace({name: "content", params: {nid: nid, cid: cid}, query: {type: String(this.type)}});
                this.get_text_and_info();
            },
            update_reading_section() {
                let data = window.utools.db.get(this.nid);
                if (data !== null) {
                    data["read_chapter"] = {cid: this.cid, name: this.chapter_name};
                    let result = window.utools.db.put(data);
                    if (result.hasOwnProperty("error") && result["error"]) {
                        if (this.remind.update_reading_section >= 2) {
                            this.$notify({
                                title: "错误",
                                message: "更新最后阅读章节失败",
                                duration: 0,
                                type: "error"
                            });
                        }
                    } else {
                        if (this.remind.update_reading_section >= 3) {
                            this.$message({
                                showClose: true,
                                message: '更新最后阅读章节成功',
                                type: 'success'
                            });
                        }
                    }
                }
                // document.getElementById("title").scrollIntoView();
                document.getElementById("main").scrollTop = 0;
            },
            get_setting_info() {
                this.remind = window.utools.db.get("setting").remind;
                this.style = window.utools.db.get("setting").style;
                const setting = window.utools.db.get("setting");
                //快捷键设置
                if (setting.keyborad.using_keyboard) {
                    document.onkeydown = (e) => {
                        if (e.key === setting.keyborad.pre_key) {
                            if (this.pre_cid !== -1) {
                                this.go_to_content(this.nid, this.pre_cid);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有上一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === setting.keyborad.next_key) {
                            if (this.next_cid !== -1) {
                                this.go_to_content(this.nid, this.next_cid)
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有下一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === setting.keyborad.scroll_key) {
                            for (let i = 0; i < setting.keyborad.scroll_distance; i++) {
                                setTimeout(() => {
                                    document.getElementById("main").scrollTop += 1;
                                }, setting.keyborad.scroll_speed * i)
                            }
                        }
                    }
                } else {
                    document.onkeydown = undefined;
                }
            },
            created_method() {
                window.utools.setSubInput(({text}) => {
                    this.$router.push({name: "search", query: {name: text, type: "1"}})
                }, '搜索在线小说');
                this.remind = window.utools.db.get("setting").remind;
                this.style = window.utools.db.get("setting").style;
                const setting = window.utools.db.get("setting");
                this.get_text_and_info();

                //快捷键设置
                if (setting.keyborad.using_keyboard) {
                    document.onkeydown = (e) => {
                        if (e.key === setting.keyborad.pre_key) {
                            if (this.pre_cid !== -1) {
                                this.go_to_content(this.nid, this.pre_cid);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有上一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === setting.keyborad.next_key) {
                            if (this.next_cid !== -1) {
                                this.go_to_content(this.nid, this.next_cid)
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有下一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === setting.keyborad.scroll_key) {
                            for (let i = 0; i < setting.keyborad.scroll_distance; i++) {
                                setTimeout(() => {
                                    document.getElementById("main").scrollTop += 1;
                                }, setting.keyborad.scroll_speed * i)
                            }
                        }
                    }
                } else {
                    document.onkeydown = undefined;
                }
                window.utools.subInputBlur();
            }
        },
        computed: {
            nid() {
                return this.$route.params.nid;
            },
            cid() {
                return this.$route.params.cid;
            },
            type() {
                return this.$route.query.type
            }
        }
    }
</script>

<style scoped lang="less">
    .yellow-theme {
        background-color: #F6F1E7;

        .title {
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 42px;
            width: 100%;
            font-size: 26px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
        }

        .content {
            font: 400 14px/1.5 Arial, "Segoe UI", "Lucida Grande", Helvetica, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontVsoicon, sans-serif;
            color: #333;
            margin: 0;
            line-height: 180%;
            padding: 5px 20px;
        }
    }

    .base-theme {
        background-image: url("../assets/maobianzhi.png");

        .title {
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 42px;
            width: 100%;
            font-size: 26px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 42px;
        }

        .content {
            font: 400 14px/1.5 Arial, "Segoe UI", "Lucida Grande", Helvetica, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontVsoicon, sans-serif;
            color: #333;
            margin: 0;
            line-height: 180%;
            padding: 5px 20px;
        }
    }

    .gray-theme {
        background-color: #595959;

        .title {
            margin: 0;
            padding: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 42px;
            width: 100%;
            font-size: 26px;
            font-weight: 600;
            color: #C1C1C1;
            line-height: 42px;
        }

        .content {
            font: 400 14px/1.5 Arial, "Segoe UI", "Lucida Grande", Helvetica, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontVsoicon, sans-serif;
            color: #C1C1C1;
            margin: 0;
            line-height: 180%;
            padding: 5px 20px;
        }
    }

</style>