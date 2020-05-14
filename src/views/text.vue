<template>
    <div id="text" class="router">
        <el-container style="height: 100%">
            <el-header>
                <my-navigation active-index="3" @created-method="created_method"></my-navigation>
            </el-header>
            <el-main v-loading="loading">
                <el-input placeholder="url地址" v-model="url"></el-input>
                <el-select v-model="encoding" placeholder="编码方式" style="margin-top: 10px">
                    <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <el-input placeholder="选择器" v-model="select" style="margin-top: 10px"></el-input>
                <el-button @click="text" style="margin-top: 10px">获取</el-button>
                <div v-for="(item,index) in html_list" :key="index" v-html="item"></div>
                <div v-for="(item,index) in html_list" :key="index">{{item}}</div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import navigation from "../components/navigation"

    export default {
        name: 'text',
        data() {
            return {
                url: "",
                select: '',
                html_list: [],
                encoding: 'utf-8',
                options: ["utf-8", "gbk",'gb2312']
            }
        },
        components: {
            "my-navigation": navigation
        },
        methods: {
            text() {
                window.getHtml(this.url, this.encoding, str => {
                    console.log(str)
                    const cheerio = require("cheerio")
                    const $ = cheerio.load(str, {decodeEntities: false});
                    this.html_list = []
                    $(this.select).each((index, value) => {
                        const $value = $(value)
                        console.log($.html($value))
                        this.html_list.push($.html($value))
                    })
                })
            },
            created_method() {
                window.utools.setSubInput(({text}) => {
                    this.myHistory.addNewItem({name: "search", query: {name: text, type: "1"}})
                    this.$router.push({name: "search", query: {name: text, type: "1"}})
                }, '搜索在线小说');
                window.utools.subInputBlur();
                document.onkeydown = undefined;
            }
        },
        created() {
            this.created_method()
        }
    }
</SCRIPT>