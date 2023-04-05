<template>
  <div>
    <div v-if="userStore.isMaintainer">
      <MaintainerDashboard />
    </div>
    <div v-else-if="userStore.isPartner">
      <PartnerDashboard />
    </div>
  </div>
</template>

<script>
import { userStore } from "@/stores/userStore";
import { mapStores } from "pinia";
export default {
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {};
  },
  components: {
    MaintainerDashboard: () => import("./maintainer-dashboard.vue"),
    PartnerDashboard: () => import("./partner-dashboard.vue"),
  },
};
</script>