import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, User } from "@/plugins/api.js";
import { snackBarController } from "@/components/snack-bar/snack-bar-controller.js";
import { loadingController } from "@/components/global-loading/global-loading-controller.js";
export const managementStore = defineStore("management", () => {
  const loading = loadingController(); //store
  const snackbar = snackBarController(); //store

  const sortBy = ref("");
  const bearerToken = ref("");

  const userList = ref([]);

  const usersPerPage = ref(10);
  const userPage = ref(1);

  async function fetchUser() {
    try {
      loading.increaseRequest();
      const res = await User.fetchUser(this.bearerToken.jwt);
      if (!res) {
        snackbar.commonError(`Error occurred! Please try again later!`);
        return;
      }
      snackbar.success("Fetch successfully!");
      this.userList = res.data;
    } catch (error) {
      console.error(`Error: ${error}`);
      snackbar.commonError(error);
    }
  }
  const slicedUserList = computed(() => {
    if (!filterUserList.value) return [];
    return filterUserList.value.slice(
      (userPage.value - 1) * usersPerPage.value,
      userPage.value * usersPerPage.value
    );
  });

  const totalUserPage = computed(() => {
    if (!filterUserList.value || filterUserList.value.length == 0) return 1;
    if (filterUserList.value.length % usersPerPage.value == 0)
      return filterUserList.value.length / usersPerPage.value;
    else
      return Math.floor(filterUserList.value.length / usersPerPage.value) + 1;
  });

  const filterUserList = computed(() => {
    let filterList = [];
    if ((sortBy.value = "asc")) {
      filterList = userList.value.sort((a, b) => b.title - a.title);
    } else if ((sortBy.value = "desc")) {
      filterList = userList.value.sort((a, b) => a.title - b.title);
    } else if ((sortBy.value = "priceUp")) {
      filterList = userList.value.sort((a, b) => a.price - b.price);
    } else if ((sortBy.value = "priceDown")) {
      filterList = userList.value.sort((a, b) => b.price - a.price);
    } else {
      filterList = userList.value.sort((a, b) => b.id - a.id);
    }
    return filterList;
  });
  return {
    //computed
    filterUserList,
    slicedUserList,
    totalUserPage,
    //states
    bearerToken,
    userList,
    usersPerPage,
    userPage,
    sortBy,
    //action

    fetchUser,
  };
});
/* eslint-enable */
