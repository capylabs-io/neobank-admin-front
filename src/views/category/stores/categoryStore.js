import { defineStore } from "pinia";

export const categoryStore = defineStore("category", {
  state: () => ({
    createCategoryDialog: false,
  }),
  getters: {},
  actions: {
    toggleCreateDialog(active) {
      this.createCategoryDialog = active;
    },
  },
});
