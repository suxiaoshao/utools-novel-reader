<template>
    <div id="content">
        <el-container style="height: 100%">
            <el-header>
                <el-page-header @back="go_back" :content="`${novel_name}-${chapter_name}`">
                </el-page-header>
            </el-header>
            <el-main v-loading="loading">
                <div style="text-align: center;margin-bottom: 10px"><h4 class="title">{{chapter_name}}</h4></div>
                <div style="text-align: center;">
                    <p>
                        <span style="margin-right: 10px" v-show="pre_cid!==-1">
                            <i class="el-icon-caret-left"></i>
                            <el-link target="_blank" :underline="false"
                                     @click="go_to_content(nid,pre_cid)">上一章</el-link>
                        </span>
                        <span style="margin-right: 10px">
                            <i class="el-icon-menu"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_novel(nid)">目录</el-link>
                        </span>
                        <span v-show="next_cid!==-1" style="margin-right: 10px">
                            <i class="el-icon-caret-right"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_content(nid,next_cid)"
                            >下一章</el-link>
                        </span>
                    </p>
                </div>
                <div class="content">
                    <p v-for="(item,index) in content_list" :key="index">
                        {{item}}
                    </p>
                </div>
                <div style="text-align: center;">
                    <p>
                        <span style="margin-right: 10px" v-show="pre_cid!==-1">
                            <i class="el-icon-caret-left"></i>
                            <el-link target="_blank" :underline="false"
                                     @click="go_to_content(nid,pre_cid)">上一章</el-link>
                        </span>
                        <span style="margin-right: 10px">
                            <i class="el-icon-menu"></i>
                            <el-link target="_blank" :underline="false" @click="go_to_novel(nid)">目录</el-link>
                        </span>
                        <span v-show="next_cid!==-1" style="margin-right: 10px">
                            <i class="el-icon-caret-right"></i>
                            <el-link target="_blank" :underline="false"
                                     @click="go_to_content(nid,next_cid)">下一章</el-link>
                        </span>
                    </p>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "content",
        created() {
            window.utools.onPluginEnter(({code, type, payload}) => {
            });
            document.onkeydown = undefined;
            this.get_text_and_info();
        },
        data() {
            return {
                loading: false,
                novel_name: '',
                chapter_name: '',
                content_list: [],
                pre_cid: '',
                next_cid: ''
            }
        },
        methods: {
            go_back() {
                this.$router.go(-1);
            },
            get_text_and_info() {
                this.loading = true;
                this.axios.get(`https://www.meegoq.com/book/${this.nid}_${this.cid}.html`).then(response => {
                    this.loading = false;
                    const doc = new this.xmldom.DOMParser().parseFromString(response.data);
                    this.chapter_name = this.xpath.select("/html/body/article/header/h1/text()", doc)[0].toString();
                    this.novel_name = this.xpath.select("/html/body/article/header/div/span[1]/a/text()", doc)[0].toString();
                    this.content_list = [];
                    this.pre_cid = this.xpath.select1("/html/body/article/div[2]/ul/li[1]/a/@href", doc).value.match(/_(?<id>\d+).html/);
                    if (this.pre_cid === null) {
                        this.pre_cid = -1
                    } else {
                        this.pre_cid = this.pre_cid.groups['id']
                    }
                    this.next_cid = this.xpath.select1("/html/body/article/div[2]/ul/li[6]/a/@href", doc).value.match(/_(?<id>\d+).html/);
                    if (this.next_cid === null) {
                        this.next_cid = -1
                    } else {
                        this.next_cid = this.next_cid.groups['id']
                    }
                    let result_list = this.xpath.select("//*[@id=\"content\"]/text()", doc);
                    result_list.forEach(value => {
                        this.content_list.push(value.toString())
                    });
                    this.update_reading_section();
                }).catch(error => {
                    this.loading = false;
                    console.log(error)
                })
            },
            go_to_novel(nid) {
                this.$router.push({name: "novel", params: {nid: nid}})
            },
            go_to_content(nid, cid) {
                this.$router.replace({name: "content", params: {nid: nid, cid: cid}});
                this.get_text_and_info();
            },
            update_reading_section(){
                let data = window.utools.db.get(this.nid);
                if (data !== null) {
                    data["read_chapter"] = {cid: this.cid, name: this.chapter_name};
                    let result=window.utools.db.put(data);
                    if(result.hasOwnProperty("error")&&result["error"]){
                        this.$notify({
                            title: "错误",
                            message: "更新最后阅读章节失败",
                            duration: 0,
                            type: "error"
                        });
                    }else{
                        this.$notify({
                            title: "成功",
                            message: "更新最后阅读章节成功",
                            duration: 0,
                            type: "success"
                        });
                    }
                }
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        },
        computed: {
            nid() {
                return this.$route.params.nid;
            },
            cid() {
                return this.$route.params.cid;
            }
        }
    }
</script>

<style scoped>
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
        font-size: 18px;
        line-height: 180%;
        padding: 10px 20px;
    }
</style>