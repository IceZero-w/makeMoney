import Vue from "vue";
import VueRouter from "vue-router";
import routeList from "./getRouteAuto.js";

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  ...routeList
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
