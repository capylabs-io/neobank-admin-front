import { defineStore } from "pinia";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Partner, User, Common, Maintainer, Voucher } from "@/plugins/api";

export const userManagerStore = defineStore("userManager", {
  state: () => ({
    users: [],
    usersPerPage: 10,
    userPage: 1,
    searchKey: "",
    user: {},
    transactions: [],
    transactionsPerPage: 10,
    transactionPage: 1,
    transactionSearchKey: "",
    showTransactionCampaign: false,
    currentCampaign: {},
  }),
  getters: {
    filteredUsers() {
      if (!this.users || this.users.length == 0) return [];
      if (!this.searchKey) return this.users;
      return this.users.filter(
        (user) =>
          user.username.toLowerCase().includes(this.searchKey.trim().toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchKey.trim().toLowerCase())
      );
    },
    slicedUsers() {
      if (!this.users || this.users.length == 0) return [];
      return this.filteredUsers.slice(
        (this.userPage - 1) * this.usersPerPage,
        this.userPage * this.usersPerPage
      );
    },
    totalUserPage() {
      if (!this.users || this.users.length == 0) return 1;
      if (this.filteredUsers.length % this.usersPerPage == 0)
        return this.filteredUsers.length / this.usersPerPage;
      else return Math.floor(this.filteredUsers.length / this.usersPerPage) + 1;
    },
    filteredTransactions() {
      if (!this.transactions || this.transactions.length == 0) return [];
      if (!this.transactionSearchKey) return this.transactions;
      return this.transactions.filter(
        (transaction) =>
          transaction.code.toLowerCase().includes(this.transactionSearchKey.trim().toLowerCase()) ||
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
      else return Math.floor(this.filteredTransactions.length / this.transactionsPerPage) + 1;
    },
  },
  actions: {
    async fetchUsers() {
      try {
        loading.show();
        const res = await Maintainer.fetchUsers();
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.users = get(res, "data", []);
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchUser(userId) {
      if (!userId) return;
      try {
        loading.show();
        const res = await User.fetchOne(userId);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.user = get(res, "data", {});
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async disableUser() {
      if (!this.user) return;
      try {
        loading.show();
        const res = await User.update(this.user.id, {
          blocked: true,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.user = get(res, "data", {});
        alert.success("Disable account successfully!");
        await this.fetchUser(this.user.id);
        await this.fetchUserVouchers(this.user.id);
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async fetchUserVouchers(userId) {
      try {
        loading.show();
        if (!userId) return;
        const res = await Voucher.fetchUserVouchers(userId);
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
            campaign: {
              id: transaction.attributes.campaign.data.id,
              ...transaction.attributes.campaign.data.attributes,
            },
            category: {
              id: transaction.attributes.campaignCategory.data.id,
              ...transaction.attributes.campaignCategory.data.attributes,
            },
          };
        });
        console.log("transactions", this.transactions);
      } catch (error) {
      } finally {
        loading.hide();
      }
    },
  },
});
