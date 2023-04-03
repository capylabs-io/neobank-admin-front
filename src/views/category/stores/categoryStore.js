import { defineStore } from "pinia";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Common, Category } from "@/plugins/api";
import moment from "moment";

export const categoryStore = defineStore("category", {
  state: () => ({
    createCategoryDialog: false,
    categoryName: "",
    categoryIcon: null,
    categories: [],
    categoriesPerPage: 10,
    categoryPage: 1,
    searchKey: "",
  }),
  getters: {
    filteredCategories() {
      if (!this.categories || this.categories.length == 0) return [];
      if (!this.searchKey) return this.categories;
      return this.categories.filter((category) =>
        category.name.toLowerCase().includes(this.searchKey.trim().toLowerCase())
      );
    },
    slicedCategories() {
      if (!this.categories || this.categories.length == 0) return [];
      return this.filteredCategories.slice(
        (this.categoryPage - 1) * this.categoriesPerPage,
        this.categoryPage * this.categoriesPerPage
      );
    },
    totalCategoryPage() {
      if (!this.categories || this.categories.length == 0) return 1;
      if (this.filteredCategories.length % this.categoriesPerPage == 0)
        return this.filteredCategories.length / this.categoriesPerPage;
      else return Math.floor(this.filteredCategories.length / this.categoriesPerPage) + 1;
    },
    isValidCategoryInput() {
      if (!this.categoryIcon || !this.categoryName) return false;
      return true;
    },
  },
  actions: {
    toggleCreateDialog(active) {
      this.createCategoryDialog = active;
    },
    changeCategoryIcon(image) {
      if (!image) return;
      this.categoryIcon = image;
    },
    async fetchCategories() {
      try {
        loading.show();
        const res = await Category.fetch();
        if (!res) {
          alert.error("Error occurred when fetching categories!", "Please try again later!");
          return;
        }
        const categories = get(res, "data.data", []);
        if (!categories && categories.length == 0) return;
        const mappedCategories = categories.map((category) => {
          return {
            id: category.id,
            createdAt: get(category, "attributes.createdAt", moment.now()),
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
    async uploadFile() {
      try {
        loading.show();
        if (!this.categoryIcon) {
          throw new Error("Please select category icon!");
        }
        const formData = new FormData();
        formData.append("files", this.categoryIcon);
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
    async createNewCategory() {
      try {
        loading.show();
        const uploadedIconUrl = await this.uploadFile();
        if (!uploadedIconUrl) {
          alert.error("Error occurred when uploading icon!", "Please try again later!");
          return;
        }
        const res = await Category.create({
          data: {
            name: this.categoryName,
            iconUrl: uploadedIconUrl,
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Create new Category successfully!");
        this.createCategoryDialog = false;
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
