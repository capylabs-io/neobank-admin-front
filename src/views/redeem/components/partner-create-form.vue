<template>
  <v-dialog v-model="voucherStore.partnerDialog" width="450px">
    <v-card
      class="pa-2 d-flex flex-column"
      :style="{ 'border-radius': '12px' }"
    >
      <v-card-title
        class="align-self-center"
        :style="{ fontSize: '18px', fontWeight: 700 }"
      >
        Create new partner
      </v-card-title>
      <v-card-text class="form">
        <partnerSilder class="mt-sm-3" />
        <v-divider class="mt-sm-3"></v-divider>
        <step1 v-if="voucherStore.step == 1" />
        <step2 v-else-if="voucherStore.step == 2" />
        <step3 v-else-if="voucherStore.step == 3" />
        <step4 v-else />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import step1 from "@/views/redeem/components/partner/step1-layout.vue";
import partnerSilder from "@/views/redeem/components/partner/partner-silder.vue";
import step2 from "@/views/redeem/components/partner/step2-layout.vue";
import step3 from "@/views/redeem/components/partner/step3-layout.vue";
import step4 from "@/views/redeem/components/partner/step4-layout.vue";
export default {
  components: {
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
    partnerSilder: partnerSilder,
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.form {
  max-height: 680px;
  overflow-y: auto;
}
</style>
