<template>
    <div class="Navigation">
        <!-- 电脑的导航栏 -->
        <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
            <!-- 普通信息框 -->
            <el-menu-item v-for="(item,index) in navigation_item" :key="index" :index="String(index)">{{item.name}}
            </el-menu-item>
            <el-link style="float: right" index="setting" :underline="false" @click="dialogVisible=true">
                <i class="el-icon-s-tools" style="font-size: 20px;margin-top: 20px"></i>
            </el-link>
        </el-menu>

        <!-- 设置栏 -->
        <my-setting :dialog-visible="dialogVisible" @close-dialog="dialogVisible=false"></my-setting>
    </div>
</template>
<script>

    import setting from "./setting";

    export default {
        name: "Navigation",
        components: {
            "my-setting": setting
        },
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
                ], // 导航内容数组,
                dialogVisible: false, //是否显示设置框,
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