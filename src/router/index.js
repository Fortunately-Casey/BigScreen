import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: resolve => require(["../views/index/index.vue"], resolve)
  },
  {
    path: "/bigscreen",
    name: "bigscreen",
    component: resolve => require(["../views/bigscreen/bigscreen.vue"], resolve)
  },
  {
    path: "/importStaff",
    name:"importStaff",
    component: resolve => require(["../views/importStaff/ImportStaff.vue"], resolve)
  }
];
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new VueRouter({
  linkActiveClass: "",
  linkExactActiveClass: "",
  routes: routes
});

export default router;