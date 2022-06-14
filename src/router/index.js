import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("../views/LandingView.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/todo",
    name: "Todo",
    component: () => import("../views/TodoOverview.vue"),
  },
  {
    path: "/todoList/:id",
    name: "TodoList",
    component: () => import("../views/TodoListView.vue"),
  },
  {
    path: "/folders",
    name: "Folders",
    component: () => import("../views/FoldersView.vue"),
  },
  {
    path: "/folder/:id",
    name: "Documents",
    component: () => import("../views/DocumentsView.vue"),
  },
  {
    path: "/folder/:folderID/document/:id",
    name: "Document",
    component: () => import("../views/DocumentView.vue"),
  },
  {
    path: "/goals",
    name: "Goals",
    component: () => import("../views/GoalsView.vue"),
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
