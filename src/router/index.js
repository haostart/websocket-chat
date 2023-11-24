import Home from "../views/Home.vue";
import { createRouter as _createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      keepAlive: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      keepAlive: false,
    },
    component: () =>
      import( "../views/Login.vue"),
  },
  // {
  //   path: "/chat",
  //   name: "ChatBar",
  //   component: () => import("../views/Chat.vue"),
  // },
  // {
  //   path: "/test",
  //   name: "Test",
  //   component: () => import("../views/Test.vue"),
  // },
  // {
  //   path: "/aaa",
  //   name: "aaa",
  //   component: () => import("../views/AAA.vue"),
  // },
];

const router = new _createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
