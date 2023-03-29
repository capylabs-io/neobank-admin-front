<template>
  <v-dialog v-model="voucherStore.cfDialog" width="400px">
    <v-card class="pa-2 text-left" :style="{ 'border-radius': '12px' }">
      <v-img
        width="45px"
        height="45px"
        :style="{ 'border-radius': '10px' }"
        class="ml-4"
        :src="require(`@/assets/alert.webp`)"
      />
      <v-card-title>
        <span :style="{ fontSize: '19px', fontWeight: '700' }"
          >Disable this Account</span
        >
      </v-card-title>
      <v-card-text :style="{ fontSize: '14px', fontWeight: '400' }"
        >Are you sure you want to disable this Account? Disabled account will
        lose access to all functions in accordance with their role.
      </v-card-text>
      <v-card-text>
        <!-- <v-spacer /> -->
        <v-btn
          class="text-capitalize"
          :style="{ border: '1px solid #E3E8EF' }"
          color="green-darken-1"
          variant="text"
          @click="voucherStore.cfDialog = false"
          text
        >
          Cancel
        </v-btn>

        <v-btn
          class="ml-4 text-capitalize"
          :style="{ backgroundColor: '#DE5242' }"
          color="white"
          variant="text"
          @click="buy"
          text
        >
          Disable
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
  methods: {
    buy() {
      this.userStore.cfDialog = false;
      this.userStore.purchaseVoucher();
      this.$router.push("/vn/redeem");
    },
  },
};
</script>

<style lang="scss" scoped></style>
