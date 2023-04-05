<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-md font-weight-bold"
      >Account</v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <div class="pa-2">
        <div class="text-sm neutral70--text font-weight-bold">
          Username<span class="error--text ml-1">*</span>
        </div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.partner.username"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-sm neutral70--text font-weight-bold mt-2" partner>
          Password<span class="error--text ml-1">*</span>
        </div>
        <v-text-field
          height="36px"
          :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowPass ? 'text' : 'password'"
          @click:append="isShowPass = !isShowPass"
          v-model="partnerStore.partner.password"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          readonly
          solo
          dense
          hide-details
          flat
        />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { rules } from "@/plugins/rules";
import { mapStores } from "pinia";
import { partnerStore } from "../../stores/partnerStore";

export default {
  computed: {
    ...mapStores(partnerStore),
  },
  data() {
    return {
      rules: rules,
      isShow: true,
      isShowPass: false,
    };
  },
  methods: {},
};
</script>

<style lang="scss"></style>
