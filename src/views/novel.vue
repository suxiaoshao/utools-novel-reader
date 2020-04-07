<template>
    <div id="novel">
        <el-container style="height: 100%">
            <el-header>
                <el-page-header @back="go_back" :content="name">
                </el-page-header>
            </el-header>

            <el-main v-loading="loading">

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
                <div style="text-align: center;"><h4 class="title">目录</h4></div>
                <el-col :span="8" v-for="(item,index) in directory_list" :key="index">
                    <el-link target="_blank" :underline="false" @click="go_to_content(nid,item.cid)">{{item.name}}
                    </el-link>
                </el-col>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";

    export default {
        name: "novel",
        components: {
            "my-navigation": navigation
        },
        data() {
            return {
                loading: false,
                name: '',
                author: '',
                last_update_time: '',
                latest_chapter: '',
                last_cid: '',
                directory_list: [],
                whether_collection: false
            }
        },
        computed: {
            nid() {
                return this.$route.params.nid;
            }
        },
        methods: {
            to_get_directory_and_info() {
                this.loading = true;
                this.axios.get(`https://www.meegoq.com/book${this.nid}.html`).then(response => {
                    this.loading = true;
                    const doc = new this.xmldom.DOMParser().parseFromString(response.data);
                    const nodes = this.xpath.select("/html/body/section/article/ul/li/a", doc);
                    this.directory_list = [];
                    nodes.forEach(value => {
                        try {
                            const item_doc = new this.xmldom.DOMParser().parseFromString(value.toString());
                            let name = this.xpath.select("/a/text()", item_doc);
                            if (name.length !== 1) {
                                name = '';
                            } else {
                                name = name[0].toString();
                            }
                            let cid;
                            cid = this.xpath.select1("/a/@href", item_doc).value;
                            cid = cid.match(/_(?<id>\d+).html/).groups["id"];
                            this.directory_list.push({
                                name: name,
                                cid: cid
                            })
                        } catch (e) {
                            console.log("错误一个")
                        }
                    });
                    if (this.directory_list.length > 9) {
                        this.directory_list = this.directory_list.splice(9);
                    }
                    this.loading = false;
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;

                }).catch(error => {
                    this.loading = false;
                    console.log(error)
                });
                this.axios.get(`https://www.meegoq.com/info${this.nid}.html`).then(response => {
                    this.loading = true;
                    const doc = new this.xmldom.DOMParser().parseFromString(response.data);
                    try {
                        this.name = this.xpath.select("/html/body/section/div[1]/article[1]/header/h1/text()", doc)[0].toString();
                        this.author = this.xpath.select("/html/body/section/div[1]/article[1]/p[1]/i[1]/a/text()", doc)[0].toString();
                        this.last_update_time = this.xpath.select("/html/body/section/div[1]/article[1]/p[2]/i/text()", doc)[0].toString();
                        this.latest_chapter = this.xpath.select("/html/body/section/div[1]/article[1]/p[3]/i/a/text()", doc)[0].toString();
                        this.last_cid = this.xpath.select1("/html/body/section/div[1]/article[1]/p[3]/i/a/@href", doc).value;
                        this.last_cid = this.last_cid.match(/_(?<id>\d+).html/).groups['id'];
                    } catch (e) {

                    }
                    this.loading = false;
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    // console.log(this.$data);
                }).catch(error => {
                    this.loading = false;
                    console.log(error)
                })
            },
            go_back() {
                this.$router.go(-1);
            },
            go_to_content(nid, cid) {
                this.$router.push({name: "content", params: {nid: nid, cid: cid}})
            },
            collect() {
                let data = {
                    _id: this.nid,
                    name: this.name,
                    author: this.author,
                    read_chapter: this.directory_list[0],
                    bookmark_list: []
                };
                let result=window.utools.db.put(data);
                if(result.hasOwnProperty("error")&&result["error"]){
                    this.$notify({
                        title: "错误",
                        message: "加入书架失败",
                        duration: 0,
                        type: "error"
                    });
                }else{
                    this.whether_collection=true;
                    this.$notify({
                        title: "成功",
                        message: "加入书架成功",
                        duration: 0,
                        type: "success"
                    });
                }
            },
            cancel_collect(){
                let result=window.utools.db.remove(this.nid);
                if(result.hasOwnProperty("error")&&result["error"]){
                    this.$notify({
                        title: "错误",
                        message: "移除书架失败",
                        duration: 0,
                        type: "error"
                    });
                }else{
                    this.whether_collection=false;
                    this.$notify({
                        title: "成功",
                        message: "移除书架成功",
                        duration: 0,
                        type: "success"
                    });
                }
            }
        },
        created() {
            this.whether_collection = (window.utools.db.get(this.nid) !== null);
            console.log(window.utools.db.get(this.nid) !== null);
            window.utools.onPluginEnter(({code, type, payload}) => {
            });
            document.onkeydown = undefined;
            this.to_get_directory_and_info();
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
        float: left;
        height: 42px;
        width: 100%;
        font-size: 26px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
    }
</style>