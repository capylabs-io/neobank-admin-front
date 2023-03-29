<template>
  <div>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header
          :style="{ fontSize: '16px', fontWeight: 'bold' }"
          >Account</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-card flat
            ><div class="text-xl text-left">
              Username<span class="ml-1" :style="{ color: 'red' }">*</span>
            </div>
            <v-text-field
              height="36px"
              type="text"
              class="pa-0 input-field"
              placeholder="admin.highlands"
              background-color="secondary"
              solo
              readonly
              dense
              hide-details
              flat
            />
            <div class="text-xl mt-sm-3 text-left" partner>
              Password<span class="ml-1" :style="{ color: 'red' }">*</span>
            </div>
            <v-text-field
              height="36px"
              :append-icon="voucherStore.isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="voucherStore.isShowPass ? 'text' : 'password'"
              :rules="rules.password"
              class="pa-0 input-field"
              placeholder="Highland@xyz.com.vn"
              background-color="secondary"
              solo
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
import { rules } from "@/plugins/rules";
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
  data() {
    return {
      rules: rules,
      isShow: true,
    };
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
