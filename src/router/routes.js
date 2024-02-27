import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: "/", name: "home", component: () => import("../views/Home.vue") },
{ path: "/login", name: "login", component: () => import("../views/login.vue") },
{ path: "/signup", name: "signup", component: () => import("../views/signup.vue") }];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
