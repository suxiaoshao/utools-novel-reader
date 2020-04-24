<template>
    <div id="read_file" class="router">
        <el-container>
            <el-header>
                <my-navigation active-index="2" @created-method="created_method"
                               @after-save="get_setting_info"></my-navigation>
            </el-header>
            <el-main>
                <el-form>
                    <el-form-item label="文件路径">
                        <el-input v-model="path" readonly></el-input>
                        <el-button @click="get_file">上传小说文件</el-button>
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
                        <el-button @click="split_novel" style="margin-left: 20px" :disabled="path===undefined">获取章节
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-button @click="add_bookshelf" :disabled="path===undefined">加入书架</el-button>

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
                content: "",//小说内容
                author: "未知",//作者名
                read_chapter: '',//最后阅读章节
                directory_list: [],//目录数组
                type: "0",//类型
                regex: '',//正则表达式字符串
                name: '',//小说名字
                is_regex: false,//是否使用正则
                split_num: 4000,//每章字数
                remind: {
                    collect_remind: 3,
                    update_reading_section: 3,
                    settings_saved_remind: 3
                },//提醒的设置
            }
        },
        methods: {
            created_method() {
                window.utools.setSubInput(({text}) => {
                    this.$router.push({name: "search", query: {name: text, type: "1"}})
                }, '搜索在线小说');
                window.utools.subInputBlur();
                document.onkeydown = undefined;
                this.get_setting_info()
                if (this.path !== undefined) {
                    window.qs.readFile(this.path, {}, (err, data) => {
                        if (err) {
                            this.$notify({
                                title: "错误",
                                message: "读取文件失败，请重新读取文件",
                                duration: 0,
                                type: "error"
                            });
                            this.$router.push({name: "read_file"})
                            this.created_method();
                            return
                        }
                        this.content = " " + data.toString();
                        this.name = this.path.match(/\\([^\\]*?)\./)[1]
                    });
                    this.$notify({
                        title: "提示",
                        message: "目前仅支持utf-8编码的.txt结尾的文件,其他编码方式的.txt文件可以通过文本编辑器改成utf-8编码,就可以正确读取",
                        duration: 0,
                        type: "info"
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: '还没读取文件，先读取文件',
                        type: 'error'
                    })
                }
            },
            add_bookshelf() {
                //获取章节目录
                this.split_novel()
                //构造数据
                const data = {
                    _id: this.path,
                    content: this.content,
                    read_chapter: this.directory_list[0],
                    type: "0",
                    regex: this.regex,
                    name: this.name,
                    is_regex: this.is_regex,
                    split_num: this.split_num,
                    author: this.author,
                    directory_list: this.directory_list
                }

                //判断是否已经存在这个地址
                const old_data = window.utools.db.get(this.path)
                let result
                if (old_data === null) {
                    result = window.utools.db.put(data)
                } else {
                    data._rev = old_data._rev
                    result = window.utools.db.put(data)
                }

                //提醒用户是否加入书架
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
            split_novel() {
                //是正则表达式
                this.directory_list = [];
                if (this.is_regex) {
                    if (this.regex !== "") {
                        const re = new RegExp(this.regex, "g")
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
            get_file() {
                window.dialog.showOpenDialog({
                    title: "获取小说文件",
                    filters: [
                        {name: "txt文档", extensions: ["txt"]}
                    ],
                    properties: ['openFile']
                }, fileNames => {
                    if (fileNames.length === 1) {
                        console.log(fileNames)
                        this.$router.push({name: "read_file", query: {path: fileNames[0]}})
                        this.created_method()
                    } else {
                        this.$message({
                            showClose: true,
                            message: '没有选取文件',
                            type: 'error'
                        })
                    }

                })
            },
            get_setting_info() {
                this.remind = window.utools.db.get("setting").remind;
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