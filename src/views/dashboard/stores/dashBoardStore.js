import { defineStore } from "pinia";
import { get, toInteger } from "lodash-es";
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
    lineCategory: [],
  }),
  getters: {},
  actions: {
    getMonth(number) {
      if (number == 1) return "Jan";
      else if (number == 2) return "Feb";
      else if (number == 3) return "Mar";
      else if (number == 4) return "Apr";
      else if (number == 5) return "May";
      else if (number == 6) return "Jun";
      else if (number == 7) return "Jul";
      else if (number == 8) return "Feb";
      else if (number == 9) return "Aug";
      else if (number == 10) return "Sep";
      else if (number == 11) return "Oct";
      else return "Dec";
    },
    async fetchMaintainerDashBoard() {
      try {
        loading.show();
        const res = await Maintainer.fetchDashBoard();
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const dashboard = get(res, "data", []);
        if (!dashboard && dashboard.length == 0) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        } else {
          this.dashboard = dashboard;
          console.log("dashboard", this.dashboard);
          this.pieLabels = dashboard.numberOfCampaignsEachCategory.map(
            (data) => data.name
          );

          this.pieSeries = dashboard.numberOfCampaignsEachCategory.map(
            (data) => data.campaigns.count
          );

          this.lineSeries = dashboard.newUserEachMonth.map(
            (data) => parseInt(data.value)
          );
          console.log("lineSeries", this.lineSeries);
          this.lineCategory = dashboard.newUserEachMonth.map((data) =>
            this.getMonth(data.month)
          );
          console.log("lineCategory", this.lineCategory);
        }
      } catch (error) {
        alert.error("Error occured! Error: " + error);
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
        console.log("partnerDashboard", this.partnerDashboard);

        this.pieLabels = dashboard.numberOfCampaignEachCategory.map(
          (data) => data.name
        );
        console.log("pieLabels", this.pieLabels);

        this.pieSeries = dashboard.numberOfCampaignEachCategory.map(
          (data) => data.value
        );
        console.log("pieSeries", this.pieSeries);
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
  },
});
