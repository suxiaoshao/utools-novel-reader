<template>
    <div class="router content">
        <el-container>

            <el-header height="40px">
                <my-header :name="`${novel_name}-${chapter_name}`" @created-method="created_method"
                           @after-save="get_setting_info">
                </my-header>
            </el-header>
            <el-main v-loading="loading" :class="style.theme" id="main">
                <!-- 标题 -->
                <div style="text-align: center;margin-bottom: 10px"><h4 class="title" id="title">{{chapter_name}}</h4>
                </div>

                <!-- 章节选择器 -->
                <div style="text-align: center;">
                    <p style="margin-block-end: 0">
                        <span style="margin-right: 10px" v-show="pre_cid!==null">
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
                        <span v-show="next_cid!==null" style="margin-right: 10px">
                            <i class="el-icon-caret-right"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_content(nid,next_cid)"
                                     :type="style.theme==='gray-theme'?'info':'default'">下一章</el-link>
                        </span>
                    </p>
                </div>

                <!-- 小说内容 -->
                <div class="content" :style="`line-height: ${style.font_size+style.line_height}px;`">
                    <p v-for="(item,index) in content_list" :key="index"
                       :style="`font-size:${style.font_size}px;`">
                        {{item}}
                    </p>
                </div>

                <!-- 章节选择器 -->
                <div style="text-align: center;">
                    <p style="margin-block-start: 0">
                        <span style="margin-right: 10px" v-show="pre_cid!==null">
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
                        <span v-show="next_cid!==null" style="margin-right: 10px">
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
<script lang="ts">
    import content_method from "../util/web/content";
    import header from "../components/header.vue";
    import {existNovel, getOneNovelData, getSettingKeyboard, getSettingStyle, updateNovel} from "@/util/db";
    import Vue from "vue"
    import {ContentData} from "@/util/interface";


    export default Vue.extend({
        name: "mt-content",
        components: {
            "my-header": header
        },
        mounted() {
            this.created_method();
        },
        data(): ContentData {
            return {
                loading: false,
                novel_name: '',
                chapter_name: '',
                content_list: [],
                pre_cid: null,
                next_cid: null,
                style: {
                    theme: "base-theme",
                    font_size: 18,
                    line_height: 25
                }
            }
        },
        methods: {
            get_text_and_info() {
                content_method.get_content(this.type, this.nid, this.cid, this);
            },
            go_to_novel(nid: string) {
                this.myHistory.addNewItem({name: "novel", params: {nid: nid}, query: {type: String(this.type)}})
            },
            go_to_content(nid: string, cid: string) {
                this.myHistory.replaceHeadItem({
                    name: "content",
                    params: {nid: nid, cid: cid},
                    query: {type: String(this.type)}
                })
                this.get_text_and_info();
            },
            update_reading_section() {
                if (existNovel(this.nid, this.type)) {
                    const data = getOneNovelData(this.nid, this.type)
                    data["read_chapter"] = {cid: this.cid, name: this.chapter_name};
                    updateNovel(data)
                }
                const main: HTMLElement | null = document.getElementById("main")
                if (main !== null) {
                    main.scrollTop = 0;
                }

            },
            get_setting_info() {
                this.style = getSettingStyle()
                const keyboard = getSettingKeyboard()
                //快捷键设置
                if (keyboard.using_keyboard) {
                    document.onkeydown = (e) => {
                        if (e.key === keyboard.pre_key) {
                            if (this.pre_cid !== null) {
                                this.go_to_content(this.nid, this.pre_cid);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有上一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === keyboard.next_key) {
                            if (this.next_cid !== null) {
                                this.go_to_content(this.nid, this.next_cid)
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有下一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === keyboard.scroll_key) {
                            for (let i = 0; i < keyboard.scroll_distance; i++) {
                                setTimeout(() => {
                                    const main: HTMLElement | null = document.getElementById("main")
                                    if (main !== null) {
                                        main.scrollTop += 1;
                                    }
                                }, keyboard.scroll_speed * i)
                            }
                        }
                    }
                } else {
                    document.onkeydown = null;
                }
            },
            created_method() {
                window.utools.setSubInput(({text}) => {
                    this.myHistory.addNewItem({name: "search", query: {name: text, type: this.type}})
                }, '搜索在线小说');
                this.style = getSettingStyle();
                const keyboard = getSettingKeyboard();
                this.get_text_and_info();

                //快捷键设置
                if (keyboard.using_keyboard) {
                    document.onkeydown = (e) => {
                        if (e.key === keyboard.pre_key) {
                            if (this.pre_cid !== null) {
                                this.go_to_content(this.nid, this.pre_cid);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有上一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === keyboard.next_key) {
                            if (this.next_cid !== null) {
                                this.go_to_content(this.nid, this.next_cid)
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: '没有下一章啦',
                                    type: 'error'
                                })
                            }
                        } else if (e.key === keyboard.scroll_key) {
                            for (let i = 0; i < keyboard.scroll_distance; i++) {
                                setTimeout(() => {
                                    const main: HTMLElement | null = document.getElementById("main")
                                    if (main !== null) {
                                        main.scrollTop += 1;
                                    }
                                }, keyboard.scroll_speed * i)
                            }
                        }
                    }
                } else {
                    document.onkeydown = null;
                }
                window.utools.subInputBlur();
            }
        },
        computed: {
            nid(): string {
                return this.$route.params.nid;
            },
            cid(): string {
                return this.$route.params.cid;
            },
            type(): string {
                return String(this.$route.query.type)
            }
        }
    })
</script>

<style scoped lang="scss">

    @mixin base-title {
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

    @mixin base-content {
        font: 400 14px/1.5 Arial, "Segoe UI", "Lucida Grande", Helvetica, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontVsoicon, sans-serif;
        color: #333;
        margin: 0;
        padding: 5px 20px;
        p {
            margin-block-start: 0;
            margin-block-end: 0;
            text-indent: 2em;
        }
    }

    .yellow-theme {
        background-color: #F6F1E7;

        .title {
            @include base-title;
        }

        .content {
            @include base-content
        }
    }

    .base-theme {
        background-image: url("../assets/maobianzhi.png");

        .title {
            @include base-title;
        }

        .content {
            @include base-content;
        }
    }

    .gray-theme {
        background-color: #595959;

        .title {
            @include base-title;
            color: #C1C1C1;
        }

        .content {
            @include base-content;
            color: #C1C1C1;
        }
    }
</style>
<style lang="scss">
    .content {
        .el-container {
            .el-header {
                padding: 0;
            }
        }

    }

</style>
