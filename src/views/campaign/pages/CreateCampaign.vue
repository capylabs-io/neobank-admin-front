<template>
  <div>
    <div>
      <v-btn class="px-0 text-none primary--text" @click="routerGoBack" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="d-flex justify-space-between">
      <div class="text-dp-xs font-weight-bold">Create Campaign</div>
      <div class="d-flex align-center gap-8">
        <v-btn
          class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
          @click="routerGoBack"
          v-if="campaignStore.isEditing"
          depressed
          >Cancel</v-btn
        >
        <v-btn
          class="text-none font-weight-bold px-2 border-radius-8"
          color="primary"
          @click="campaignStore.createCampaign"
          depressed
          >Publish</v-btn
        >
      </div>
    </div>

    <div>
      <CampaignForm :isCreate="true" />
    </div>
  </div>
</template>

<script>
import { campaignStore } from "../stores/campaignStore";
import { mapStores } from "pinia";

export default {
  components: {
    CampaignForm: () => import("../components/campaign-form.vue"),
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(campaignStore),
  },
  methods: {
    routerGoBack() {
      this.$router.go(-1);
    },
  },
  async created() {
    this.campaignStore.isEditing = true;
    this.campaignStore.campaign = {};
    await this.campaignStore.fetchCategories();
  },
};
</script>