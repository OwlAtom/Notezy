import { createRouter, createWebHistory } from "vue-router";
const LandingView = () => import("../views/LandingView.vue");
const Dashboard = () => import("../views/Dashboard.vue");
const TodoOverview = () => import("../views/TodoOverview.vue");
const FoldersView = () => import("../views/FoldersView.vue");
const GoalsView = () => import("../views/GoalsView.vue");
const TodoListView = () => import("../views/TodoListView.vue");
const DocumentsView = () => import("../views/DocumentsView.vue");
const DocumentView = () => import("../views/DocumentView.vue");

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
    path: "/folders",
    name: "Folders",
    component: FoldersView,
  },
  {
    path: "/folder/:id",
    name: "Documents",
    component: DocumentsView,
  },
  {
    path: "/folder/:folderID/document/:id",
    name: "Document",
    component: DocumentView,
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
