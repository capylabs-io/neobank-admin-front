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
          :src="require('@/assets/redeem/card/cgv-card.webp')"
          cover
        ></v-img>
      </div>
      <div class="mt-3">
        <div class="text-md text-center font-weight-bold">
          50.000đ Voucher Film Ticket CGV and BHD Cinema in Saigon
        </div>
      </div>
      <div class="mt-2">
        <div class="d-flex align-center">
          <div class="text-sm neutral70--text">Quantity</div>
          <v-spacer></v-spacer>
          <div class="text-md font-weight-bold">30/100</div>
        </div>
        <v-progress-linear
          class="mt-1"
          color="primary40"
          background-color="neutral30"
          value="15"
          height="8"
          rounded
        ></v-progress-linear>
      </div>

      <v-row class="mt-1">
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-account-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">Publisher</span>
          </div>
          <div class="text-sm font-weight-bold">CGV</div>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-folder-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">Status</span>
          </div>
          <div class="text-sm font-weight-bold d-flex align-center">
            <v-icon class="mr-1" color="primary50" x-small> mdi-circle</v-icon>
            New Deal
          </div>
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-folder-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">Category</span>
          </div>
          <div class="text-sm font-weight-bold">Movie</div>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-calendar-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">End date</span>
          </div>
          <div class="text-sm font-weight-bold">12 Aug - 23 Oct</div>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
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
</style>
