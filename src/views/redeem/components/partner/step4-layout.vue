<template>
  <v-form>
    <brandInfo />
    <v-divider class="mt-sm-3"></v-divider>
    <accountInfo class="mt-sm-3" />
    <v-divider class="mt-sm-3"></v-divider>
    <representativeInfo class="mt-sm-3" />
    <v-divider class="mt-sm-3"></v-divider>
    <div class="d-flex flex-left mt-sm-3">
      <v-btn
        class="text-capitalize"
        :style="{ border: '1px solid #E3E8EF' }"
        color="black"
        variant="text"
        @click="voucherStore.step = 3"
        text
      >
        back
      </v-btn>

      <v-btn
        class="ml-4 text-capitalize"
        :style="{ backgroundColor: 'var(--v-blue-base)' }"
        color="white"
        variant="text"
        @click="closeDialog()"
        text
      >
        Create Now
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import brandInfo from "@/views/redeem/components/partner/step4/brand-info.vue";
import accountInfo from "@/views/redeem/components/partner/step4/account-info.vue";
import representativeInfo from "@/views/redeem/components/partner/step4/representative-info.vue";

export default {
  components: {
    brandInfo: brandInfo,
    accountInfo: accountInfo,
    representativeInfo: representativeInfo,
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
  methods: {
    closeDialog() {
      this.voucherStore.partnerDialog = false;
      this.voucherStore.step = 1;
    },
  },
};
</script>

<style lang="scss">
.input-field {
}
</style>
