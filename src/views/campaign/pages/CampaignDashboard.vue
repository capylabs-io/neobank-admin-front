<template>
  <div>
    <div class="d-flex">
      <div class="d-flex gap-8">
        <v-select
          class="select border-radius-6"
          placeholder="Sort by"
          flat
          solo
          dense
          outlined
        ></v-select>
        <v-select
          class="select border-radius-6"
          placeholder="Filter by Partner"
          flat
          solo
          dense
          outlined
        ></v-select>
        <v-select
          class="select border-radius-6"
          placeholder="Filter by Category"
          flat
          solo
          dense
          outlined
        ></v-select>
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-text-field
          class="border-radius-6"
          placeholder="Search By Name"
          prepend-inner-icon="mdi-magnify"
          flat
          solo
          outlined
          dense
        ></v-text-field>
      </div>
    </div>

    <div>
      <div class="text-sm font-weight-bold">Applied Filter:</div>
      <div class="d-flex mt-1">
        <v-chip color="primary" label close>Test</v-chip>
      </div>
    </div>

    <v-row class="mt-3">
      <v-col cols="12" md="4" sm="6" xs="12">
        <CampaignCard />
      </v-col>
      <v-col cols="12" md="4" sm="6" xs="12">
        <CampaignCard />
      </v-col>
      <v-col cols="12" md="4" sm="6" xs="12">
        <CampaignCard />
      </v-col>
    </v-row>

    <div class="d-flex align-center">
      <div class="neutral70--text text-sm font-weight-bold">
        Total current campaign: 12
      </div>
      <v-spacer></v-spacer>
      <v-pagination :length="1" color="primary"></v-pagination>
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
};
</script>

<style scoped>
.select {
  max-width: 184px;
}
</style>