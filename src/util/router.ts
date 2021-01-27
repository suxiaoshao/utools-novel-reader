import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/test',
        name: 'test',
        component: () => import("../views/test.vue")
    },
    {
        path: "/search",
        name: "search",
        component: () => import("../views/search.vue")
    },
    {
        path: "/novel/:nid",
        name: "novel",
        component: () => import("../views/novel.vue")
    },
    {
        path: "/content/:nid/:cid",
        name: 'content',
        component: () => import("../views/content.vue")
    },
    {
        path: "/bookshelf",
        name: 'bookshelf',
        component: () => import("../views/bookshelf.vue")
    },
    {
        path: "/read_file",
        name: "read_file",
        component: () => import("../views/read_file.vue")
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
