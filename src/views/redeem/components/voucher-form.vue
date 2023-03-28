<template>
  <v-card class="form-detail pa-3" outlined>
    <v-row>
      <v-col cols="4">
        <div class="text-xl text-left">Name</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="mt- pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Gmail</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="mt- pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
      </v-col>
      <v-col cols="4">
        <div class="text-xl text-left">Status</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="mt- pa-0"
          placeholder="Active"
          solo
          readonly
          dense
          hide-details
          flat />
        <div class="text-xl mt-sm-3 text-left">Token owned</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="mt- pa-0"
          placeholder="1000"
          solo
          readonly
          dense
          hide-details
          flat
        >
          <template #prepend-inner>
            <div class="mr-2 pt-1">
              <v-img
                width="15px"
                height="15px"
                :style="{ 'border-radius': '40px', border: '1px solid black' }"
                :src="require(`@/assets/redeem/coin.webp`)"
              /></div></template></v-text-field
      ></v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  components: {},

  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
  },
};
</script>
<style lang="scss" scoped>
.form-detail {
  background-color: white;
  height: max-content !important;
}

.v-card {
  border-radius: 12px !important;
}
</style>
