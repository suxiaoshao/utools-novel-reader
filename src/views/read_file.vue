<template>
    <div id="read_file" class="router">
        <el-container>
            <el-header>
                <my-navigation active-index="3" @created-method="created_method"></my-navigation>
            </el-header>
            <el-main>
                <el-form>
                    <el-form-item label="文件路径">
                        <el-input v-model="path" readonly></el-input>
                        <input type="file" @change="get_file"></input>
                    </el-form-item>

                    <el-form-item label="作者">
                        <el-input v-model="author" style="width: auto"></el-input>
                    </el-form-item>

                    <el-form-item label="书名">
                        <el-input v-model="name" style="width: auto"></el-input>
                    </el-form-item>

                    <el-form-item label="使用正则提取章节">
                        <el-switch v-model="is_regex" active-color="#13ce66" inactive-color="#ff4949"
                                   @change="whether_regular_changes"></el-switch>
                        <el-input v-model="regex" style="width: auto;margin-left: 20px" v-show="is_regex"
                                  placeholder="正则表达式"></el-input>
                        <el-input v-model="split_num" style="width: auto;margin-left: 20px" v-show="!is_regex"
                                  placeholder="章节字符数" type="number"></el-input>
                        <el-button @click="split_novel">get</el-button>
                    </el-form-item>
                </el-form>
                <el-button @click="add_bookshelf">加入书架</el-button>

                <!-- 章节目录 -->
                <div>
                    <div style="text-align: center;"><h4 class="title">目录</h4></div>
                    <el-col :span="8" v-for="(item,index) in directory_list" :key="index">
                        <el-link target="_blank" :underline="false">{{item.name}}
                        </el-link>
                    </el-col>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";

    export default {
        name: "read_file",
        components: {
            "my-navigation": navigation
        },
        data() {
            return {
                content: "",
                author: "",
                read_chapter: '',
                directory_list: [],
                type: "0",
                regex: '',
                name: '',
                is_regex: false,
                split_num: 4000,
                file: ''
            }
        },
        methods: {
            created_method() {
                console.log(this.path)
                window.qs.readFile(this.path, (err, data) => {
                    if (err) {
                        return this.$notify({
                            title: "错误",
                            message: "读取文件失败",
                            duration: 0,
                            type: "error"
                        });
                    }
                    console.log(data.toString(), data);
                    this.content = data.toString();
                    this.name = this.path.match(/\\([^\\]*?)\./)[1]
                })
            },
            add_bookshelf() {

                console.log(this.$data)
            },
            split_novel() {
                //是正则表达式
                this.directory_list = [];
                if (this.is_regex) {
                    if (this.regex !== "") {
                        let re = new RegExp(this.regex, "g")
                        this.directory_list = this.content.match(re)
                        this.directory_list = this.directory_list.map((value, index) => {
                            return {
                                name: value,
                                cid: index
                            }
                        })
                    } else {
                        this.$notify({
                            title: "错误",
                            message: "正则表达式不能为空",
                            type: "error"
                        });
                    }
                } else {
                    this.directory_list = [];
                    const chapter_num = this.content.length / this.split_num + (this.content.length % this.split_num !== 0)
                    for (let i = 0; i < chapter_num; i++) {
                        this.directory_list.push({"name": `第${i + 1}章`, "cid": i});
                    }
                }
            },
            whether_regular_changes(value) {
                if (value) {
                    this.$notify({
                        title: "提示",
                        message: "使用正则表达式分割章节，正则表达式匹配的值将作为章节名",
                        type: "info"
                    })
                } else {
                    this.$notify({
                        title: "提示",
                        message: "不使用正则表达式分割章节，可以选择输入框里输入的数字作为每一章的字符数(包括空格和符号),章节名为第*章",
                        type: "info"
                    })
                }
            },
            get_file(event) {
                console.log(event.target.files)
            }
        },
        created() {
            this.created_method()
        },
        computed: {
            path() {
                return this.$route.query.path
            }
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