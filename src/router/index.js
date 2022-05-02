import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import TodoView from "../views/TodoView.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingView,
  },
  {
    path: "/",
    name: "Home",
    component: Dashboard,
  },
  {
    path: "/todo",
    name: "Todo",
    component: TodoView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/UserLogout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
