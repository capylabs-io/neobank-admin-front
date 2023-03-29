<template>
  <v-form>
    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      Username<span class="ml-1" :style="{ color: 'red' }">*</span>
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
      Password<span class="ml-1" :style="{ color: 'red' }">*</span>
    </div>
    <v-text-field
      height="36px"
      type="password"
      class="pa-0 input-field"
      placeholder=""
      outlined
      dense
      hide-details
      flat
    />
    <div class="text-xl mt-sm-3 text-left" :style="{ fontWeight: 'bold' }">
      Reenter Password<span class="ml-1" :style="{ color: 'red' }">*</span>
    </div>
    <v-text-field
      height="36px"
      type="password"
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
        @click="voucherStore.step = 1"
        text
      >
        back
      </v-btn>

      <v-btn
        class="ml-4 text-capitalize"
        :style="{ backgroundColor: 'var(--v-blue-base)' }"
        color="white"
        variant="text"
        @click="voucherStore.step = 3"
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
