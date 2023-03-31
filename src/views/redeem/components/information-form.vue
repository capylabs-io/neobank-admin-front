<template>
  <v-card class="form-detail pa-3" flat outlined v-if="layout == 1">
    <v-row>
      <v-col cols="4">
        <div class="text-xl text-left">Name</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          readonly
          class="pa-0"
          placeholder="New Deal"
          solo
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Gmail</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
      </v-col>
      <v-col cols="4">
        <div class="text-xl text-left">Status</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="Active"
          solo
          readonly
          dense
          hide-details
          flat />
        <div class="text-xl mt-sm-3 text-left">Token owned</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="1000"
          solo
          readonly
          dense
          hide-details
          flat
        >
          <template #prepend-inner>
            <div class="mr-2 pt-1">
              <v-img
                width="15px"
                height="15px"
                :style="{ 'border-radius': '40px', border: '1px solid black' }"
                :src="require(`@/assets/redeem/coin.webp`)"
              /></div></template></v-text-field
      ></v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </v-card>

  <v-card flat class="form-detail pa-3" v-else-if="layout == 2">
    <v-row>
      <v-col cols="4">
        <div class="text-xl text-left">Username</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Gmail</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Brand</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Link</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Status</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="Active"
          solo
          readonly
          dense
          hide-details
          flat
        />
      </v-col>
      <v-col cols="8">
        <div class="text-xl text-left">Information description</div>
        <v-textarea
          type="text"
          background-color="secondary"
          class="pa-0 full-height"
          placeholder="1000"
          solo
          readonly
          dense
          hide-details
          no-resize
          flat
        />
      </v-col> </v-row
  ></v-card>
  <v-card flat class="form-detail pa-3" v-else>
    <v-row>
      <v-col cols="4">
        <div class="text-xl text-left">Full Name</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Gmail</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Telephone</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder="New Deal"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Staff ID</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          readonly
          class="pa-0"
          placeholder="New Deal"
          solo
          dense
          hide-details
          flat
        />
        <div class="text-xl mt-sm-3 text-left">Role</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="pa-0"
          placeholder=""
          solo
          readonly
          dense
          hide-details
          flat
        />
      </v-col>
      <v-col cols="8"> </v-col> </v-row
  ></v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  props: ["layout"],
  components: {},

  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
  },
};
</script>
<style lang="scss" scoped>
.form-detail {
  background-color: white;
  height: max-content !important;
  border: 1px solid #e3e8ef;
}

.v-card {
  border-radius: 12px !important;
}
</style>
