<template>
  <div>
    <v-stepper
      v-model="partnerStore.createPartnerStep"
      alt-labels
      flat
      non-linear
    >
      <v-stepper-header>
        <v-stepper-step :complete="partnerStore.createPartnerStep > 1" step="1"
          >Brand Info</v-stepper-step
        >
        <v-icon>mdi-chevron-double-right</v-icon>
        <v-stepper-step :complete="partnerStore.createPartnerStep > 2" step="2"
          >Create Account</v-stepper-step
        >
        <v-icon>mdi-chevron-double-right</v-icon>
        <v-stepper-step :complete="partnerStore.createPartnerStep > 3" step="3"
          >Representative</v-stepper-step
        >
        <v-icon>mdi-chevron-double-right</v-icon>
        <v-stepper-step step="4">Review</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";

export default {
  computed: {
    ...mapStores(partnerStore),
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
