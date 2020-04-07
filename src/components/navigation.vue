<template>
    <div class="Navigation">
        <!-- 电脑的导航栏 -->
        <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
            <!-- 普通信息框 -->
            <el-menu-item v-for="(item,index) in navigation_item" :key="index" :index="String(index)">{{item.name}}
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: "Navigation",
        data() {
            return {
                navigation_item: [
                    {
                        name: "搜索",
                        path: {name: "search"}
                    },
                    {
                        name: "书架",
                        path: {name: "bookshelf"}
                    },
                    {
                        name: "测试",
                        path: {name: "text"}
                    }
                ], // 导航内容数组
            };
        },
        props: {
            activeIndex: String //导航栏参数,用来隐藏和标记
        },
        methods: {
            // 点击菜单
            select(index) {
                this.$router.push(this.navigation_item[index].path);
            }
        }
    };
</script>
<style scoped>
</style>