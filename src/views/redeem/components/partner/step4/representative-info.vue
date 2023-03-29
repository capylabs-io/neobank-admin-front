<template>
  <div>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header
          :style="{ fontSize: '16px', fontWeight: 'bold' }"
          >Representative info</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-card flat>
            <div
              class="text-xl mt-sm-3 text-left"
              :style="{ fontWeight: 'bold' }"
            >
              First name
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder=""
              background-color="secondary"
              solo
              dense
              hide-details
              flat
            />

            <div
              class="text-xl mt-sm-3 text-left"
              :style="{ fontWeight: 'bold' }"
            >
              Last name
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder=""
              background-color="secondary"
              solo
              dense
              hide-details
              flat
            />

            <div
              class="text-xl mt-sm-3 text-left"
              :style="{ fontWeight: 'bold' }"
            >
              Gmail
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder=""
              background-color="secondary"
              solo
              dense
              hide-details
              flat
            />

            <div
              class="text-xl mt-sm-3 text-left"
              :style="{ fontWeight: 'bold' }"
            >
              Telephone
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder=""
              background-color="secondary"
              solo
              dense
              hide-details
              flat
            />

            <div
              class="text-xl mt-sm-3 text-left"
              :style="{ fontWeight: 'bold' }"
            >
              Role
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder=""
              background-color="secondary"
              solo
              dense
              hide-details
              flat
            />

            <div
              class="text-xl mt-sm-3 text-left"
              :style="{ fontWeight: 'bold' }"
            >
              Staff ID
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder=""
              background-color="secondary"
              solo
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
