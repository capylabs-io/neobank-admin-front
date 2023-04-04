<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-md font-weight-bold"
      >Representative info</v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <div class="pa-2">
        <div class="text-sm neutral70--text font-weight-bold">First name</div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.userMetadata.firstName"
          readonly
          solo
          dense
          hide-details
          flat
        />

        <div class="text-sm neutral70--text font-weight-bold mt-2">
          Last name
        </div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.userMetadata.lastName"
          readonly
          solo
          dense
          hide-details
          flat
        />

        <div class="text-sm neutral70--text font-weight-bold mt-2">Email</div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.userMetadata.email"
          readonly
          solo
          dense
          hide-details
          flat
        />

        <div class="text-sm neutral70--text font-weight-bold mt-2">
          Telephone
        </div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.userMetadata.phoneNumber"
          readonly
          solo
          dense
          hide-details
          flat
        />

        <div class="text-sm neutral70--text font-weight-bold mt-2">Role</div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.userMetadata.role"
          readonly
          solo
          dense
          hide-details
          flat
        />

        <div class="text-sm neutral70--text font-weight-bold mt-2">
          Staff ID
        </div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.userMetadata.staffId"
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
import { mapStores } from "pinia";
import { partnerStore } from "../../stores/partnerStore";

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
.v-expansion-panel-header {
  padding: 0 !important;
}
.v-expansion-panel-content__wrap {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e3e8ef;
}
</style>
