<template>
  <div class="d-flex flex-column align-center">
    <!-- <partnerManagement v-if="!voucherStore.partnerDetail" />
    <partnerDetail v-else /> -->
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
// import partnerManagement from "@/views/redeem/pages/partner-management.vue";
// import partnerDetail from "@/views/redeem/pages/partner-detail.vue";
export default {
  components: {
    // partnerManagement: partnerManagement,
    // partnerDetail: partnerDetail
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
