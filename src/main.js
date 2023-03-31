/* eslint-disable vue/multi-word-component-names */
import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import { createPinia, PiniaVuePlugin } from "pinia";
import { markRaw } from "vue";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VueApexCharts from "vue-apexcharts";
//Plugins
import alert from "@/plugins/alert";
import loading from "@/plugins/loading";
import PluginHelper from "@/helpers/PluginHelper";
import utils from "@/plugins/utils";
import dialog from "@/plugins/dialog";
import moment from "moment";
import { rules } from "@/plugins/rules";
import { vueFilterRegister } from "@/plugins/filter";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
Vue.config.productionTip = false;
Vue.use(PiniaVuePlugin);
Vue.use(
  PluginHelper.create({
    $utils: utils,
    $rules: rules,
    $dialog: dialog,
    $alert: alert,
    $loading: loading,
    $baseUrl: process.env.VUE_APP_API_ENDPOINT,
    $moment: moment,
  })
);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.use(pinia);

vueFilterRegister();

new Vue({
  created() {
    AOS.init();
  },
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
