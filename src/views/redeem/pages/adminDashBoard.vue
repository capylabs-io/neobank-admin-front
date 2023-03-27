<template>
  <div v-if="!userStore.adminDetail">
    <DashBoard></DashBoard>
  </div>
  <div v-else>
    <Detail></Detail>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import adminDashBoard from "@/views/redeem/pages/Dash-board.vue";
import adminDetailCard from "@/views/redeem/pages/adminDetail.vue";

export default {
  components: {
    DashBoard: adminDashBoard,
    Detail: adminDetailCard,
  },

  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style lang="scss" scoped></style>
