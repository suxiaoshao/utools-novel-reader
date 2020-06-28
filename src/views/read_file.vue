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

<script lang="ts">
  import navigation from "../components/navigation.vue";
  import {addNovel, existNovel, getOneNovelData} from "@/util/db";
  import Vue from "vue"
  import {Chapter} from "@/util/interface";

  interface Data {
    content: string
    author: string
    read_chapter: Chapter
    directory_list: Chapter[]
    type: string,
    regex: string
    name: string
    is_regex: boolean
    split_num: number
    _rev?: string
    _id: string
  }

  export default Vue.extend({
    name: "read_file",
    components: {
      "my-navigation": navigation
    },
    data(): Data {
      return {
        _id: "",
        content: "",//小说内容
        author: "未知",//作者名
        read_chapter: {
          name: "",
          cid: 0
        },//最后阅读章节
        directory_list: [],//目录数组
        type: "0",//类型
        regex: '',//正则表达式字符串
        name: '',//小说名字
        is_regex: false,//是否使用正则
        split_num: 4000,//每章字数,
      }
    },
    methods: {
      created_method() {
        window.utools.setSubInput(({text}) => {
          this.myHistory.addNewItem({name: "search", query: {name: text, type: "1"}})
        }, '搜索在线小说');
        window.utools.subInputBlur();
        document.onkeydown = null;
        this.get_setting_info()
        if (this.path !== "undefined") {
          window.readFile(this.path, {}, (err, data) => {
            if (err) {
              this.$notify({
                title: "错误",
                message: "读取文件失败，请重新读取文件",
                duration: 0,
                type: "error"
              });
              this.myHistory.addNewItem({name: "read_file"})
              this.created_method();
              return
            }
            if (data.byteLength > 2097152) {
              this.$notify({
                title: "错误",
                message: "读取的文件不应该超过2MB",
                duration: 0,
                type: "error"
              });
              this.myHistory.addNewItem({name: "read_file"})
              this.created_method();
              return
            }
            this.content = " " + data.toString();
            const name = this.path.match(/\\([^\\]*?)\./)
            this.name = name === null ? "" : name[1]
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
        const data: Data = {
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
        const old_data = existNovel(this.path, "0")
        if (old_data) {
          data._rev = getOneNovelData(this.path, "0")._rev
        }
        addNovel(data)
      },
      split_novel() {
        //是正则表达式
        this.directory_list = [];
        if (this.is_regex) {
          if (this.regex !== "") {
            const re = RegExp(this.regex, "g")
            const directory_list = this.content.match(re)
            if (directory_list !== null) {
              this.directory_list = directory_list.map((value, index): Chapter => {
                return {
                  name: value,
                  cid: index
                }
              })
            }
          } else {
            this.$notify({
              title: "错误",
              message: "正则表达式不能为空",
              type: "error"
            });
          }
        } else {
          //非正则提取章节
          this.directory_list = [];
          const chapter_num = this.content.length / this.split_num
          for (let i = 0; i < chapter_num; i++) {
            this.directory_list.push({"name": `第${i + 1}章`, "cid": i});
          }
        }
      },
      whether_regular_changes(value: boolean) {
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
        let fileNames = window.utools.showOpenDialog({
          title: "获取小说文件",
          filters: [
            {name: "txt文档", extensions: ["txt"]}
          ],
          properties: ['openFile']
        })
        if (fileNames !== undefined && fileNames.length === 1) {
          this.myHistory.addNewItem({name: "read_file", query: {path: fileNames[0]}})
          this.created_method()
        } else {
          this.$message({
            showClose: true,
            message: '没有选取文件',
            type: 'error'
          })
        }
      },
      get_setting_info() {
      }
    },
    created() {
      this.created_method()
    },
    computed: {
      path(): string {
        return String(this.$route.query.path)
      }
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
