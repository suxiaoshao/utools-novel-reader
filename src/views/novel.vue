<template>
    <div id="novel" class="router">
        <my-header class="header" :name="name" @created-method="created_method"
                   @after-save="get_setting_info"></my-header>
        <div class="main">

            <div class="info" v-loading="info_loading">
                <span><i class="el-icon-user"></i>{{author}} </span>
                <span><i class="el-icon-time"></i>{{last_update_time}} </span>
                <span><i class="el-icon-timer"></i><el-link :underline="false"
                                                            @click="go_to_content(nid,last_cid)">{{latest_chapter}}</el-link>                         </span>

                <!-- 收藏信息 -->
                <span v-show="!whether_collection">
                    <i class="el-icon-star-off"></i>
                    <el-link :underline="false" @click="collect"
                             :disabled="(info_loading||directory_loading)">加入书架</el-link>
                </span>
                <span v-show="whether_collection">
                    <i class="el-icon-star-on"></i>
                    <el-link :underline="false" @click="cancel_collect">移除书架</el-link>
                </span>
                <el-link :underline="false" @click="directory_list=directory_list.reverse()">更换排序</el-link>
            </div>

            <!-- 章节目录 -->
            <div class="directory" v-loading="directory_loading">
                <el-col :span="8" v-for="(item,index) in directory_list" :key="index">
                    <el-link target="_blank" :underline="false" @click="go_to_content(nid,item.cid)">{{item.name}}
                    </el-link>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
  import {getDirectoryAndInfo} from "@/util/web/novel"
  import setting from "../components/setting.vue";
  import header from "../components/header.vue";
  import {addNovel, existNovel, removeNovel} from "@/util/db";
  import Vue from "vue"
  import {NovelData} from "@/util/interface";

  export default Vue.extend({
    name: "novel",
    components: {
      // "my-navigation": navigation,
      "my-setting": setting,
      "my-header": header
    },
    data(): NovelData {
      return {
        name: '',//小说名字
        author: '',//作者名字
        last_update_time: '',//最后更新时间
        latest_chapter: '',//最后更新章节名字
        last_cid: '',//最后更新章节的cid
        directory_list: [],//目录列表
        whether_collection: false,//是否收藏
        info_loading: false,//信息的loading
        directory_loading: false,//目录的loading,
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
        this.info_loading = true;
        this.directory_loading = true;
        getDirectoryAndInfo(this.type, this.nid)
          .then(({name, author, latest_chapter, last_cid, last_update_time, directory_list}) => {
            this.name = name
            this.author = author
            this.last_cid = last_cid
            this.last_update_time = last_update_time
            this.latest_chapter = latest_chapter
            this.directory_list = directory_list
            this.info_loading = false;
            this.directory_loading = false;
          });
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
      collect(): void {
        let data = {
          _id: this.nid,
          name: this.name,
          author: this.author,
          read_chapter: this.directory_list[0],
          bookmark_list: [],
          type: this.type
        };
        addNovel(data)
        this.whether_collection = existNovel(this.nid, this.type)
      },

      //取消收藏
      cancel_collect(): void {
        removeNovel(this.nid, this.type)
        this.whether_collection = existNovel(this.nid, this.type)
      },
      // 创建方法
      created_method(): void {
        this.whether_collection = existNovel(this.nid, this.type)
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
    #novel {
        display: flex;
        flex-direction: column;

        .header {
            flex: 0 0 auto;
        }

        .main {
            flex: 1 1 0;
            padding: 0;
            display: flex;
            flex-direction: column;

            .info {
                flex: 0 0 auto;
                display: flex;
                justify-content: center;
                margin-bottom: 10px;

                > * {
                    margin-right: 10px
                }
            }

            .search {
                flex: 0 0 auto;
            }

            .directory {
                flex: 1 1 0;
                overflow: auto;
                padding: 10px;
            }
        }
    }
</style>
