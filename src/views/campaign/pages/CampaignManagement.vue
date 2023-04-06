<template>
  <div>
    <div class="d-flex">
      <div class="d-flex gap-8">
        <v-autocomplete
          class="select border-radius-6"
          placeholder="Filter by Partner"
          v-model="campaignStore.filterPartner"
          v-if="userStore.isMaintainer"
          :items="campaignStore.partners"
          item-text="brandName"
          item-value="id"
          multiple
          return-object
          flat
          solo
          dense
          outlined
          hide-details
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.brandName }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text text-caption">
              (+{{ campaignStore.filterPartner.length - 1 }} others)
            </span>
          </template>
        </v-autocomplete>
        <v-select
          v-model="campaignStore.filterCategory"
          :items="campaignStore.categories"
          item-text="name"
          item-value="id"
          class="select border-radius-6"
          placeholder="Filter by Category"
          return-object
          multiple
          flat
          solo
          dense
          outlined
          hide-details
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index === 0">
              <span>{{ item.name }}</span>
            </v-chip>
            <span v-if="index === 1" class="grey--text text-caption">
              (+{{ campaignStore.filterCategory.length - 1 }} others)
            </span>
          </template>
        </v-select>
        <v-select
          v-model="campaignStore.filterStatus"
          :items="campaignStore.filterStatusSelection"
          item-value="value"
          item-text="title"
          class="select border-radius-6"
          placeholder="Filter by Status"
          flat
          solo
          dense
          outlined
          hide-details
        ></v-select>
      </div>
      <v-spacer></v-spacer>
      <v-select
        class="sort-select border-radius-6"
        placeholder="Sort by"
        v-model="campaignStore.sortBy"
        :items="campaignStore.sortSelection"
        item-text="title"
        item-value="value"
        flat
        solo
        dense
        outlined
        hide-details
      ></v-select>
    </div>

    <div class="d-flex align-center mt-4">
      <div class="flex-grow-1 pr-4">
        <div class="text-sm font-weight-bold">Applied Filter:</div>
        <div class="d-flex gap-4 mt-1" v-if="campaignStore.filters.length > 0">
          <v-chip
            color="primary"
            v-for="(filter, index) in campaignStore.filters"
            :key="index"
            @click:close="campaignStore.removeFilter(filter)"
            label
            close
            >{{ filter.filterName }}
          </v-chip>
        </div>
        <div class="mt-1" v-else>
          <v-chip color="primary" label>All </v-chip>
        </div>
      </div>
      <div class="d-flex align-center gap-16">
        <v-text-field
          v-model="campaignStore.searchKey"
          class="border-radius-6"
          placeholder="Search By Name"
          prepend-inner-icon="mdi-magnify"
          flat
          solo
          outlined
          dense
          hide-details
          clearable
        ></v-text-field>
        <JsonExcel
          :data="campaignStore.filteredCampaigns"
          :fields="exportExcelFields"
          :before-generate="showLoading"
          :before-finish="hideLoading"
          worksheet="Campaigns"
          name="campaigns.xls"
        >
          <v-btn
            class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
            depressed
            >Export Excel</v-btn
          >
        </JsonExcel>
        <v-btn
          class="text-none text-btn"
          color="primary"
          v-if="userStore.isPartner"
          @click="goToCreateCampaign"
          depressed
        >
          <v-icon class="mr-1" small>mdi-plus</v-icon>
          Create
        </v-btn>
      </div>
    </div>

    <v-row class="mt-3">
      <v-col
        cols="12"
        md="4"
        sm="6"
        xs="12"
        v-for="campaign in campaignStore.slicedCampaigns"
        :key="campaign.id"
      >
        <CampaignCard :campaign="campaign" />
      </v-col>
    </v-row>
    <div
      class="full-width mx-auto d-flex flex-column justify-center"
      style="min-height: 320px"
      v-if="!campaignStore.campaigns || campaignStore.campaigns.length == 0"
    >
      <div class="text-dp-xs neutral70--text text-center">No Campaign yet!</div>
    </div>

    <div class="d-flex align-center">
      <div class="neutral70--text text-sm font-weight-bold">
        Total campaign: {{ campaignStore.campaigns.length }}
      </div>
      <v-spacer></v-spacer>
      <v-pagination
        :length="campaignStore.totalCampaignPage"
        :total-visible="7"
        v-model="campaignStore.campaignPage"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { campaignStore } from "../stores/campaignStore";
import { userStore } from "@/stores/userStore";
import JsonExcel from "vue-json-excel";
import CampaignHelper from "@/helpers/campaign-helper";
import moment from "moment";

export default {
  components: {
    CampaignCard: () => import("../components/campaign-card.vue"),
    JsonExcel,
  },
  data() {
    return {
      exportExcelFields: {
        Title: "title",
        "Short Description": "shortDescription",
        "Full Description": "fullDescription",
        Status: {
          field: "status",
          callback: (value) => CampaignHelper.statusTitle(value),
        },
        Price: "price",
        "Purchased Quantity": {
          field: "purchasedQuantity",
          callback: (value) => {
            if (value) return value || 0;
            return 0;
          },
        },
        "Total Quantity": "totalQuantity",
        "Start Date": {
          field: "startDate",
          callback: (value) => {
            if (value) return moment(value).format("DD/MM/YYYY");
            return "";
          },
        },
        "End Date": {
          field: "endDate",
          callback: (value) => {
            if (value) return moment(value).format("DD/MM/YYYY");
            return "";
          },
        },
        Publisher: {
          field: "partner",
          callback: (value) => {
            if (value) return value.brandName || "Partner";
            return "Partner";
          },
        },
        Category: {
          field: "campaignCategory",
          callback: (value) => {
            if (value) return value.name || "Category";
            return "Category";
          },
        },
      },
    };
  },
  // watch: {
  //   "campaignStore.filteredCampaigns": {
  //     handler(campaigns) {
  //       if (!campaigns && !campaigns.length == 0) return;
  //       this.exportedCampaigns = campaigns;
  //     },
  //     immediate: true,
  //   },
  // },
  computed: {
    ...mapStores(campaignStore),
    ...mapStores(userStore),
    exportedCampaigns() {
      return this.campaignStore.campaigns;
    },
  },
  async created() {
    await this.campaignStore.fetchCampaigns();
    await this.campaignStore.fetchCategories();
    await this.campaignStore.fetchPartners();
  },
  methods: {
    goToCreateCampaign() {
      this.$router.push("/create-campaign");
    },
    showLoading() {
      this.$loading.show();
    },
    hideLoading() {
      this.$loading.hide();
    },
  },
};
</script>

<style scoped>
.select {
  max-width: 250px;
}
.sort-select {
  max-width: 282px;
}
</style>
