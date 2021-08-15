import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            alias: "/paketumroh",
            name: "paketumroh",
            component: () => import("./components/PaketUmrohList")
        },
        {
            path: "/paketumroh/:slug",
            name: "paketumroh-details",
            component: () => import("./components/PaketUmroh")
        },
        {
            path: "/add",
            name: "add",
            component: () => import("./components/AddPaketUmroh")
        },
    ]
});