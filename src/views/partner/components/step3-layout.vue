<template>
  <v-form>
    <div>
      This section is optional. You or your partners can always update later
      in<span class="ml-1">Account Management </span>
    </div>
    <div class="text-sm neutral70--text font-weight-bold mt-2">First name</div>
    <v-text-field
      height="36px"
      type="text"
      class="border-radius-8 mt-1"
      v-model="partnerStore.userMetadata.firstName"
      outlined
      dense
      flat
    />

    <div class="text-sm neutral70--text font-weight-bold mt-2">Last name</div>
    <v-text-field
      height="36px"
      type="text"
      class="border-radius-8 mt-1"
      v-model="partnerStore.userMetadata.lastName"
      outlined
      dense
      flat
    />

    <div class="text-sm neutral70--text font-weight-bold mt-2">Email</div>
    <v-text-field
      height="36px"
      type="text"
      class="border-radius-8 mt-1"
      v-model="partnerStore.userMetadata.email"
      outlined
      dense
      flat
    />

    <div class="text-sm neutral70--text font-weight-bold mt-2">Telephone</div>
    <v-text-field
      height="36px"
      type="text"
      class="border-radius-8 mt-1"
      v-model="partnerStore.userMetadata.phoneNumber"
      outlined
      dense
      flat
    />

    <div class="text-sm neutral70--text font-weight-bold mt-2">Role</div>
    <v-text-field
      height="36px"
      type="text"
      class="border-radius-8 mt-1"
      v-model="partnerStore.userMetadata.role"
      outlined
      dense
      flat
    />

    <div class="text-sm neutral70--text font-weight-bold mt-2">Staff ID</div>
    <v-text-field
      height="36px"
      type="text"
      class="border-radius-8 mt-1"
      v-model="partnerStore.userMetadata.staffId"
      outlined
      dense
      flat
    />
    <v-divider class="mt-2 mb-4"></v-divider>
    <div class="d-flex flex-left">
      <v-btn
        class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
        @click="partnerStore.createPartnerStep = 2"
        depressed
        >Back</v-btn
      >

      <v-btn
        class="ml-4 text-none border-radius-8 px-2"
        color="primary"
        @click="partnerStore.createPartnerStep = 4"
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
  methods: {},
};
</script>

<style lang="scss">
.input-field {
}
</style>
