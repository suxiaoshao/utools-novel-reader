<template>
    <div class="setting">
        <el-dialog title="设置" :visible.sync="dialogVisible" width="70%" :before-close="dialog_close">
            <el-tabs v-model="activeName" type="card">

                <!-- 快捷键设置 -->
                <el-tab-pane label="快捷键" name="first">
                    <el-form :model="setting_data" ref="setting_data">
                        <!-- 是否启用快捷键 -->
                        <el-form-item>
                            <el-switch
                                v-model="setting_data.keyboard.using_keyboard"
                                inactive-text="使用快捷键打开上下章">
                            </el-switch>
                        </el-form-item>

                        <!-- 上一章快捷键 -->
                        <el-form-item v-show="setting_data.keyboard.using_keyboard">
                            <el-row :gutter="2">
                                <el-col :span="5">
                                    <el-popover placement="top-start" width="200" trigger="hover"
                                                content="鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键">
                                <span style="font-size: 15px" slot="reference">
                                    上章快捷键<i class="el-icon-question" style="font-size: 1em"></i>
                                </span>
                                    </el-popover>
                                </el-col>
                                <el-col :span="17">
                                    <el-input v-model="setting_data.keyboard.pre_key" @blur="cleared_to_monitor"
                                              @focus="listen_previous_chapter" readonly></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <!-- 下一章快捷键 -->
                        <el-form-item v-show="setting_data.keyboard.using_keyboard">
                            <el-row :gutter="2">
                                <el-col :span="5">
                                    <el-popover placement="top-start" width="200" trigger="hover"
                                                content="鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键">
                                <span style="font-size: 15px" slot="reference">
                                    下章快捷键<i class="el-icon-question" style="font-size: 1em"></i>
                                </span>
                                    </el-popover>
                                </el-col>
                                <el-col :span="17">
                                    <el-input v-model="setting_data.keyboard.next_key" @blur="cleared_to_monitor"
                                              @focus="listen_next_chapter" readonly></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <!-- 滚动小说快捷键 -->
                        <el-form-item v-show="setting_data.keyboard.using_keyboard">
                            <el-row :gutter="2">
                                <el-col :span="5">
                                    <el-popover placement="top-start" width="200" trigger="hover"
                                                content="鼠标点击输入框，输入框亮起时即可输入你想要的快捷键,目前只支持一个键">
                                <span style="font-size: 15px" slot="reference">
                                    滚动快捷键<i class="el-icon-question" style="font-size: 1em"></i>
                                </span>
                                    </el-popover>
                                </el-col>
                                <el-col :span="17">
                                    <el-input v-model="setting_data.keyboard.scroll_key" @blur="cleared_to_monitor"
                                              @focus="listen_scroll" readonly></el-input>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <!-- 滚动长度 -->
                        <el-form-item v-show="setting_data.keyboard.using_keyboard">
                            <el-row :gutter="2">
                                <el-col :span="5">
                                    <el-popover placement="top-start" width="200" trigger="hover"
                                                content="设置滚动长度，数字越大滚动远，最大1000">
                                <span style="font-size: 15px" slot="reference">
                                    滚动长度<i class="el-icon-question" style="font-size: 1em"></i>
                                </span>
                                    </el-popover>
                                </el-col>
                                <el-col :span="17">
                                    <el-input-number v-model="setting_data.keyboard.scroll_distance" :min="1"
                                                     :max="1000"></el-input-number>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <!-- 滚动速度 -->
                        <el-form-item v-show="setting_data.keyboard.using_keyboard">
                            <el-row :gutter="2">
                                <el-col :span="5">
                                    <el-popover placement="top-start" width="200" trigger="hover"
                                                content="设置滚动速度，数字越大滚动越慢，为0时立即滚动，最大20">
                                <span style="font-size: 15px" slot="reference">
                                    滚动速度<i class="el-icon-question" style="font-size: 1em"></i>
                                </span>
                                    </el-popover>
                                </el-col>
                                <el-col :span="17">
                                    <el-input-number v-model="setting_data.keyboard.scroll_speed" :min="0"
                                                     :max="20"></el-input-number>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <!-- 提醒设置 -->
                <el-tab-pane label="提醒" name="second">
                    <el-form :model="setting_data" ref="setting_data">

                        <!-- 收藏提醒 -->
                        <el-form-item label="收藏提醒 ">
                            <el-radio v-model="setting_data.remind.collect_remind" :label="1">都不提醒</el-radio>
                            <el-radio v-model="setting_data.remind.collect_remind" :label="2">只有失败提醒</el-radio>
                            <el-radio v-model="setting_data.remind.collect_remind" :label="3">都提醒</el-radio>
                        </el-form-item>

                        <!-- 章节更新提醒 -->
                        <el-form-item label="章节更新提醒 ">
                            <el-radio v-model="setting_data.remind.update_reading_section" :label="1">都不提醒</el-radio>
                            <el-radio v-model="setting_data.remind.update_reading_section" :label="2">只有失败提醒</el-radio>
                            <el-radio v-model="setting_data.remind.update_reading_section" :label="3">都提醒</el-radio>
                        </el-form-item>

                        <!-- 设置保存提醒 -->
                        <el-form-item label="设置保存提醒 ">
                            <el-radio v-model="setting_data.remind.settings_saved_remind" :label="1">都不提醒</el-radio>
                            <el-radio v-model="setting_data.remind.settings_saved_remind" :label="2">只有失败提醒</el-radio>
                            <el-radio v-model="setting_data.remind.settings_saved_remind" :label="3">都提醒</el-radio>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <!-- 阅读外观设置 -->
                <el-tab-pane label="阅读外观" name="third">
                    <el-form :model="setting_data" ref="setting_data">

                        <!-- 主题 -->
                        <el-form-item label="主题">
                            <el-select v-model="setting_data.style.theme" placeholder="主题">
                                <el-option label="基础" value="base-theme">
                                </el-option>
                                <el-option label="护眼" value="yellow-theme">
                                </el-option>
                                <el-option label="暗色" value="gray-theme">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="字体大小">
                            <el-input-number v-model="setting_data.style.font_size" :min="1"
                                             :max="40"></el-input-number>
                        </el-form-item>

                        <el-form-item label="间隔大小">
                            <el-input-number v-model="setting_data.style.line_height" :min="1"
                                             :max="40"></el-input-number>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>

            <div style="text-align: center;" slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save_settings">保存</el-button>
                <el-button type="danger" @click="restore_settings">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
    import {getSettingInfo, updateSetting} from "@/util/db";
    import Vue from "vue"
    import {Setting} from "@/util/interface";

    interface Data {
        setting_data: Setting,
        activeName: string
    }

    export default Vue.extend({
        name: "setting",
        data(): Data {
            return {
                setting_data: {
                    _id: "setting",
                    keyboard: {
                        using_keyboard: false,
                        pre_key: "ArrowLeft",
                        next_key: "ArrowRight",
                        scroll_key: " ",
                        scroll_distance: 150,
                        scroll_speed: 5
                    },
                    remind: {
                        collect_remind: 3,
                        update_reading_section: 3,
                        settings_saved_remind: 3
                    },
                    style: {
                        theme: "base-theme",
                        font_size: 18,
                        line_height: 25
                    },
                    version: "0.1.2",
                    _rev: ''
                },
                activeName: 'first'
            }
        },
        props: {
            dialogVisible: Boolean
        },
        methods: {
            dialog_close() {
                this.$emit("close-dialog")
            },
            listen_previous_chapter() {
                document.onkeydown = (e) => {
                    if (e.key !== this.setting_data.keyboard.scroll_key && e.key !== this.setting_data.keyboard.next_key) {
                        this.setting_data.keyboard.pre_key = e.key;
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
                    if (e.key !== this.setting_data.keyboard.pre_key && e.key !== this.setting_data.keyboard.scroll_key) {
                        this.setting_data.keyboard.next_key = e.key;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '两个快捷键不能相同',
                            type: 'error'
                        })
                    }
                };
            },
            listen_scroll() {
                document.onkeydown = (e) => {
                    if (e.key !== this.setting_data.keyboard.pre_key && e.key !== this.setting_data.keyboard.next_key) {
                        this.setting_data.keyboard.scroll_key = e.key;
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
                document.onkeydown = null
            },
            save_settings() {
                updateSetting(this.setting_data)
                this.setting_data = getSettingInfo()
                this.$emit("after-save")
                this.$emit("close-dialog")
            },
            restore_settings() {
                this.setting_data = getSettingInfo()
                this.$emit("close-dialog")
            }
        },
        created() {
            this.setting_data = getSettingInfo()
        }
    })
</script>

<style scoped lang="scss">
    .el-form {
        height: 215px;
        overflow-y: auto;
        overflow-x: hidden
    }
</style>
