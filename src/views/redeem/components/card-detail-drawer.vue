<template>
  <v-navigation-drawer
    v-model="voucherStore.drawerDetail"
    absolute
    temporary
    right
    hide-overlay
    width="480px"
    color="white"
    class="drawer d-flex flex-column"
  >
    <v-card class="drawer-card" flat>
      <div class="drawer-image d-flex flex-column">
        <div class="full-width">
          <v-img
            class="drawer-image"
            :src="require('@/assets/redeem/card/viettel-card.webp')"
          ></v-img>
        </div>
      </div>
      <div
        class="d-flex flex-column mt-4 font-weight-bold align-center justify-center"
      >
        <div>
          <v-img
            class="drawer-icon"
            :src="require('@/assets/redeem/card/viettel-icon.webp')"
          />
        </div>
        <span class="mt-4" :style="{ fontSize: '17px', fontWeight: 700 }">
          Phi khong dung - giam 10% toi da 10k thanh toan dich vu phi khong dung
          tu 50k tren VParadise
        </span>
      </div>
      <div
        class="mt-4 text-left draw-text"
        :style="{ fontSize: '14px', fontWeight: 400, color: 'GrayText' }"
      >
        Sit pellentesque montes eu habitant mattis libero sed interdum at. Vel
        porttitor malesuada amet velit vestibulum parturient habitasse.
      </div>
      <div>
        <v-btn
          text
          class="text-left active d-flex align-center mx-auto mt-2"
          @click="voucherStore.userDetail = false"
        >
          <span class="ml-2 text-capitalize">Campaign detail</span>
          <v-icon small>mdi-chevron-double-right</v-icon>
        </v-btn>
      </div>
      <div>
        <div class="text-xl text-left">Name</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="secondary"
          class="mt- pa-0"
          placeholder="Raise Awareness"
          solo
          readonly
          dense
          hide-details
          flat
        />
      </div>
      <div class="text-xl mt-sm-3 text-left">Gmail</div>
      <v-text-field
        height="36px"
        type="text"
        background-color="secondary"
        class="mt- pa-0"
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
        class="mt- pa-0"
        placeholder="Active"
        solo
        readonly
        dense
        hide-details
        flat
      />
      <div class="text-xl mt-sm-3 text-left">Token owned</div>
      <v-text-field
        height="36px"
        type="text"
        background-color="secondary"
        class="mt- pa-0"
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
            /></div></template
      ></v-text-field>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../../stores/userStore";
import { voucherStore } from "../../../stores/voucherStore";
export default {
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.drawer-image {
  border-radius: 8px;
  height: 260px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 99;
}
.status {
  z-index: 99;
}
.drawer-icon {
  border-radius: 100px;
  width: 32px;
  height: 32px;
}

.draw-text {
}
.col-gap-10 {
  column-gap: 10px;
}
.btn-arrow {
  position: absolute;
  background-color: white;
  z-index: 99;
}
.number {
  background: #d0dbf4;
  width: 50px;
  height: 30px;
}
.drawer {
  background: white !important;
  height: 100vh;
  padding: 10px 20px;
  z-index: 99;
}
.amount-container {
  position: sticky;
  bottom: 0;
  right: 0;
}
.drawer-btn {
  position: sticky;
  bottom: 0;
  right: 0;
  width: 100%;
  margin-top: 20px;
}
.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
.active {
  color: #2970ff;
  .v-icon {
    color: #2970ff;
  }
}
.disable {
}
</style>
