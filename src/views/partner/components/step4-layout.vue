<template>
  <div class="px-4 mt-n2">
    <v-expansion-panels flat accordion mandatory>
      <brandInfo />
      <accountInfo />
      <representativeInfo />
    </v-expansion-panels>
    <v-divider class="mt-4 mb-4"></v-divider>
    <div class="d-flex flex-left">
      <v-btn
        class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
        @click="partnerStore.createPartnerStep = 3"
        depressed
        >Back</v-btn
      >

      <v-btn
        class="ml-4 text-none border-radius-8 px-2"
        color="primary"
        @click="partnerStore.createPartner"
      >
        Create Now
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";
import brandInfo from "./step4/brand-info.vue";
import accountInfo from "./step4/account-info.vue";
import representativeInfo from "./step4/representative-info.vue";

export default {
  components: {
    brandInfo: brandInfo,
    accountInfo: accountInfo,
    representativeInfo: representativeInfo,
  },
  computed: {
    ...mapStores(partnerStore),
  },
  methods: {},
};
</script>
