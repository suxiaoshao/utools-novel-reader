<template>
    <div class="Navigation">
        <!-- 电脑的导航栏 -->
        <el-menu :default-active="activeIndex" mode="horizontal" @select="select">
            <!-- 普通信息框 -->
            <el-menu-item v-for="(item,index) in navigation_item" :key="index" :index="String(index)">{{item.name}}
            </el-menu-item>

            <!-- 设置按钮 -->
            <el-link style="float: right;height: 60px" index="setting" :underline="false" @click="dialogVisible=true">
                <i class="el-icon-s-tools" style="font-size: 20px;align-self: center"></i>
            </el-link>

            <!-- 设置按钮 -->
            <el-link style="float: right;height: 60px" index="setting" :underline="false"
                     @click="$emit('created-method')">
                <i class="el-icon-refresh-right" style="font-size: 20px;align-self: center;margin-right: 6px"></i>
            </el-link>
        </el-menu>
        <!-- 设置内容 -->
        <my-setting :dialog-visible="dialogVisible" @close-dialog="dialogVisible=false"
                    @after-save="$emit('after-save')"></my-setting>
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
                        path: {name: "search", query: {type: "1"}}
                    },
                    {
                        name: "书架",
                        path: {name: "bookshelf"}
                    },
                    {
                        name: "测试",
                        path: {name: "text"}
                    },
                    // {
                    //     name: "读取文件",
                    //     path: {name: "read_file"}
                    // }
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
<style scoped lang="less">
</style>