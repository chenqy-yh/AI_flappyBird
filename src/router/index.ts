import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/home.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("@/views/test.vue"),
    },
  ],
});

export default router;
