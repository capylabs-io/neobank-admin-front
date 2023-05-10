<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <CampaignDrawer />
    <div>
      <v-btn class="px-0 text-none primary--text" @click="routerGoBack" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="d-flex justify-space-between mt-2">
      <div class="d-flex align-center">
        <div class="user-image">
          <v-img
            class="border-radius-8"
            max-height="36"
            max-width="36"
            :src="require(`@/assets/redeem/user-profile.webp`)"
          />
        </div>
        <span class="font-weight-bold text-dp-xs text-capitalize ml-2"
          >{{ userManagerStore.user.username }}’s Detail</span
        >
      </div>
      <div class="d-flex align-center">
        <v-btn
          text
          class="text-left text-btn error--text"
          @click="onDisableClicked"
        >
          <span class="text-capitalize">Disable account</span>
        </v-btn>
      </div>
    </div>
    <div class="mt-4 white-bg neutral30-border border-radius-12 pa-4">
      <v-row>
        <v-col cols="4">
          <div class="text-sm neutral70--text font-weight-bold">Name</div>
          <v-text-field
            height="36px"
            type="text"
            background-color="neutral10"
            readonly
            class="mt-1 border-radius-8"
            :value="userName"
            solo
            dense
            hide-details
            flat
          />
          <div class="text-sm neutral70--text font-weight-bold mt-3">Gmail</div>
          <v-text-field
            height="36px"
            type="text"
            background-color="neutral10"
            class="mt-1 border-radius-8"
            :value="userManagerStore.user.email"
            solo
            readonly
            dense
            hide-details
            flat
          />
        </v-col>
        <v-col cols="4">
          <div class="text-sm neutral70--text font-weight-bold">Status</div>
          <v-text-field
            height="36px"
            type="text"
            background-color="neutral10"
            class="mt-1 border-radius-8"
            :value="userManagerStore.user.blocked ? 'Disabled' : 'Active'"
            solo
            readonly
            dense
            hide-details
            flat
          />
          <div class="text-sm neutral70--text font-weight-bold mt-3">
            Token owned
          </div>
          <v-text-field
            height="36px"
            type="text"
            background-color="neutral10"
            class="mt-1 border-radius-8"
            :value="userToken"
            solo
            readonly
            dense
            hide-details
            flat
          >
            <template #prepend-inner>
              <div class="mr-2 pt-1">
                <div class="token-icon">P</div>
                <!-- <v-img
                  width="15px"
                  height="15px"
                  :style="{
                    'border-radius': '40px',
                    border: '1px solid black',
                  }"
                  :src="require(`@/assets/redeem/coin.webp`)"
                /> -->
              </div></template
            ></v-text-field
          ></v-col
        >
        <v-col cols="4"></v-col>
      </v-row>
    </div>
    <div class="d-flex mt-4 justify-space-between">
      <div class="d-flex align-center">
        <span class="font-weight-bold text-lg">Transaction History</span>
      </div>
      <div class="d-flex align-center gap-8">
        <v-text-field
          v-model="userManagerStore.transactionSearchKey"
          class="search-field border-radius-6"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          flat
          solo
          outlined
          dense
          hide-details
        ></v-text-field>
        <v-btn
          class="white-bg neutral30-border text-none font-weight-bold px-3 border-radius-8"
          depressed
          >Export CSV</v-btn
        >
      </div>
    </div>

    <div class="border-radius-12 neutral30-border overflow-hidden mt-3">
      <v-data-table
        class="px-3 pb-3"
        :headers="headers"
        :items="userManagerStore.slicedTransactions"
        @click:row="onRowClicked"
        hide-default-footer
      >
        <template v-slot:[`item.id`]="{ item }">
          <div class="text-center neutral50--text">
            {{ item.id }}
          </div>
        </template>
        <template v-slot:[`item.category`]="{ item }">
          <div class="d-flex align-center">
            <v-img
              max-height="24px"
              max-width="24px"
              :src="item.category.iconUrl"
              contain
            />
            <div class="ml-1">
              {{ item.category.name || "Category" }}
            </div>
          </div>
        </template>

        <template v-slot:[`item.name`]="{ item }">
          <div class="text-capitalize">
            {{
              item.campaign && item.campaign
                ? item.campaign.title
                : "Campaign Name"
            }}
          </div>
        </template>
        <template v-slot:[`item.price`]="{ item }">
          <div class="d-flex align-center">
            <div class="token-icon">P</div>
            <!-- <v-img
              class="token-icon"
              max-height="15px"
              max-width="15px"
              :src="require(`@/assets/redeem/coin.webp`)"
              contain
            /> -->
            <div class="text-capitalize text-center ml-1">
              {{ item.campaign && item.campaign ? item.campaign.price : 0 }}
            </div>
          </div>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <div class="text-capitalize">
            {{ item.createdAt | ddmmyyyyhhmmss }}
          </div>
        </template>
      </v-data-table>
    </div>

    <div class="d-flex align-center justify-space-between mt-3">
      <div class="neutral70--text text-sm font-weight-bold">
        Total transaction: {{ userManagerStore.transactions.length }}
      </div>
      <v-pagination
        class="pa-0 mr-n2"
        v-model="userManagerStore.transactionPage"
        :length="userManagerStore.totalTransactionPage"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userManagerStore } from "../stores/userManagerStore";
import { get } from "lodash";

export default {
  components: {
    CampaignDrawer: () => import("../components/inventory-card-drawer.vue"),
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "No.",
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: "Campaign name",
          value: "name",
          align: "start",
        },
        {
          text: "Price",
          value: "price",
          align: "center",
        },
        {
          text: "Category",
          value: "category",
          align: "start",
          sortable: false,
        },
        {
          text: "Code",
          value: "code",
          align: "start",
          sortable: false,
        },
        {
          text: "Date",
          value: "createdAt",
          align: "start",
        },
      ],
    };
  },
  computed: {
    ...mapStores(userManagerStore),
    userName() {
      return (
        get(this.userManagerStore.user, "userMetadata.firstName", "") +
        " " +
        get(this.userManagerStore.user, "userMetadata.lastName", "")
      );
    },
    userToken() {
      return get(this.userManagerStore.user, "userMetadata.token", 0);
    },
  },
  methods: {
    onRowClicked(transaction) {
      if (!transaction || !transaction.campaign) return;
      this.userManagerStore.showTransactionCampaign = true;
      this.userManagerStore.currentCampaign = transaction.campaign;
      this.userManagerStore.currentCampaign.category = transaction.category;
      // this.voucherStore.drawerDetail = true;
    },
    onDisableClicked() {
      this.$dialog.confirm({
        title: "Confirm Disable Account",
        topContent:
          "<span class='error--text'>If you disable this account, users will no longer be able to signin!</span>",
        okText: "Confirm",
        cancelText: "Cancel",
        done: async () => {
          await this.userManagerStore.disableUser();
        },
      });
    },
    routerGoBack() {
      this.$router.go(-1);
    },
  },
  async created() {
    const userId = this.$route.params.id;
    if (!userId) {
      this.$router.push("/user");
      return;
    }
    await this.userManagerStore.fetchUser(userId);
    await this.userManagerStore.fetchUserVouchers(userId);
  },
};
</script>
<style lang="scss" scoped></style>
