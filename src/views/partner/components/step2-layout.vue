<template>
  <v-form v-model="step2Form">
    <div class="text-sm neutral70--text font-weight-bold">
      Username<span class="error--text ml-1">*</span>
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="border-radius-8 mt-1"
      v-model="partnerStore.partner.username"
      :rules="[$rules.required]"
      outlined
      dense
      flat
    />
    <div class="text-sm neutral70--text font-weight-bold mt-2">
      Password<span class="error--text ml-1">*</span>
    </div>
    <v-text-field
      height="36px"
      class="border-radius-8 mt-1"
      v-model="partnerStore.partner.password"
      :rules="[$rules.required]"
      :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
      :type="isShowPass ? 'text' : 'password'"
      @click:append="isShowPass = !isShowPass"
      outlined
      dense
      flat
    />
    <div class="text-sm neutral70--text font-weight-bold mt-2">
      Re-enter Password<span class="error--text ml-1">*</span>
    </div>
    <v-text-field
      height="36px"
      class="border-radius-8 mt-1"
      v-model="partnerStore.partner.confirmPassword"
      :rules="[$rules.required, confirmPasswordRule]"
      :append-icon="isShowConfirmPass ? 'mdi-eye' : 'mdi-eye-off'"
      :type="isShowConfirmPass ? 'text' : 'password'"
      @click:append="isShowConfirmPass = !isShowConfirmPass"
      outlined
      dense
      flat
    />
    <v-divider class="mt-2 mb-4"></v-divider>
    <div class="d-flex flex-left">
      <v-btn
        class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
        @click="partnerStore.createPartnerStep = 1"
        depressed
        >Back</v-btn
      >

      <v-btn
        class="ml-4 text-none border-radius-8 px-2"
        color="primary"
        @click="partnerStore.createPartnerStep = 3"
        :disabled="!step2Form"
      >
        Next Step
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";

export default {
  computed: {
    ...mapStores(partnerStore),
  },
  data() {
    return {
      step2Form: false,
      isShowPass: false,
      isShowConfirmPass: false,
      confirmPasswordRule: (v) =>
        (v &&
          this.partnerStore.partner.password &&
          v == this.partnerStore.partner.password) ||
        "Password does not match!",
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.input-field {
}
</style>
