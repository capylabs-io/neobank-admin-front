import { defineStore } from "pinia";
import { get, toInteger } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Common, Maintainer, Partner } from "@/plugins/api";
import router from "@/router";
import { userStore } from "@/stores/userStore";
import { partnerStore } from "@/views/partner/stores/partnerStore";

export const dashBoardStore = defineStore("dashBoard", {
  state: () => ({
    dashboard: [],
    partnerDashboard: [],
    pieLabels: [],
    pieSeries: [],
    partnerPieSeries: [],
    lineSeries: [],
    lineCategory: [],
    banner: null,
    changeBannerDialog: false,
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
    changePartnerAvatar(image) {
      if (!image) return;
      this.banner = image;
      console.log("banner", this.banner);
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

          this.lineSeries = dashboard.newUserEachMonth.map((data) =>
            parseInt(data.value)
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

    async uploadFile() {
      try {
        loading.show();
        if (!this.banner) {
          throw new Error("Please select partner avatar!");
        }
        const formData = new FormData();
        formData.append("files", this.banner);
        const res = await Common.uploadFile(formData);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const uploadedUrls = res.data.map((data) => data.url);
        if (!uploadedUrls || uploadedUrls.length == 0) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Upload Image successfully!");
        return uploadedUrls[0];
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async updateBanner() {
      try {
        loading.show();
        const user = userStore();
        if (!user.partner) return;
        if (this.banner) {
          const res = await this.uploadFile();
          if (!res) {
            alert.error(
              "Error occurred when uploading image!",
              "Please try again later!"
            );
            return;
          }
          user.partner.bannerUrl = res;
        }
        const res = await Partner.update(user.partner.id, {
          data: {
            ...user.partner,
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const partner = get(res, "data.data", {});
        user.partner = {
          ...partner.attributes,
          id: partner.id,
        };
        console.log("user-partner", user.partner);

        this.changeBannerDialog = false;
        alert.success("Update information successfully!", "");
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
  },
});
