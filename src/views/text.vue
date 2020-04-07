<template>
    <div class="text">
        <el-container style="height: 100%">
            <el-header>
                <my-navigation active-index="2"></my-navigation>
            </el-header>
            <el-main v-loading="loading">
                <el-input placeholder="url地址" v-model="url"></el-input>
                <el-input placeholder="选择器" v-model="select"></el-input>
                <el-button @click="text">获取</el-button>
                <div v-for="(item,index) in html_list" :key="index" v-html="item"></div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import navigation from "../components/navigation"

    export default {
        name: 'text',
        data() {
            return {
                url: "",
                select: '',
                html_list: []
            }
        },
        components: {
            "my-navigation": navigation
        },
        methods: {
            text() {
                this.axios.get(this.url).then(response => {
                    console.log(response.data);
                    let doc = new this.xmldom.DOMParser().parseFromString(response.data);
                    let nodes = this.xpath.select(this.select, doc);
                    this.html_list = [];
                    nodes.forEach(value => {
                        console.log(value.toString());
                        this.html_list.push(value.toString())
                    });
                    console.log(this.html_list.length);
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        created() {
            window.utools.onPluginEnter(({code, type, payload}) => {
            });
            document.onkeydown = undefined;
        }
    }
</SCRIPT>