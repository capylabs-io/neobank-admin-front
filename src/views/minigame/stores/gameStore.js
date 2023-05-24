import { defineStore } from "pinia";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Campaign, Maintainer, Category, Common, Partner } from "@/plugins/api";
import router from "@/router";
import { userStore } from "@/stores/userStore";

export const gameStore = defineStore("game", {
  state: () => ({
    isEditing: false,
    rewardType: [
      {
        title: "Point",
        value: "1",
      },
      {
        title: "Ticket",
        value: "2",
      },
      {
        title: "Voucher",
        value: "3",
      },
    ],
    campaignForm: false,
    campaign: {},
    campaigns: [],
    campaignsPerPage: 6,
    campaignPage: 1,
    campaignInputAvatar: null,
    searchKey: "",
    isEditing: false,
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
    transactions: [],
    transactionsPerPage: 10,
    transactionPage: 1,
    transactionSearchKey: "",
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
    filteredCampaigns() {
      if (!this.campaigns || this.campaigns.length == 0) return [];
      let filtered = this.sortedCampaigns;
      if (this.searchKey)
        filtered = filtered.filter((campaign) =>
          campaign.title
            .toLowerCase()
            .includes(this.searchKey.trim().toLowerCase())
        );
      if (this.filterStatus && this.filterStatus != "all") {
        filtered = filtered.filter(
          (campaign) => campaign.status == this.filterStatus
        );
      }
      if (this.filterPartner && this.filterPartner.length > 0) {
        const filterIds = this.filterPartner.map((filter) => filter.id);
        filtered = filtered.filter(
          (campaign) =>
            campaign.partner && filterIds.includes(campaign.partner.id)
        );
      }
      if (this.filterCategory && this.filterCategory.length > 0) {
        const filterIds = this.filterCategory.map((filter) => filter.id);
        filtered = filtered.filter(
          (campaign) =>
            campaign.campaignCategory &&
            filterIds.includes(campaign.campaignCategory.id)
        );
      }
      return filtered;
    },
    sortedCampaigns() {
      if (!this.campaigns || this.campaigns.length == 0) return [];
      let sortedCampaigns = this.campaigns;
      if (!this.sortBy) return sortedCampaigns;
      switch (this.sortBy) {
        default:
        case "createdAt desc":
          sortedCampaigns.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          break;
        case "createdAt asc":
          sortedCampaigns.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          break;
        case "purchasedQuantity asc":
          sortedCampaigns.sort(
            (a, b) => a.purchasedQuantity - b.purchasedQuantity
          );
          break;
        case "purchasedQuantity desc":
          sortedCampaigns.sort(
            (a, b) => b.purchasedQuantity - a.purchasedQuantity
          );
          break;
        case "totalQuantity asc":
          sortedCampaigns.sort((a, b) => a.totalQuantity - b.totalQuantity);
          break;
        case "totalQuantity desc":
          sortedCampaigns.sort((a, b) => b.totalQuantity - a.totalQuantity);
          break;
        case "expiredDate desc":
          sortedCampaigns.sort(
            (a, b) =>
              new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
          );
          break;
        case "expiredDate asc":
          sortedCampaigns.sort(
            (a, b) =>
              new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
          );
          break;
      }
      return sortedCampaigns;
    },
    slicedCampaigns() {
      if (!this.campaigns || this.campaigns.length == 0) return [];
      return this.filteredCampaigns.slice(
        (this.campaignPage - 1) * this.campaignsPerPage,
        this.campaignPage * this.campaignsPerPage
      );
    },
    totalCampaignPage() {
      if (!this.campaigns || this.filteredCampaigns.length == 0) return 1;
      if (this.filteredCampaigns.length % this.campaignsPerPage == 0)
        return this.filteredCampaigns.length / this.campaignsPerPage;
      else
        return (
          Math.floor(this.filteredCampaigns.length / this.campaignsPerPage) + 1
        );
    },
    filteredTransactions() {
      if (!this.transactions || this.transactions.length == 0) return [];
      if (!this.transactionSearchKey) return this.transactions;
      return this.transactions.filter(
        (transaction) =>
          transaction.code
            .toLowerCase()
            .includes(this.transactionSearchKey.trim().toLowerCase()) ||
          get(transaction.user, "data.attributes.username", "")
            .toLowerCase()
            .includes(this.transactionSearchKey.trim().toLowerCase())
      );
    },
    slicedTransactions() {
      if (!this.transactions || this.transactions.length == 0) return [];
      return this.filteredTransactions.slice(
        (this.transactionPage - 1) * this.transactionsPerPage,
        this.transactionPage * this.transactionsPerPage
      );
    },
    totalTransactionPage() {
      if (!this.transactions || this.filteredTransactions.length == 0) return 1;
      if (this.filteredTransactions.length % this.transactionsPerPage == 0)
        return this.filteredTransactions.length / this.transactionsPerPage;
      else
        return (
          Math.floor(
            this.filteredTransactions.length / this.transactionsPerPage
          ) + 1
        );
    },
  },
  actions: {
    changeCampaignThumbnail(image) {
      if (!image) return;
      this.campaignInputAvatar = image;
    },
    changeVoucherDuration(date) {
      if (!this.campaign || !date || date.length < 2) return;
      this.campaign.startDate = date[0];
      this.campaign.endDate = date[1];
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
    async fetchCampaign(campaignId) {
      try {
        loading.show();
        const res = await Campaign.fetchCampaignDetail(campaignId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const campaign = get(res, "data.data", null);
        this.campaign = {
          id: campaign.id,
          ...campaign.attributes,
        };
        if (this.campaign.campaignCategory)
          this.campaign.campaignCategory = {
            id: this.campaign.campaignCategory.data.id,
            ...this.campaign.campaignCategory.data.attributes,
          };
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async fetchCampaigns() {
      try {
        loading.show();
        const user = userStore();
        let res = null;
        console.log("user", user);
        if (user.isMaintainer) res = await Maintainer.fetchCampaigns();
        else if (user.isPartner) res = await Partner.fetchPartnerCampaigns();
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const campaigns = get(res, "data", []);
        if (!campaigns && campaigns.length == 0) return;
        this.campaigns = campaigns;
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await Category.fetch();
        if (!res) {
          alert.error(
            "Error occurred when fetching categories!",
            "Please try again later!"
          );
          return;
        }
        const categories = get(res, "data.data", []);
        if (!categories && categories.length == 0) return;
        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            name: get(category, "attributes.name", "Category Name"),
            icon: get(category, "attributes.iconUrl", ""),
          };
        });
        this.categories = mappedCategories;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async fetchPartners() {
      try {
        loading.show();
        const res = await Maintainer.fetchPartnerList();
        if (!res) {
          alert.error(
            "Error occurred when fetching partners!",
            "Please try again later!"
          );
          return;
        }
        const partners = get(res, "data", []);
        if (!partners && partners.length == 0) return;
        this.partners = partners;
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async fetchCampaignTransactions() {
      try {
        loading.show();
        if (!this.campaign || !this.campaign.id) return;
        const res = await Campaign.fetchCampaignTransactions(this.campaign.id);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const transactions = get(res, "data.data", []);
        if (!transactions && transactions.length == 0) return;
        this.transactions = transactions.map((transaction) => {
          return {
            id: transaction.id,
            ...transaction.attributes,
          };
        });
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async uploadFile() {
      try {
        loading.show();
        if (!this.campaignInputAvatar) {
          throw new Error("Please select category icon!");
        }
        const formData = new FormData();
        formData.append("files", this.campaignInputAvatar);
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
    async updateCampaign() {
      try {
        loading.show();
        if (!this.campaign || !this.campaign.id) return;
        let uploadedThumbnailUrl = this.campaign.thumbnailUrl;
        if (this.campaignInputAvatar) {
          const res = await this.uploadFile();
          if (!res) {
            alert.error(
              "Error occurred when uploading icon!",
              "Please try again later!"
            );
            return;
          }
          uploadedThumbnailUrl = res;
        }
        const res = await Campaign.update(this.campaign.id, {
          data: {
            ...this.campaign,
            thumbnailUrl: uploadedThumbnailUrl,
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const updatedCampaign = get(res, "data.data", {});
        this.campaign = {
          id: updatedCampaign.id,
          ...updatedCampaign.attributes,
        };
        this.isEditing = false;
        alert.success("Update Campaign Detail successfully!");
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async disableCampaign() {
      try {
        loading.show();
        if (!this.campaign || !this.campaign.id) return;
        const res = await Campaign.update(this.campaign.id, {
          data: {
            status: "disabled",
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const updatedCampaign = get(res, "data.data", {});
        this.campaign = {
          id: updatedCampaign.id,
          ...updatedCampaign.attributes,
        };
        alert.success("Disable campaign successfully!");
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
    async createCampaign() {
      try {
        loading.show();
        const user = userStore();
        let uploadedThumbnailUrl = "";
        if (this.campaignInputAvatar) {
          const res = await this.uploadFile();
          if (!res) {
            alert.error(
              "Error occurred when uploading icon!",
              "Please try again later!"
            );
            return;
          }
          uploadedThumbnailUrl = res;
        }
        console.log("this.campaign", this.campaign);
        const res = await Campaign.create({
          data: {
            ...this.campaign,
            thumbnailUrl: uploadedThumbnailUrl,
            status: "active",
            isActive: true,
            campaignCategory: get(this.campaign, "campaignCategory.id", null),
            partner: user.partner ? user.partner.id : {},
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const updatedCampaign = get(res, "data.data", {});
        this.campaign = {
          id: updatedCampaign.id,
          ...updatedCampaign.attributes,
        };
        alert.success("Create campaign successfully!");
        router.push("/campaign");
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
  },
});
