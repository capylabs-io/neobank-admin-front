<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="campaign-card pa-3 border-radius-16 cursor-pointer"
      :class="{ 'campaign-card-hover': isHovering }"
      elevation="0"
      v-bind="props"
      @click.stop="onCampaignCardClick"
    >
      <div>
        <v-img
          class="campaign-card-img border-radius-8"
          :src="campaign.thumbnailUrl"
          cover
        >
          <div
            class="card-status white--text font-weight-bold text-capitalize elevation-6 px-2"
            :style="'background:' + getStatusColor"
          >
            {{ getStatusTitle }}
          </div>
        </v-img>
      </div>
      <div class="mt-3">
        <div class="text-md text-center font-weight-bold">
          {{ campaign.title }}
        </div>
      </div>
      <div class="mt-2">
        <div class="d-flex align-center">
          <div class="text-sm neutral70--text">Quantity</div>
          <v-spacer></v-spacer>
          <div class="text-md font-weight-bold">
            {{ campaign.purchasedQuantity || 0 }}/{{
              campaign.totalQuantity || 0
            }}
          </div>
        </div>
        <v-progress-linear
          class="mt-1"
          color="primary40"
          background-color="neutral30"
          height="8"
          :value="progress"
          rounded
        ></v-progress-linear>
      </div>

      <v-row class="mt-1">
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-account-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">Publisher</span>
          </div>
          <div class="text-sm font-weight-bold">
            {{ getPublisher }}
          </div>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-img class="category-icon" :src="getCategoryIcon" cover></v-img>
            <span class="neutral70--text text-sm ml-1">Category</span>
          </div>
          <div class="text-sm font-weight-bold">Movie</div>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-calendar-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">Start date</span>
          </div>
          <div class="text-sm font-weight-bold">
            {{ campaign.startDate | ddmmyyyy }}
          </div>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-calendar-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">End date</span>
          </div>
          <div class="text-sm font-weight-bold">
            {{ campaign.endDate | ddmmyyyy }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
import CampaignHelper from "@/helpers/campaign-helper";
import { get } from "lodash";
export default {
  props: {
    campaign: Object,
  },
  methods: {
    onCampaignCardClick() {
      if (this.campaign && this.campaign.id)
        this.$router.push(`/campaign/${this.campaign.id}`);
    },
  },
  computed: {
    progress() {
      if (
        !this.campaign ||
        !this.campaign.totalQuantity ||
        this.campaign.totalQuantity == 0
      )
        return 0;
      return (
        (get(this.campaign, "purchasedQuantity", 0) /
          this.campaign.totalQuantity) *
        100
      );
    },
    getStatusColor() {
      return CampaignHelper.statusColor(this.campaign);
    },
    getStatusTitle() {
      return CampaignHelper.statusTitle(this.campaign.status);
    },
    getPublisher() {
      return get(this.campaign, "partner.brandName", "Partner");
    },
    getCategoryIcon() {
      return get(
        this.campaign,
        "campaignCategory.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
  },
};
</script>

<style scoped>
.campaign-card {
  border: 1px solid var(--v-neutral30-base);
}
.campaign-card-img {
  height: 168px;
}
.campaign-card-hover {
  border: 1px solid var(--v-primary-base) !important;
}
.card-status {
  position: absolute;
  border-radius: 4px;
  top: 8px;
}
.category-icon {
  width: 14px;
  height: 14px;
}
</style>
