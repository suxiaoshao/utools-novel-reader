<template>
    <div>
        <div class="my-header">
            <span class="back" @click="go_back">
            <i class="el-icon-back"></i>返回
        </span>

            <span class="name">{{name}}</span>

            <span class="link">
            <el-link class="my-link" :underline="false" @click="goToBookshelf">
                <svg class="icon my-icon"
                     style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
                     viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M832 928H192c-52.8 0-96-43.2-96-96V672c0-17.6 14.4-32 32-32s32 14.4 32 32v160c0 17.6 14.4 32 32 32h640c17.6 0 32-14.4 32-32V672c0-17.6 14.4-32 32-32s32 14.4 32 32v160c0 52.8-43.2 96-96 96zM256 800c-17.6 0-32-14.4-32-32V96c0-17.6 14.4-32 32-32s32 14.4 32 32v672c0 17.6-14.4 32-32 32z m160 0c-17.6 0-32-14.4-32-32V224c0-17.6 14.4-32 32-32s32 14.4 32 32v544c0 17.6-14.4 32-32 32z m368 0c-16 0-28.8-11.2-32-27.2l-94.4-536c-3.2-17.6 8-33.6 25.6-36.8 17.6-3.2 33.6 8 36.8 25.6l94.4 536c3.2 17.6-8 33.6-25.6 36.8-1.6 1.6-3.2 1.6-4.8 1.6z m-208 0c-17.6 0-32-14.4-32-32V352c0-17.6 14.4-32 32-32s32 14.4 32 32v416c0 17.6-14.4 32-32 32z"/>
                </svg>
            </el-link>

                <!-- 设置 -->
            <el-link class="my-link" index="setting" :underline="false" @click="dialogVisible=true">
                <i class="el-icon-s-tools my-icon"></i>
            </el-link>

                <!-- 刷新 -->
            <el-link class="my-link" :underline="false" @click="$emit('created-method')">
                <i class="el-icon-refresh-right my-icon"></i>
            </el-link>
        </span>
        </div>

        <!-- 设置内容 -->
        <my-setting :dialog-visible="dialogVisible" @close-dialog="dialogVisible=false"
                    @after-save="$emit('after-save')"></my-setting>
    </div>
</template>

<script lang="ts">
  import setting from "./setting.vue";
  import Vue from "vue"

  interface Data {
    dialogVisible: boolean
  }

  export default Vue.extend({
    name: "my-header",
    components: {
      "my-setting": setting
    },
    methods: {
      go_back() {
        this.myHistory.goBackItem()
      },
      goToBookshelf() {
        this.myHistory.addNewItem({
          name: "bookshelf"
        })
      }
    },
    data(): Data {
      return {
        dialogVisible: false//设置是否显示
      }
    },
    props: {
      name: String
    }
  })
</script>

<style scoped lang="scss">
    .my-header {
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: space-between;

        .back {
            flex: 0 0 auto;
            padding-left: 5px;
            font-size: 15px;

            .el-icon-back {
                font-size: 18px;
                margin-right: 7px;
            }

            &:hover {
                cursor: pointer;
            }
        }

        .name {
            font-size: 20px;
        }

        .link {
            .my-link {
                padding-right: 5px;

                .my-icon {
                    height: 20px;
                    font-size: 20px;
                }
            }
        }
    }
</style>
