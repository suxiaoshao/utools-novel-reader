import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from "axios"
import xmldom from "xmldom"
import xpath from "xpath"
import "./app.less"

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.xmldom = xmldom;
Vue.prototype.xpath = xpath;
window.utools.onPluginReady(() => {
    window.set_initialization();
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
})
