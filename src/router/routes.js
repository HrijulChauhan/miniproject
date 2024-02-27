import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: "/", name: "home", component: () => import("../views/Home.vue") },
{ path: "/trial", name: "trial", component: () => import("../views/trial.vue") },
{ path: "/signin", name: "signin", component: () => import("../views/signin.vue") }];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
