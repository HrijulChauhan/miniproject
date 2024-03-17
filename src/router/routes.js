import { createRouter, createWebHistory } from "vue-router";

const routes = [{ path: '/home/:id', name: "home", component: () => import("../views/Home.vue") },
{ path: "/login", name: "login", component: () => import("../views/login.vue") },
{ path: "/signup", name: "signup", component: () => import("../views/signup.vue") },
{ path: "/projects", name: "projects", component: () => import("../views/projects.vue") },
{ path: "/profile", name: "profile", component: () => import("../views/profile.vue") }];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
