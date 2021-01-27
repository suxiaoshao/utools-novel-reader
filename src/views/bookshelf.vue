<template>
  <div id="bookshelf" class="router">
    <el-container>
      <el-header>
        <my-navigation
          active-index="1"
          @created-method="created_method"
          @after-save="get_setting_info"
        ></my-navigation>
      </el-header>
      <el-main v-loading="loading">
        <el-table
          style="width: 100%"
          border
          :stripe="true"
          :data="all_book_list"
        >
          <!--  小说名 -->
          <el-table-column>
            <template slot="header">小说名</template>
            <template slot-scope="scope">
              <el-link
                @click="go_to_novel(scope.row._id, scope.row.type)"
                :underline="false"
              >
                {{ scope.row.name }}
              </el-link>
            </template>
          </el-table-column>

          <!-- 作者 -->
          <el-table-column prop="author" label="作者"></el-table-column>

          <!-- 最后阅读 -->
          <el-table-column>
            <template slot="header">最后阅读</template>
            <template slot-scope="scope">
              <el-link
                :underline="false"
                @click="
                  go_to_content(
                    scope.row._id,
                    String(scope.row.read_chapter.cid),
                    scope.row.type
                  )
                "
              >
                {{ scope.row.read_chapter.name }}
              </el-link>
            </template>
          </el-table-column>

          <!-- 管理 -->
          <el-table-column>
            <template slot="header">管理</template>
            <template slot-scope="scope">
              <el-link
                :underline="false"
                type="danger"
                @click="cancel_collect(scope.row._id, scope.row.type)"
                >移除
              </el-link>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import navigation from "../components/navigation.vue";
import { getAllNovelData, removeNovel } from "@/util/db";
import Vue from "vue";
import { BookshelfData } from "@/util/interface";

export default Vue.extend({
  name: "bookshelf",
  components: {
    "my-navigation": navigation,
  },
  data(): BookshelfData {
    return {
      loading: false,
      all_book_list: [],
    };
  },
  methods: {
    go_to_novel(nid: string, type: string): void {
      this.myHistory.addNewItem({
        name: "novel",
        params: { nid: nid },
        query: { type: type },
      });
    },
    go_to_content(nid: string, cid: string, type: string): void {
      this.myHistory.addNewItem({
        name: "content",
        params: { nid: nid, cid: cid },
        query: { type: type },
      });
    },
    cancel_collect(nid: string, type: string): void {
      removeNovel(nid, type);
      this.all_book_list = getAllNovelData();
    },
    created_method(): void {
      this.all_book_list = getAllNovelData();
      window.utools.setSubInput(({ text }) => {
        this.myHistory.addNewItem({
          name: "search",
          query: { name: text, type: "1" },
        });
      }, "搜索在线小说");
      window.utools.subInputBlur();
      document.onkeydown = null;
    },
    get_setting_info(): void {},
  },
  created: function() {
    this.created_method();
  },
});
</script>

<style scoped lang="scss"></style>
