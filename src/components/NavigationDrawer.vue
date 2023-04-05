<template>
  <v-navigation-drawer class="pa-0" width="284px" permanent app>
    <div class="d-flex flex-column full-height overflow-hidden">
      <div class="d-flex justify-center align-center py-6">
        <div class="logo-img">
          <v-img :src="require(`@/assets/logo-admin.webp`)" />
        </div>
        <div class="text-dp-xs neutral100--text font-weight-bold mx-2">
          NeoBank
        </div>
      </div>

      <v-divider></v-divider>

      <div class="d-flex align-center py-5 px-6">
        <div class="avatar-img">
          <v-img
            class="border-radius-8"
            :src="require(`@/assets/redeem/user-profile.webp`)"
          />
        </div>
        <div class="ml-3">
          <div class="font-weight-bold text-sm neutral100--text">Meta Inc.</div>
          <div class="text-caption neutral70--text">
            tung.bro.bro69@gmail.com
          </div>
        </div>
      </div>

      <v-divider></v-divider>
      <div class="py-4 px-6">
        <v-list class="py-0">
          <v-list-item
            class="border-radius-8 py-0 px-2"
            to="/dash-board-maintainer"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md">Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/campaign"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-ticket-percent </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md"
              >Campaign Management</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/category"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-book </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md"
              >Category Management</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/partner"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-account </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md"
              >Partner Management</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/user-management"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-account </v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md"
              >User Management</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            class="border-radius-8 py-0 px-2 mt-2"
            to="/account-setting"
            active-class="active-item"
            dense
            link
          >
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-md"
              >Account Setting</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </div>

      <v-spacer></v-spacer>

      <div class="px-6 pb-6">
        <v-btn
          class="d-flex red60--text px-0 text-none mb-2"
          @click="onLogoutClicked"
          text
        >
          <v-icon class="mr-2" color="red60"> mdi-power </v-icon>
          <div>Log Out</div>
        </v-btn>
        <v-divider></v-divider>
        <div class="text-overline-1 neutral70--text mt-2">
          v1.0.1 - Development
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    onLogoutClicked() {
      this.userStore.logout();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-img {
  width: 36px;
  height: 36px;
}
.logo-img {
  width: 50px;
  height: 50px;
}

.active-item {
  background: var(--v-primary5-base) !important;
  .v-icon {
    color: var(--v-primary50-base) !important;
  }
}
</style>
