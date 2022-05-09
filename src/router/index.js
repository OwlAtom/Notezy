import { createRouter, createWebHistory } from "vue-router";
import LandingView from "../views/LandingView.vue";
import Dashboard from "../views/Dashboard.vue";
import TodoOverview from "../views/TodoOverview.vue";
import NotesView from "../views/NotesView.vue";
import GoalsView from "../views/GoalsView.vue";
import TodoListView from "../views/TodoListView.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingView,
  },
  {
    path: "/home",
    name: "Home",
    component: Dashboard,
  },
  {
    path: "/todo",
    name: "Todo",
    component: TodoOverview,
  },
  {
    path: "/todoList/:id",
    name: "TodoList",
    component: TodoListView,
  },
  {
    path: "/notes",
    name: "Notes",
    component: NotesView,
  },
  {
    path: "/goals",
    name: "Goals",
    component: GoalsView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
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
