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
    },
    {
        path: "/read_file",
        name: "read_file",
        component: () => import("../views/read_file")
    }
];

const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    if (to.name === "search") {
        if (to.query.type === undefined) {
            next({name: "search", query: {type: "1"}})
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
