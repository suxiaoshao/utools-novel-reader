import Vue from 'vue'
import './util/element.ts'
import "./assets/css/app.scss"
import myHistory from "./util/history";
import App from './App.vue'
import router from './util/router'
import {Notification} from "element-ui";

let my_history=new myHistory()
Vue.prototype.myHistory = my_history
Vue.config.productionTip = false;

window.utools.onPluginReady(() => {
    window.set_initialization();
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
    utools.onPluginEnter(params=> {
        //分流
        const code:string=params.code
        const payload:any[]=params.payload as any[]
        if (code === "search") {
            my_history.addNewItem({name: "search", query: {type: "1"}})
        } else if (code === 'bookshelf') {
            //进入书架
            my_history.addNewItem({name: "bookshelf"})
        } else if (code === "read_novel" &&payload.length >= 1) {
            //读取本地小说
            my_history.addNewItem({
                name: 'read_file',
                query: {"path": String(payload[0].path)}
            })
        }else{
            Notification({
                title:"错误",
                message:"似乎出现了bug",
                type:"error",
                duration: 3000
            })
        }
    });
})
