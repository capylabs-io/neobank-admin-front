<template>
  <v-dialog
    v-model="partnerStore.changePasswordDialog"
    max-width="432px"
    persistent
    absolute
  >
    <v-card class="pa-4">
      <div class="text-lg font-weight-bold text-center">Change Password</div>
      <div class="mt-4">
        <div class="text-sm neutral70--text font-weight-bold">Old Password</div>
        <v-text-field
          :append-icon="isShowPass1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowPass1 ? 'text' : 'password'"
          :rules="$rules.password"
          @click:append="isShowPass1 = !isShowPass1"
          class="neutral30-border border-radius-6 mt-1 pa-0"
          placeholder="Password"
          color="primary"
          hide-details
          flat
          solo
          filled
          dense
        />
      </div>
      <div class="mt-4">
        <div class="text-sm neutral70--text font-weight-bold">New Password</div>
        <v-text-field
          :append-icon="isShowPass2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowPass2 ? 'text' : 'password'"
          :rules="$rules.password"
          @click:append="isShowPass2 = !isShowPass2"
          class="neutral30-border border-radius-6 mt-1 pa-0"
          placeholder="Password"
          color="primary"
          hide-details
          flat
          solo
          filled
          dense
        />
      </div>
      <div class="mt-4">
        <div class="text-sm neutral70--text font-weight-bold">
          Confirm New Password
        </div>
        <v-text-field
          :append-icon="isShowPass3 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowPass3 ? 'text' : 'password'"
          :rules="$rules.password"
          @click:append="isShowPass3 = !isShowPass3"
          class="neutral30-border border-radius-6 mt-1 pa-0"
          placeholder="Password"
          color="primary"
          hide-details
          flat
          solo
          filled
          dense
        />
      </div>
      <v-divider class="my-4"></v-divider>
      <div class="d-flex align-center justify-space-between">
        <v-btn
          class="text-none border-radius-8 px-2"
          color="gray"
          elevation="0"
          @click="onCancelClicked"
          dense
        >
          Cancel
        </v-btn>
        <v-btn
          class="text-none border-radius-8 px-2"
          color="primary"
          elevation="0"
          dense
        >
          Create
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";
export default {
  data() {
    return {
      isShowPass1: false,
      isShowPass2: false,
      isShowPass3: false,
    };
  },
  computed: {
    ...mapStores(partnerStore),
  },
  methods: {
    onCancelClicked() {},
  },
};
</script>
