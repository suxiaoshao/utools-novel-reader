<template>
    <div id="search" class="router">
        <el-container style="height: 100%">
            <el-header>
                <my-navigation active-index="0"></my-navigation>
            </el-header>
            <el-main v-loading="loading">
                <el-table :data="search_list" style="width: 100%" border :stripe="true">

                    <!-- 小说名 -->
                    <el-table-column>
                        <template slot="header">小说名</template>
                        <template slot-scope="scope">
                            <el-link @click="go_to_novel(scope.row.novel_id)" :underline="false">{{scope.row.name}}
                            </el-link>
                        </template>
                    </el-table-column>

                    <!-- 作者 -->
                    <el-table-column prop="author" label="作者"></el-table-column>

                    <!-- 最后章节 -->
                    <el-table-column>
                        <template slot="header">最后章节</template>
                        <template slot-scope="scope">
                            <el-link :underline="false"
                                     @click="go_to_content(scope.row.novel_id,scope.row.latest_chapter_id)">
                                {{scope.row.latest_chapter_name}}
                            </el-link>
                        </template>
                    </el-table-column>

                    <!-- 更新时间 -->
                    <el-table-column prop="update_time" label="更新时间"></el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation";

    export default {
        name: "search",
        components: {
            "my-navigation": navigation
        },
        data() {
            return {
                "search_name": '',
                loading: false,
                search_list: []
            }
        },
        methods: {
            search() {
                this.loading = true;
                this.search_list = [];
                this.axios.get("https://www.meegoq.com/search.htm?keyword=" + encodeURI(String(this.$route.query.name))).then(response => {
                    this.loading = false;
                    const doc = new this.xmldom.DOMParser().parseFromString(response.data);
                    const nodes = this.xpath.select("/html/body/section/div[1]/section/ul/li", doc);
                    nodes.slice(1).forEach(value => {
                        try {
                            const item_doc = new this.xmldom.DOMParser().parseFromString(value.toString());
                            let name = this.xpath.select("/li/span[2]/a/text()", item_doc);
                            if (name.length !== 1) {
                                name = '';
                            } else {
                                name = name[0].toString();
                            }
                            let novel_id = this.xpath.select1("/li/span[2]/a/@href", item_doc).value;
                            novel_id = novel_id.match(/info(?<id>\d+)\.html/).groups["id"];
                            let author = this.xpath.select("/li/span[4]/a/text()", item_doc);
                            if (author.length !== 1) {
                                author = ''
                            } else {
                                author = author[0].toString();
                            }
                            let latest_chapter_name = this.xpath.select("/li/span[3]/a/text()", item_doc);
                            if (latest_chapter_name.length !== 1) {
                                latest_chapter_name = ''
                            } else {
                                latest_chapter_name = latest_chapter_name[0].toString();
                            }
                            let latest_chapter_id;
                            try {
                                latest_chapter_id = this.xpath.select1("/li/span[3]/a/@href", item_doc).value;
                                latest_chapter_id = latest_chapter_id.match(/_(?<id>\d+).html/).groups["id"];
                            } catch (e) {
                                latest_chapter_id = '';
                            }
                            let update_time = this.xpath.select("/li/span[5]/text()", item_doc);
                            if (update_time.length !== 1) {
                                update_time = ''
                            } else {
                                update_time = update_time[0].toString()
                            }
                            this.search_list.push({
                                name: name,
                                novel_id: novel_id,
                                author: author,
                                latest_chapter_name: latest_chapter_name,
                                latest_chapter_id: latest_chapter_id,
                                update_time: update_time
                            });
                        } catch (e) {
                            console.log("出错一次")
                        }
                    });
                }).catch(error => {
                    this.loading = false;
                    console.log(error)
                });
            },
            go_to_novel(nid) {
                this.$router.push({name: "novel", params: {nid: nid}})
            },
            go_to_content(nid, cid) {
                this.$router.push({name: "content", params: {nid: nid, cid: cid}})
            }
        },
        created() {
            window.utools.onPluginEnter(({code, type, payload}) => {
                if (code === "search") {
                    window.utools.setSubInput(({text}) => {
                        this.search_name = text;
                        // 这里的 text 就是输入的内容, 实时变化
                    }, '搜索在线小说',true);
                } else if (code === 'bookshelf') {
                    this.$router.push({name: "bookshelf"})
                }
            });
            window.utools.setSubInput(({text}) => {
                this.search_name = text;
            }, '搜索在线小说',true);
            document.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    this.$router.push({name: "search", query: {name: this.search_name}});
                }
            };
            if (this.$route.query.name !== undefined) {
                this.search();
            }
        },
        watch: {
            "$route": "search"
        }
    }
</script>

<style scoped>

</style>