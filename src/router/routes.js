import Home from "pages/Home.vue"
import Todo from "pages/Todo.vue"
import Calendar from "pages/Calendar.vue"


const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: Home },
      { path: "/todo", component: Todo },
      { path: "/home", component: () => Home },
      { path: "/calendar", component: () => Calendar },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
