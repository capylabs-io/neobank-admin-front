<template>
  <div>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header
          :style="{ fontSize: '16px', fontWeight: 'bold' }"
          >Brand info</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-card flat
            ><div class="text-xl text-left">
              Brand Name<span class="ml-1" :style="{ color: 'red' }">*</span>
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder="Highland"
              background-color="secondary"
              solo
              readonly
              dense
              hide-details
              flat
            />
            <div class="text-xl mt-sm-3 text-left" partner>
              Gmail<span class="ml-1" :style="{ color: 'red' }">*</span>
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder="Highland@xyz.com.vn"
              background-color="secondary"
              solo
              readonly
              dense
              hide-details
              flat
            />
            <div class="text-xl mt-sm-3 text-left" partner>Link</div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder="www.highlandscoffeee.com.vn"
              solo
              background-color="secondary"
              readonly
              dense
              hide-details
              flat
            />
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
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
.v-expansion-panel-header {
  padding: 0 !important;
}
.v-expansion-panel-content__wrap {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e3e8ef;
}
</style>
