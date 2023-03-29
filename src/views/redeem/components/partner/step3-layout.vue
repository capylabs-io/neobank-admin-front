<template>
  <v-form>
    <div class="text-left mt-sm-3">
      This section is optional. You or your partners can always update later
      in<span class="ml-1" :style="{ fontWeight: 'bold' }"
        >Account Management
      </span>
    </div>
    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      First name
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="pa-0 input-field"
      placeholder=""
      outlined
      dense
      hide-details
      flat
    />

    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      Last name
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="pa-0 input-field"
      placeholder=""
      outlined
      dense
      hide-details
      flat
    />

    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      Gmail
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="pa-0 input-field"
      placeholder=""
      outlined
      dense
      hide-details
      flat
    />

    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      Telephone
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="pa-0 input-field"
      placeholder=""
      outlined
      dense
      hide-details
      flat
    />

    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      Role
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="pa-0 input-field"
      placeholder=""
      outlined
      dense
      hide-details
      flat
    />

    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      Staff ID
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="pa-0 input-field"
      placeholder=""
      outlined
      dense
      hide-details
      flat
    />
    <v-divider class="mt-sm-3"></v-divider>
    <div class="d-flex flex-left mt-sm-3">
      <v-btn
        class="text-capitalize"
        :style="{ border: '1px solid #E3E8EF' }"
        color="black"
        variant="text"
        @click="voucherStore.step = 2"
        text
      >
        back
      </v-btn>

      <v-btn
        class="ml-4 text-capitalize"
        :style="{ backgroundColor: 'var(--v-blue-base)' }"
        color="white"
        variant="text"
        @click="voucherStore.step = 4"
        text
      >
        Next Step
      </v-btn>
    </div>
  </v-form>
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
  methods: {},
};
</script>

<style lang="scss">
.input-field {
}
</style>
