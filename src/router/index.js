import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/text',
        name: 'text',
        component: () => import("../views/text")
    },
    {
        path: "/",
        name: "search",
        component: () => import("../views/search")
    },
    {
        path: "/novel/:nid",
        name: "novel",
        component: () => import("../views/novel")
    },
    {
        path: "/content/:nid/:cid",
        name: 'content',
        component: () => import("../views/content")
    },
    {
        path: "/bookshelf",
        name: 'bookshelf',
        component: () => import("../views/bookshelf")
    }
];

const router = new VueRouter({
    routes
});

export default router
