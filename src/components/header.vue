<template>
    <div id="header">
        <!-- 页头 -->
        <el-col span="20">
            <el-page-header @back="go_back" style="height: 40px">
                        <span slot="title" style="font-size: 15px">
                                返回
                        </span>
                <template slot="content" style="font-size: 20px">{{name}}
                </template>
            </el-page-header>
        </el-col>

        <!-- 工具 -->
        <el-col span="4" style="height: 40px">

            <!-- 设置 -->
            <el-link style="float: right;height: 100%" index="setting" :underline="false" @click="dialogVisible=true">
                <i class="el-icon-s-tools" style="font-size: 20px;align-self: center"></i>
            </el-link>

            <!-- 刷新 -->
            <el-link style="float: right;height: 100%" index="setting" :underline="false"
                     @click="$emit('created-method')">
                <i class="el-icon-refresh-right" style="font-size: 20px;align-self: center;margin-right: 6px"></i>
            </el-link>
        </el-col>

        <!-- 设置内容 -->
        <my-setting :dialog-visible="dialogVisible" @close-dialog="dialogVisible=false"
                    @after-save="$emit('after-save')"></my-setting>
    </div>
</template>

<script>
    import setting from "./setting";

    export default {
        name: "header",
        components: {
            "my-setting": setting
        },
        methods: {
            go_back() {
                const item = this.myHistory.goBackItem()
                if (item !== false) {
                    //实际上是返回
                    this.$router.push(item)
                } else {
                    this.$message({
                        showClose: true,
                        message: '没有上一个页面了',
                        type: 'error'
                    })
                }
            }
        },
        data() {
            return {
                dialogVisible: false//设置是否显示
            }
        },
        props: {
            name: String
        }
    }
</script>

<style scoped lang="scss">

</style>