import Vue from "vue";
import VueRouter from "vue-router";
// import i18n from "@/i18n";
Vue.use(VueRouter);
const routes = [
  {
    path: "",
    redirect: `/login`,
  },
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
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
// router.beforeEach((to, from, next) => {
//   // use the language from the routing param or default language
//   let language = to.params.lang;
//   if (!language) {
//     language = "en";
//   }
//   // set the current language for i18n.
//   i18n.locale = language;
//   next();
// });

export default router;
