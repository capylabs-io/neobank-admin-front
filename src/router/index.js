import Vue from "vue";
import VueRouter from "vue-router";
import { userStore } from "../stores/userStore";

// import i18n from "@/i18n";
Vue.use(VueRouter);
const routes = [
  {
    path: "/redeem",
    name: "Redeem",
    component: () => import("../views/redeem/pages/Redeem.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/pages/login-admin.vue"),
  },
  {
    path: "/",
    name: "MainLayout",
    component: () => import("../views/MainLayout.vue"),
    children: [
      {
        path: "/campaign",
        name: "Campaign Management",
        component: () =>
          import("../views/campaign/pages/CampaignDashboard.vue"),
      },
      {
        path: "/category",
        name: "Category Management",
        component: () =>
          import("../views/category/pages/CategoryDashboard.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  // const auth = userStore();
  // if (to.meta && to.meta.requiresAuth && auth.isConnected) {
  //   return "/login";
  // }
  next();
});

export default router;
