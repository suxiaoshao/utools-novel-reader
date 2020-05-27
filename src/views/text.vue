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
                <el-button @click="myTest">test</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts">
    import navigation from "../components/navigation.vue"
    import router from "../router"
    import Vue from "vue"
    import * as cheerio from "cheerio"
    interface Data{
        url:string,
        select:string,
        html_list:string[],
        encoding:string,
        encodingOptions:string[]
        loading:boolean
    }
    export default Vue.extend({
        name: 'test',
        data():Data {
            return {
                url: "",
                select: '',
                html_list: [],
                encoding: 'utf-8',
                encodingOptions: ["utf-8", "gbk", 'gb2312'],
                loading:false
            }
        },
        components: {
            "my-navigation": navigation
        },
        methods: {
            getHtml() {
                this.loading=true
                window.getHtml(this.url, this.encoding, str => {
                    console.log(str)
                    this.loading=false
                    const $ = cheerio.load(str, {decodeEntities: false});
                    this.html_list = []
                    $(this.select).each((index:number, value:CheerioElement) => {
                        const $value = $(value)
                        console.log($.html($value))
                        this.html_list.push($.html($value))
                    })
                })
            },
            created_method() {
                window.utools.setSubInput(({text}) => {
                    this.myHistory.addNewItem({name: "search", query: {name: text, type: "1"}})
                }, '搜索在线小说');
                window.utools.subInputBlur();
                document.onkeydown = null;
            },
            myTest(){
                router.push({name: "search", query: { type: "1"}}).then(r=>{
                    console.log(r)})
            }
        },
        created() {
            this.created_method()
        }
    })
</SCRIPT>
