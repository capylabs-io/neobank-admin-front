<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <div>
      <v-btn class="px-0 text-none primary--text" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="d-flex justify-space-between">
      <div class="text-dp-xs font-weight-bold">Campaign Detail</div>
      <div>
        <v-btn class="text-none error--text" elevation="0" text
          >Disable Campaign</v-btn
        >
      </div>
    </div>
    <v-card class="neutral30-border border-radius-12 pa-4 mt-3" elevation="0">
      <v-row>
        <v-col cols="12" md="5">
          <v-img
            height="120px"
            class="border-radius-6"
            :src="categoryThumbnail"
            :position="'center 70%'"
          ></v-img>
          <div class="mt-2">
            <div class="text-md neutral70--text font-weight-bold">
              Campaign name
            </div>
            <v-text-field
              v-model="campaignStore.campaign.title"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Description"
              background-color="primary10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
          <div>
            <div class="text-md neutral70--text font-weight-bold">Category</div>
            <v-select
              v-model="campaignStore.campaign.campaignCategory"
              :items="campaignStore.categories"
              background-color="primary10"
              item-text="name"
              item-value="id"
              class="border-radius-6 mt-1"
              placeholder="Filter by Category"
              return-object
              disabled
              flat
              solo
              dense
            >
              <template v-slot:item="{ item }">
                <div class="d-flex align-center">
                  <v-img class="category-icon mr-2" :src="item.icon" />
                  <div>{{ item.name }}</div>
                </div>
              </template>
              <template v-slot:selection="{ item }">
                <div class="d-flex align-center">
                  <v-img class="category-icon mr-2" :src="item.icon" />
                  <div>{{ item.name }}</div>
                </div>
              </template>
            </v-select>
          </div>
          <div>
            <div class="text-md neutral70--text font-weight-bold">
              Market Price
            </div>
            <v-text-field
              v-model="campaignStore.campaign.price"
              class="border-radius-6 mt-1"
              placeholder="Description"
              background-color="primary10"
              flat
              solo
              filled
              dense
              disabled
            >
              <template v-slot:prepend-inner>
                <v-img
                  class="category-icon mr-1"
                  :src="require('@/assets/redeem/coin.webp')"
                ></v-img>
              </template>
            </v-text-field>
          </div>
          <div>
            <div class="text-md neutral70--text font-weight-bold">
              Voucher Status
            </div>
            <v-select
              v-model="campaignStore.campaign.status"
              :items="campaignStore.statusSelection"
              background-color="primary10"
              item-text="title"
              item-value="value"
              class="border-radius-6 mt-1"
              placeholder="Status"
              disabled
              flat
              solo
              dense
            ></v-select>
          </div>
          <div>
            <div class="text-md neutral70--text font-weight-bold">Quantity</div>
            <v-text-field
              v-model="campaignStore.campaign.totalQuantity"
              class="border-radius-6 mt-1"
              placeholder="Quantity"
              background-color="primary10"
              flat
              solo
              filled
              dense
              disabled
            ></v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-md neutral70--text font-weight-bold">
              Voucher Duration
            </div>
            <div
              class="info-field border-radius-6 pa-2 mt-1 d-flex align-center"
            >
              <div>
                {{
                  campaignStore.campaign.startDate || $moment.now() | ddmmyyyy
                }}
                -
                {{ campaignStore.campaign.endDate || $moment.now() | ddmmyyyy }}
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="d-flex flex-column" cols="12" md="7">
          <div>
            <div class="text-md neutral70--text font-weight-bold">
              Short Description
            </div>
            <v-textarea
              v-model="campaignStore.campaign.shortDescription"
              class="border-radius-6 mt-1"
              placeholder="Short Description"
              background-color="primary10"
              hide-details
              no-resize
              flat
              solo
              filled
              disabled
            ></v-textarea>
          </div>
          <div class="flex-grow-1 mt-2 d-flex flex-column">
            <div class="text-md neutral70--text font-weight-bold">
              Description
            </div>
            <v-textarea
              v-model="campaignStore.campaign.fullDescription"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Description"
              background-color="primary10"
              hide-details
              no-resize
              flat
              solo
              filled
              disabled
            ></v-textarea>
          </div>
        </v-col>
      </v-row>
    </v-card>

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
            {{ item.user.data.attributes.username }}
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
          align: "center",
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
    categoryIcon() {
      return get(
        this.campaignStore,
        "campaign.campaignCategory.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
    categoryName() {
      return get(
        this.campaignStore,
        "campaign.campaignCategory.name",
        "Category Name"
      );
    },
    categoryThumbnail() {
      return get(
        this.campaignStore.campaign,
        "thumbnailUrl",
        require("@/assets/home/image1.webp")
      );
    },
    campaignTitle() {
      return get(this.campaignStore, "campaign.title", "Campaign Name");
    },
    campaignPrice() {
      return get(this.campaignStore, "campaign.price", 0);
    },
    campaignQuantity() {
      return get(this.campaignStore, "campaign.totalQuantity", 0);
    },
    campaignStartDate() {
      return get(this.campaignStore, "campaign.startDate", this.$moment.now());
    },
    campaignEndDate() {
      return get(this.campaignStore, "campaign.endDate", this.$moment.now());
    },
    campaignStatus() {
      return get(this.campaignStore, "campaign.status", "active");
    },
  },
  methods: {},
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
