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
        <v-divider></v-divider>
        <step1 v-if="voucherStore.step == 1" />
        <step2 v-else-if="voucherStore.step == 2" />
        <step3 v-else-if="voucherStore.step == 3" />
        <step4 v-else />
      </v-card-text>
      <!-- <v-img
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
        <v-btn
          class="text-capitalize"
          :style="{ border: '1px solid #E3E8EF' }"
          color="green-darken-1"
          variant="text"
          @click="voucherStore.partnerDialog = false"
          text
        >
          Cancel
        </v-btn>

        <v-btn
          class="ml-4 text-capitalize"
          :style="{ backgroundColor: '#DE5242' }"
          color="white"
          variant="text"
          @click="voucherStore.partnerDialog = false"
          text
        >
          Disable
        </v-btn>
      </v-card-text> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
import step1 from "@/views/redeem/components/partner/step1-layout.vue";
import step2 from "@/views/redeem/components/partner/step2-layout.vue";
import step3 from "@/views/redeem/components/partner/step3-layout.vue";
import step4 from "@/views/redeem/components/partner/step4-layout.vue";
export default {
  components: {
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
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
