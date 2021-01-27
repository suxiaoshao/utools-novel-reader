<template>
    <div class="router test">
        <el-container>
            <el-header>
                <my-navigation active-index="3" @created-method="created_method"></my-navigation>
            </el-header>
            <el-main v-loading="loading">
                <el-input placeholder="url地址" v-model="url"></el-input>
                <el-select v-model="encoding" placeholder="编码方式" style="margin-top: 10px">
                    <el-option
                        v-for="(item,index) in encodingOptions"
                        :key="index"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
                <el-input placeholder="选择器" v-model="select" style="margin-top: 10px"></el-input>
                <el-button @click="getHtml" style="margin-top: 10px">获取</el-button>
                <div v-for="(item,index) in html_list" :key="index" v-html="item"></div>
                <div v-for="(item,index) in html_list" :key="index">{{item}}</div>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
    import navigation from "../components/navigation.vue"
    import Vue from "vue"
    import * as cheerio from "cheerio"
    import {getHtml} from "@/util/web/config";

    interface Data {
        url: string,
        select: string,
        html_list: string[],
        encoding: string,
        encodingOptions: string[]
        loading: boolean
    }

    export default Vue.extend({
        name: 'test',
        data(): Data {
            return {
                url: "",
                select: '',
                html_list: [],
                encoding: 'utf-8',
                encodingOptions: ["utf-8", "gbk", 'gb2312'],
                loading: false
            }
        },
        components: {
            "my-navigation": navigation
        },
        methods: {
            getHtml() {
                this.loading = true
                getHtml(this.url, this.encoding)
                    .then(htmlString => {
                        console.log(htmlString)
                        this.loading = false
                        const $ = cheerio.load(htmlString, {decodeEntities: false});
                        this.html_list = []
                        $(this.select).each((index: number, value: CheerioElement) => {
                            const $value = $(value)
                            console.log($.html($value))
                            this.html_list.push($.html($value))
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            created_method() {
                window.utools.setSubInput(({text}) => {
                    this.myHistory.addNewItem({name: "search", query: {name: text, type: "1"}})
                }, '搜索在线小说');
                window.utools.subInputBlur();
                document.onkeydown = null;
            }
        },
        created() {
            this.created_method()
        }
    })
</SCRIPT>
