<template>
  <v-dialog v-model="partnerStore.createPartnerDialog" width="520px" persistent>
    <v-card class="pa-4">
      <div class="font-weight-bold text-lg text-center">Create new partner</div>
      <div class="mt-4">
        <partnerSilder />
      </div>
      <v-divider class="my-4"></v-divider>
      <div class="form">
        <step1 v-if="partnerStore.createPartnerStep == 1" />
        <step2 v-else-if="partnerStore.createPartnerStep == 2" />
        <step3 v-else-if="partnerStore.createPartnerStep == 3" />
        <step4 v-else />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";
import step1 from "../components/step1-layout.vue";
import partnerSilder from "../components/partner-silder.vue";
import step2 from "../components/step2-layout.vue";
import step3 from "../components/step3-layout.vue";
import step4 from "../components/step4-layout.vue";
export default {
  components: {
    step1: step1,
    step2: step2,
    step3: step3,
    step4: step4,
    partnerSilder: partnerSilder,
  },
  computed: {
    ...mapStores(partnerStore),
  },
  methods: {},
  mounted() {
    this.partnerStore.partner = {};
  },
};
</script>

<style lang="scss" scoped>
.form {
  max-height: 680px;
  overflow-y: auto;
}
</style>
