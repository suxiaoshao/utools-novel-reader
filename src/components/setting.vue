<template>
    <div id="setting">
        <el-dialog title="设置" :visible.sync="dialogVisible" width="70%" :before-close="dialog_close">
            <el-form :model="setting_data" ref="setting_data">

                <!-- 是否启用快捷键 -->
                <el-form-item>
                    <el-switch
                            v-model="setting_data.using_keyboard"
                            inactive-text="使用快捷键打开上下章">
                    </el-switch>
                </el-form-item>

                <!-- 上一章快捷键 -->
                <el-form-item v-show="setting_data.using_keyboard">
                    <el-row :gutter="2">
                        <el-col :span="5">
                            <el-popover placement="top-start" width="200" trigger="hover"
                                        content="鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键">
                                <span style="font-size: 15px" slot="reference">
                                    上一章快捷键<i class="el-icon-question" style="font-size: 1em"></i>
                                </span>
                            </el-popover>
                        </el-col>
                        <el-col :span="17">
                            <el-input :placeholder="setting_data.pre_key" @blur="cleared_to_monitor"
                                      @focus="listen_previous_chapter"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <!-- 下一章快捷键 -->
                <el-form-item v-show="setting_data.using_keyboard">
                    <el-row :gutter="2">
                        <el-col :span="5">
                            <el-popover placement="top-start" width="200" trigger="hover"
                                        content="鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键">
                                <span style="font-size: 15px" slot="reference">
                                    下一章快捷键<i class="el-icon-question" style="font-size: 1em"></i>
                                </span>
                            </el-popover>
                        </el-col>
                        <el-col :span="17">
                            <el-input :placeholder="setting_data.next_key" @blur="cleared_to_monitor"
                                      @focus="listen_next_chapter"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item>
                    <div style="text-align: center;">
                        <el-button type="primary" @click="save_settings">保存</el-button>
                        <el-button type="danger" @click="restore_settings">取消</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "setting",
        data() {
            return {
                setting_data: {}
            }
        },
        props: {
            dialogVisible: Boolean
        },
        methods: {
            dialog_close(done) {
                this.$emit("close-dialog")
            },
            listen_previous_chapter() {
                document.onkeydown = (e) => {
                    if (e.key !== this.setting_data.next_key) {
                        this.setting_data.pre_key = e.key;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '两个快捷键不能相同',
                            type: 'error'
                        })
                    }
                };
            },
            listen_next_chapter() {
                document.onkeydown = (e) => {
                    if (e.key !== this.setting_data.pre_key) {
                        this.setting_data.next_key = e.key;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '两个快捷键不能相同',
                            type: 'error'
                        })
                    }
                };
            },
            cleared_to_monitor() {
                document.onkeydown = undefined
            },
            save_settings() {
                let result = window.utools.db.put(this.setting_data);
                if (result.hasOwnProperty("error") && result["error"]) {
                    this.$notify({
                        title: "错误",
                        message: "保存设置失败",
                        duration: 0,
                        type: "error"
                    });
                    this.setting_data = window.utools.db.get("setting");
                } else {
                    this.setting_data= window.utools.db.get("setting");
                    this.$notify({
                        title: "成功",
                        message: "保存设置成功",
                        type: "success"
                    });
                }
            },
            restore_settings() {
                this.setting_data = window.utools.db.get("setting");
            }
        },
        created() {
            let data = window.utools.db.get("setting");
            if (data === null) {
                let new_data = {
                    _id: "setting",
                    using_keyboard: false,
                    pre_key: "ArrowLeft",
                    next_key: "ArrowRight"
                };
                this.setting_data = window.utools.db.put(new_data);
            } else {
                this.setting_data = data;
            }
        }
    }
</script>

<style scoped>

</style>