import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main/indexPage.vue"),
    // meta: { title: "社保应用" },
  },
  {
    path: "/testModal",
    name: "TestModal",
    component: () => import("../views/Model/indexPage.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
