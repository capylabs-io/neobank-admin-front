import { defineStore } from "pinia";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Maintainer, Partner } from "@/plugins/api";
import router from "@/router";
import { userStore } from "@/stores/userStore";

export const dashBoardStore = defineStore("dashBoard", {
  state: () => ({
    dashboard: [],
    partnerDashboard: [],
    pieLabels: [],
    pieSeries: [],
    partnerPieSeries: [],
    lineSeries: [],
  }),
  getters: {},
  actions: {
    async fetchMaintainerDashBoard() {
      try {
        loading.show();
        const res = await Maintainer.fetchDashBoard();
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const dashboard = get(res, "data", []);
        if (!dashboard && dashboard.length == 0) return;
        this.dashboard = dashboard;
        this.pieLabels = dashboard.numberOfCampaignsEachCategory.map(
          (data) => data.name
        );
        this.pieSeries = dashboard.numberOfCampaignsEachCategory.map(
          (data) => data.campaigns.count
        );
        this.lineSeries = dashboard.newUserEachMonth.map((data) => data.value);
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async fetchPartnerDashBoard() {
      try {
        loading.show();
        const res = await Partner.fetchDashBoard();
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const dashboard = get(res, "data", []);
        if (!dashboard && dashboard.length == 0) return;
        this.partnerDashboard = dashboard;
        // this.pieLabels = dashboard.numberOfCampaignsEachCategory.map(
        //   (data) => data.name
        // );
        // this.partnerPieSeries = dashboard.numberOfCampaignsEachCategory.map(
        //   (data) => data.campaigns.count
        // );
        
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
  },
});
