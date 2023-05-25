import { defineStore } from "pinia";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Game, Maintainer, Category, Common, Partner } from "@/plugins/api";
import router from "@/router";
import { userStore } from "@/stores/userStore";

export const gameStore = defineStore("game", {
  state: () => ({
    isEditing: false,
    rewardType: [
      {
        title: "Point",
        value: "Point",
      },
      {
        title: "Ticket",
        value: "Ticket",
      },
      {
        title: "Voucher",
        value: "Voucher",
      },
    ],
    GameForm: false,
    Game: {},
    Games: [],
    GamesPerPage: 6,
    GamePage: 1,
    GameInputAvatar: null,
    searchKey: "",
    isConfigEditing: false,
    categories: [],
    partners: [],
    sortBy: "",
    sortSelection: [
      {
        title: "Newest",
        value: "createdAt desc",
      },
      {
        title: "Oldest",
        value: "createdAt asc",
      },
      {
        title: "Expired Date DESC",
        value: "expiredDate desc",
      },
      {
        title: "Expired Date ASC",
        value: "expiredDate asc",
      },
      {
        title: "Purchased Quantity Lowest",
        value: "purchasedQuantity asc",
      },
      {
        title: "Purchased Quantity Highest",
        value: "purchasedQuantity desc",
      },
      {
        title: "Total Quantity Lowest",
        value: "totalQuantity asc",
      },
      {
        title: "Total Quantity Highest",
        value: "totalQuantity desc",
      },
    ],
    filterStatus: "",
    filterStatusSelection: [
      {
        title: "All",
        value: "all",
      },
      {
        title: "New Deal",
        value: "newDeal",
      },
      {
        title: "Hot",
        value: "hot",
      },
      {
        title: "Expired",
        value: "expired",
      },
      {
        title: "Disabled",
        value: "disabled",
      },
      {
        title: "Active",
        value: "active",
      },
      {
        title: "Out of Stock",
        value: "outOfStock",
      },
    ],
    filterPartner: [],
    filterCategory: [],
    statusSelection: [
      {
        title: "New Deal",
        value: "New deal",
      },
      {
        title: "Hot",
        value: "hot",
      },
      {
        title: "Expired",
        value: "expired",
      },
      {
        title: "Disabled",
        value: "disabled",
      },
      {
        title: "Active",
        value: "active",
      },
      {
        title: "Out of Stock",
        value: "outOfStock",
      },
    ],
    dataConfig: [],
  }),
  getters: {
    filters() {
      return [
        ...this.filterPartner.map((filter) => {
          return {
            filterName: filter.brandName,
            filterType: "partner",
            id: filter.id,
          };
        }),
        ...this.filterCategory.map((filter) => {
          return {
            filterName: filter.name,
            filterType: "category",
            id: filter.id,
          };
        }),
      ];
    },
    filteredGames() {
      if (!this.Games || this.Games.length == 0) return [];
      let filtered = this.sortedGames;
      if (this.searchKey)
        filtered = filtered.filter((Game) =>
          Game.title.toLowerCase().includes(this.searchKey.trim().toLowerCase())
        );
      return filtered;
    },
    sortedGames() {
      if (!this.Games || this.Games.length == 0) return [];
      let sortedGames = this.Games;
      if (!this.sortBy) return sortedGames;
      switch (this.sortBy) {
        default:
        case "createdAt desc":
          sortedGames.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "createdAt asc":
          sortedGames.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "name asc":
          sortedGames.sort((a, b) => a.name - b.name);
          break;
        case "name desc":
          sortedGames.sort((a, b) => b.name - a.name);
          break;
      }
      return sortedGames;
    },
    slicedGames() {
      if (!this.Games || this.Games.length == 0) return [];
      return this.filteredGames.slice(
        (this.GamePage - 1) * this.GamesPerPage,
        this.GamePage * this.GamesPerPage
      );
    },
    totalGamePage() {
      if (!this.Games || this.filteredGames.length == 0) return 1;
      if (this.filteredGames.length % this.GamesPerPage == 0)
        return this.filteredGames.length / this.GamesPerPage;
      else return Math.floor(this.filteredGames.length / this.GamesPerPage) + 1;
    },
  },
  actions: {
    changeGameThumbnail(image) {
      if (!image) return;
      this.GameInputAvatar = image;
    },
    changeVoucherDuration(date) {
      if (!this.Game || !date || date.length < 2) return;
      this.Game.startDate = date[0];
      this.Game.endDate = date[1];
    },
    removeFilter(removedFilter) {
      if (!removedFilter) return;
      if (removedFilter.filterType == "partner") {
        const indexOfObject = this.filterPartner.findIndex((filter) => {
          return removedFilter.id == filter.id;
        });
        this.filterPartner.splice(indexOfObject, 1);
      } else if (removedFilter.filterType == "category") {
        const indexOfObject = this.filterCategory.findIndex((filter) => {
          return removedFilter.id == filter.id;
        });
        this.filterCategory.splice(indexOfObject, 1);
      }
    },
    async fetchGameConfigs() {
      try {
        loading.show();
        const res = await Common.fetchGameConfigs();
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const config = get(res, "data.data", []);
        console.log("config", config);
        if (!config && config.length == 0) return;
        const mappedConfig = config.map((config) => {
          return {
            id: config.id,
            ...config.attributes,
          };
        });
        this.Games = mappedConfig;
        console.log("data fetch ", this.Games);
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async fetchGameConfig(gameCode) {
      try {
        loading.show();
        const res = await Common.fetchGameConfig(gameCode);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }

        const config = get(res, "data.data", null);
        if (!config && config.length == 0) return;
        this.Game = {
          id: config[0].id,
          ...config[0].attributes,
        };
        let fieldsConfig = [];
        if (config[0].attributes.config) {
          fieldsConfig = Object.keys(config[0].attributes.config).filter(
            (key) => key == "balls"
          );
        }
        console.log(
          "key",
          Object.keys(config[0].attributes.config).filter(
            (key) => key == "balls"
          )
        );
        this.dataConfig = config[0].attributes.data.balls;
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async updateGameConfig(gameCode) {
      try {
        loading.show();
        const res = await Common.updateGameConfig(gameCode, {
          data: {
            ...this.Game,
            data: {
              balls: this.dataConfig,
            },
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.isConfigEditing = false;
        this.fetchGameConfig(gameCode);
        alert.success("update successfully!");
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async uploadFile() {
      try {
        loading.show();
        if (!this.GameInputAvatar) {
          throw new Error("Please select category icon!");
        }
        const formData = new FormData();
        formData.append("files", this.GameInputAvatar);
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
  },
});
