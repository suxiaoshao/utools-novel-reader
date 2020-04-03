import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from "axios"

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
