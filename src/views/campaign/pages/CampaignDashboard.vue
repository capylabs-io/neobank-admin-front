<template>
  <div>
    <div class="d-flex">
      <div class="d-flex gap-8">
        <v-autocomplete
          class="select border-radius-6"
          placeholder="Filter by Partner"
          v-model="campaignStore.filterPartner"
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
      <div>
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
export default {
  computed: {
    ...mapStores(campaignStore),
  },
  components: {
    CampaignCard: () => import("../components/campaign-card.vue"),
  },
  async created() {
    await this.campaignStore.fetchCampaigns();
    await this.campaignStore.fetchCategories();
    await this.campaignStore.fetchPartners();
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
