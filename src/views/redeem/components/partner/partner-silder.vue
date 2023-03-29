<template>
  <div>
    <v-stepper v-model="voucherStore.step" alt-labels flat class="full-width">
      <v-stepper-header>
        <v-stepper-step :complete="voucherStore.step > 1" step="1"
          >Set up Account</v-stepper-step
        >

        <v-icon>mdi-chevron-double-right</v-icon>

        <v-stepper-step :complete="voucherStore.step > 2" step="2"
          >Brand info</v-stepper-step
        >

        <v-icon>mdi-chevron-double-right</v-icon>

        <v-stepper-step :complete="voucherStore.step > 3" step="3"
          >Representative info</v-stepper-step
        >

        <v-icon>mdi-chevron-double-right</v-icon>

        <v-stepper-step step="4">Review</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
};
</script>

<style lang="scss" scoped>
.v-stepper--alt-labels .v-stepper__step {
  width: max-content !important;
  padding: 0 !important;
  flex-basis: 0;
}
.v-stepper--alt-labels .v-stepper__step .v-stepper__label {
  text-align: center;
}
</style>
