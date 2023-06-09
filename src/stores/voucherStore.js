import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, Voucher } from "@/plugins/api.js";
export const voucherStore = defineStore(
  "voucher",
  () => {
    // const drawer = ref(false);
    // const drawerDetail = ref(false);
    // const cfDialog = ref(false);
    // const partnerDialog = ref(false);
    // const userDetail = ref(false);
    // const partnerDetail = ref(false);

    // const pageIndex = ref(1);
    // const index = ref(2);
    // const scrollY = ref(1);
    // const step = ref(1);

    // const jwt = ref("");
    // const sortBy = ref("");
    // const voucherId = ref("");

    // const vouchersPerPage = ref(10);
    // const voucherPage = ref(1);

    // const cardData = ref({});
    // const voucherData = ref([]);
    // const voucherDataId = ref([]);
    // const voucherPurchased = ref([]);
    // const detailCard = ref({});
    // async function fetchVoucher() {
    //   try {
    //     loading.increaseRequest();
    //     const res = await Voucher.fetchVouchers(this.bearerToken);
    //     if (!res) {
    //       snackbar.commonError(`Error occurred! Please try again later!`);
    //       return;
    //     }
    //     snackbar.success("Fetch successfully!");
    //     this.voucherData = res.data.data;
    //     this.pagination = res.data.meta.pagination;
    //     this.voucherDataId = this.voucherData.map((index) => index.id);
    //     console.log("pagination", pagination);
    //     console.log("storeVoucher", voucherData);
    //     console.log("storeVoucherid", voucherDataId);
    //   } catch (error) {
    //     console.error(`Error: ${error}`);
    //     snackbar.commonError(error);
    //   }
    // }
    // async function purchaseVoucher() {
    //   try {
    //     loading.increaseRequest();
    //     const res = await Voucher.purchaseVouchers(this.voucherId, this.bearerToken);
    //     if (!res) {
    //       snackbar.commonError(`Error occurred! Please try again later!`);
    //       return;
    //     }
    //     snackbar.success("Voucher Purchased successfully!");
    //     console.log("purchase", res.data);
    //     this.$router.push({
    //       params: "vn",
    //       name: "Redeem",
    //     });
    //   } catch (error) {
    //     console.error(`Error: ${error}`);
    //     snackbar.commonError(error);
    //   }
    // }
    // async function fetchUserVoucher() {
    //   try {
    //     loading.increaseRequest();
    //     const res = await Voucher.fetchUserVouchers(this.bearerToken);
    //     if (!res) {
    //       snackbar.commonError(`Error occurred! Please try again later!`);
    //       return;
    //     }
    //     snackbar.success("Voucher Purchased successfully!");
    //     this.userVoucher = res.data.map((index) => index.voucher);
    //     this.userVoucherId = res.data.map((index) => index.voucher.id);
    //     console.log("userVoucher", userVoucher);
    //     console.log("userVoucherId", userVoucherId);
    //   } catch (error) {
    //     console.error(`Error: ${error}`);
    //     snackbar.commonError(error);
    //   }
    // }
    // function setDetailStoreCard(cards) {
    //   this.detailCard = cards.attributes;
    // }
    // function checkIncludes() {
    //   if (this.voucherDataId && this.userVoucherId) {
    //     this.voucherPurchased = this.voucherDataId.filter((data) => this.userVoucherId.includes(data));
    //   }
    //   console.log("Purchased voucher", voucherPurchased);
    // }

    // const slicedVoucherStore = computed(() => {
    //   if (!filterVoucherStore.value) return [];
    //   return filterVoucherStore.value.slice(
    //     (voucherPage.value - 1) * vouchersPerPage.value,
    //     voucherPage.value * vouchersPerPage.value
    //   );
    // });

    // const totalVoucherPage = computed(() => {
    //   if (!filterVoucherStore.value || filterVoucherStore.value.length == 0) return 1;
    //   if (filterVoucherStore.value.length % vouchersPerPage.value == 0)
    //     return filterVoucherStore.value.length / vouchersPerPage.value;
    //   else return Math.floor(filterVoucherStore.value.length / vouchersPerPage.value) + 1;
    // });

    // const filterVoucherStore = computed(() => {
    //   let filterVoucherStore = [];
    //   if ((sortBy.value = "asc")) {
    //     filterVoucherStore = voucherData.value.sort((a, b) => b.attributes.title - a.attributes.title);
    //   } else if ((sortBy.value = "desc")) {
    //     filterVoucherStore = voucherData.value.sort((a, b) => a.attributes.title - b.attributes.title);
    //   } else if ((sortBy.value = "priceUp")) {
    //     filterVoucherStore = voucherData.value.sort((a, b) => a.attributes.price - b.attributes.price);
    //   } else if ((sortBy.value = "priceDown")) {
    //     filterVoucherStore = voucherData.value.sort((a, b) => b.attributes.price - a.attributes.price);
    //   } else {
    //     filterVoucherStore = voucherData.value.sort((a, b) => b.id - a.id);
    //   }
    //   return filterVoucherStore;
    // });

    return {
      //computed
      // slicedVoucherStore,
      // filterVoucherStore,
      // totalVoucherPage,
      //states
      // drawer,
      // cardData,
      // index,
      // drawerDetail,
      // detailCard,
      // jwt,
      // pageIndex,
      // voucherData,
      // cfDialog,
      // voucherId,
      // scrollY,
      // voucherDataId,
      // voucherPurchased,
      // voucherPage,
      // vouchersPerPage,
      // sortBy,
      // userDetail,
      // partnerDetail,
      // partnerDialog,
      // step,
      // //action
      // fetchVoucher,
      // fetchUserVoucher,
      // purchaseVoucher,
      // checkIncludes,
      // setDetailStoreCard,
    };
  },
  {
    persist: [
      {
        paths: ["password", "rememberMe", "username"],
        storage: localStorage,
      },
      {
        paths: ["userData", "jwt"],
        storage: sessionStorage,
      },
    ],
  }
);
/* eslint-enable */
