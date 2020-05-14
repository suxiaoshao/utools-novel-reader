import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./app.scss"
import history from "./util/history";

Vue.prototype.myHistory = history
Vue.config.productionTip = false;
window.utools.onPluginReady(() => {
    window.set_initialization();
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
})
// new Vue({
//     router,
//     render: h => h(App)
// }).$mount('#app');