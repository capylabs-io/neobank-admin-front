<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <div>
      <v-btn class="px-0 text-none primary--text" @click="routerGoBack" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="d-flex justify-space-between">
      <div class="text-dp-xs font-weight-bold">Campaign Detail</div>
      <div class="d-flex align-center gap-8">
        <v-btn
          class="border-radius-8 text-none error--text"
          @click="onDisableClicked"
          elevation="0"
          text
          >Disable Campaign</v-btn
        >
        <v-btn
          class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
          @click="campaignStore.isEditing = true"
          v-if="!campaignStore.isEditing"
          depressed
          >Edit Info</v-btn
        >
        <v-btn
          class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
          @click="campaignStore.isEditing = false"
          v-if="campaignStore.isEditing"
          depressed
          >Cancel</v-btn
        >
        <v-btn
          class="text-none font-weight-bold px-2 border-radius-8"
          color="primary"
          v-if="campaignStore.isEditing"
          @click="campaignStore.updateCampaign"
          depressed
          >Save Change</v-btn
        >
      </div>
    </div>
    <div>
      <CampaignForm />
    </div>

    <div class="d-flex align-center justify-space-between mt-6">
      <div class="text-lg font-weight-bold">Transaction History</div>
      <v-text-field
        v-model="campaignStore.transactionSearchKey"
        class="search-field border-radius-6"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        flat
        solo
        outlined
        dense
        hide-details
      ></v-text-field>
    </div>
    <div class="border-radius-12 neutral30-border overflow-hidden mt-3">
      <v-data-table
        class="px-3 pb-3"
        :headers="headers"
        :items="campaignStore.slicedTransactions"
        hide-default-footer
      >
        <template v-slot:[`item.id`]="{ item }">
          <div class="text-center neutral50--text">
            {{ item.id }}
          </div>
        </template>
        <template v-slot:[`item.user`]="{ item }">
          <div class="text-capitalize">
            {{
              item.user && item.user.data
                ? item.user.data.attributes.username
                : "User"
            }}
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
        Total transaction: {{ campaignStore.transactions.length }}
      </div>
      <v-pagination
        class="pa-0 mr-n2"
        v-model="campaignStore.transactionPage"
        :length="campaignStore.totalTransactionPage"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { campaignStore } from "../stores/campaignStore";
import { mapStores } from "pinia";
import { get } from "lodash";
import CampaignHelper from "@/helpers/campaign-helper";

export default {
  components: {
    CampaignForm: () => import("../components/campaign-form.vue"),
  },
  data() {
    return {
      campaignHelper: CampaignHelper,
      campaignId: 0,
      headers: [
        {
          text: "No.",
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: "User",
          value: "user",
          align: "start",
        },
        {
          text: "Date",
          value: "createdAt",
          align: "center",
        },
        {
          text: "Code",
          value: "code",
          align: "center",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    ...mapStores(campaignStore),
  },
  methods: {
    routerGoBack() {
      this.$router.go(-1);
    },
    onDisableClicked() {
      this.$dialog.confirm({
        title: "Confirm Disable Campaign",
        topContent:
          "<span class='error--text'>If you disable this campaign, users will no longer be able to access it!</span>",
        okText: "Confirm",
        cancelText: "Cancel",
        done: async () => {
          await this.campaignStore.disableCampaign();
        },
      });
    },
  },
  async created() {
    this.campaignId = this.$route.params.id;
    if (!this.campaignId) this.$router.push("/");
    await this.campaignStore.fetchCampaign(this.campaignId);
    if (!this.campaignStore.campaign) this.$router.push("/");
    await this.campaignStore.fetchCategories();
    await this.campaignStore.fetchCampaignTransactions();
  },
};
</script>

<style scoped>
.info-field {
  background: var(--v-primary10-base) !important;
}
.search-field {
  max-width: 240px;
}
.category-icon {
  width: 16px !important;
}
</style>
