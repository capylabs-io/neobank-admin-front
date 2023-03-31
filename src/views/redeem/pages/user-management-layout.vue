<template>
  <div class="d-flex flex-column align-center">
    <userManagement v-if="!voucherStore.userDetail" />
    <userDetail v-else />
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import userManagement from "@/views/redeem/pages/user-management.vue";
import userDetail from "@/views/redeem/pages/user-detail.vue";
export default {
  components: {
    userManagement: userManagement,
    userDetail: userDetail,
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
};
</script>

<style></style>
