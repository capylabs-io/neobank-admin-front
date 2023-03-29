<template>
  <div class="d-flex flex-column justify-space-between full-height">
    <div class="d-flex flex-column">
      <div class="d-flex align-center left-first pa-6">
        <div>
          <v-img
            :style="{ 'border-radius': '10px' }"
            class
            :src="require(`@/assets/logo-admin.webp`)"
          />
        </div>
        <div class="d-flex flex-column text-left ml-2">
          <span
            :style="{
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '20px',
              letterSpacing: '0em',
            }"
            >NeoBank</span
          >
          <span
            :style="{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '0em',
            }"
            >maintainer</span
          >
        </div>
        <!-- <v-divider></v-divider> -->

        <!-- <div>
          <v-img
            :style="{ 'border-radius': '10px' }"
            class
            :src="require(`@/assets/redeem/user-profile.webp`)"
          />
        </div>
        <div class="mt-3">
          <span class="font-weight-bold">Tung69 #291090</span>
        </div>
        <div class="subtitle-2">
          <span>tung.bro.bro69@gmail.com</span>
        </div> -->
        <!-- <div
          class="d-flex left-profile-section align-center font-weight-bold mt-3"
        >
          <span :style="{ 'font-size': '18px' }">1000</span>
          <div>
            <v-img
              :style="{ 'border-radius': '40px' }"
              :src="require(`@/assets/redeem/coin.webp`)"
            />
          </div>
        </div> -->
      </div>

      <v-divider></v-divider>
      <div class="d-flex align-center pa-6">
        <div class="admin-image">
          <v-img
            :style="{ 'border-radius': '10px' }"
            class
            :src="require(`@/assets/redeem/user-profile.webp`)"
          />
        </div>
        <div class="d-flex flex-column text-left ml-2">
          <span
            :style="{
              fontSize: '17px',
              fontWeight: 700,
              lineHeight: '20px',
              letterSpacing: '0em',
            }"
            >{{ userStore.userData.username }}</span
          >
          <span
            :style="{
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '20px',
              letterSpacing: '0em',
            }"
            >{{ userStore.userData.email }}</span
          >
        </div>
        <!-- <div class="ml-6">
          <v-icon>mdi-chevron-right</v-icon>
        </div> -->
      </div>
      <v-divider></v-divider>
      <div class="d-flex flex-column justify-center left-second pa-6">
        <!-- TODO: Change to v-list -->
        <div @click="dashBoardClick()">
          <div class="pa-2 content d-flex dashBoard active cursor-pointer">
            <v-icon class="mr-2"> mdi-view-dashboard</v-icon>
            <span>Dashboard</span>
          </div>
        </div>
        <div class="mt-2" @click="storeClick()">
          <div class="pa-2 content d-flex store cursor-pointer">
            <v-icon class="mr-2">mdi-ticket-percent </v-icon>
            <span>Campaign management</span>
          </div>
        </div>
        <div class="mt-2" @click="partnerClick()">
          <div class="pa-2 content d-flex partner cursor-pointer">
            <v-icon class="mr-2"> mdi-account-multiple</v-icon>
            <span>Partner management</span>
          </div>
        </div>
        <div class="mt-2" @click="userClick()">
          <div class="pa-2 content d-flex user cursor-pointer">
            <v-icon class="mr-2"> mdi-account-multiple</v-icon>
            <span>User management</span>
          </div>
        </div>
        <div class="mt-2">
          <div class="pa-2 content d-flex category cursor-pointer">
            <v-icon class="mr-2"> mdi-account-multiple</v-icon>
            <span>Category management</span>
          </div>
        </div>
        <!-- <div class="mt-2" @click="accountClick()">
          <div class="pa-2 content d-flex setting cursor-pointer">
            <v-icon class="mr-2"> mdi-account-box</v-icon>
            <span>Account setting</span>
          </div>
        </div> -->
      </div>
      <v-divider></v-divider>
    </div>
    <div class="d-flex align-center left-third pa-6">
      <v-btn class="" @click="signout()" text>
        <div class="mr-2">
          <v-icon color="red"> mdi-logout </v-icon>
        </div>
        <div class="text-capitalize" :style="{ color: 'red' }">Log-out</div>
      </v-btn>
    </div>
  </div>
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
  mounted() {
    this.carousel();
  },
  methods: {
    dashBoardClick() {
      const store = document.querySelector(".store");
      const dashBoard = document.querySelector(".dashBoard");
      const partner = document.querySelector(".partner");
      const user = document.querySelector(".user");
      this.userStore.index = 2;
      this.voucherStore.userDetail = false;
      this.voucherStore.partnerDetail = false;
      store.classList.remove("active");
      dashBoard.classList.add("active");
      partner.classList.remove("active");
      user.classList.remove("active");
    },
    storeClick() {
      const store = document.querySelector(".store");
      const dashBoard = document.querySelector(".dashBoard");
      const partner = document.querySelector(".partner");
      const user = document.querySelector(".user");
      this.voucherStore.userDetail = false;
      this.voucherStore.partnerDetail = false;
      this.userStore.index = 1;
      store.classList.add("active");
      dashBoard.classList.remove("active");
      partner.classList.remove("active");
      user.classList.remove("active");
    },
    // accountClick() {
    //   const store = document.querySelector(".store");
    //   const dashBoard = document.querySelector(".dashBoard");
    //   // const partner = document.querySelector(".partner");
    //   const user = document.querySelector(".user");
    //   this.userStore.index = 4;
    //   store.classList.remove("active");
    //   dashBoard.classList.remove("active");
    //   // partner.classList.add("active");
    //   user.classList.remove("active");
    // },
    partnerClick() {
      const store = document.querySelector(".store");
      const dashBoard = document.querySelector(".dashBoard");
      const partner = document.querySelector(".partner");
      const user = document.querySelector(".user");
      this.voucherStore.userDetail = false;
      this.voucherStore.partnerDetail = false;
      this.userStore.index = 4;
      store.classList.remove("active");
      dashBoard.classList.remove("active");
      partner.classList.add("active");
      user.classList.remove("active");
    },
    userClick() {
      const store = document.querySelector(".store");
      const dashBoard = document.querySelector(".dashBoard");
      const partner = document.querySelector(".partner");
      const user = document.querySelector(".user");
      this.userStore.index = 3;
      this.voucherStore.userDetail = false;
      this.voucherStore.partnerDetail = false;
      store.classList.remove("active");
      dashBoard.classList.remove("active");
      partner.classList.remove("active");
      user.classList.add("active");
    },
    signout() {
      this.userStore.logout();
      this.$router.push("/vn");
    },
    carousel() {},
  },
};
</script>

<style lang="scss" scoped>
.column-gap-10 {
  column-gap: 10px;
}
.row-gap-3 {
  row-gap: 3px;
}
.row-gap-1 {
  row-gap: 1px;
}

.gap-30 {
  gap: 30px;
}
.left-profile-section {
  background: #f5f8ff;
  border-radius: 8px;
  padding: 8px, 16px, 8px, 16px;
}

.content {
  border-radius: 8px;
}
.content:hover {
  background: #f5f8ff;
  color: #2970ff;
  .v-icon {
    color: #2970ff;
  }
}
.active {
  background: #f5f8ff;
  color: #2970ff;
  .v-icon {
    color: #2970ff;
  }
}
.card-icon {
  border-radius: 100px;
}
.admin-image {
  width: 36px;
  height: 42px;
}
</style>
