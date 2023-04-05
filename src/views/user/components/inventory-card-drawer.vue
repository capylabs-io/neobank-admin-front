<template>
  <v-navigation-drawer
    v-model="userManagerStore.showTransactionCampaign"
    absolute
    temporary
    right
    hide-overlay
    width="420px"
    color="white"
    class="drawer d-flex flex-column"
  >
    <v-card class="pa-4" flat>
      <v-img
        class="border-radius-12 elevation-1"
        :max-height="244"
        :src="userManagerStore.currentCampaign.thumbnailUrl"
        cover
      ></v-img>
      <div class="mt-4">
        <v-img
          class="mx-auto"
          max-height="36px"
          max-width="36px"
          :src="categoryIcon"
          contain
        />
        <div class="font-weight-bold text-lg text-center mt-2">
          {{ userManagerStore.currentCampaign.title }}
        </div>
        <div class="font-weight-bold neutral70--text text-sm text-center mt-2">
          {{ userManagerStore.currentCampaign.shortDescription }}
        </div>
        <div class="mx-auto text-center">
          <v-btn
            class="mx-auto text-none text-btn primary--text mt-2"
            @click="goToCampaignDetail"
            text
            >Campaign Detail
            <v-icon color="primary" small>mdi-chevron-double-right</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="mt-4">
        <div class="d-flex align-center justify-space-between">
          <div class="text-sm neutral70--text font-weight-bold">Quantity</div>
          <div class="font-weight-bold text-sm"></div>
        </div>
        <v-progress-linear
          class="mt-2 border-radius-16"
          color="primary40"
          background-color="neutral30"
          height="16"
          :value="
            (userManagerStore.currentCampaign.purchasedQuantity /
              userManagerStore.currentCampaign.totalQuantity) *
            100
          "
          rounded
        >
          <template v-slot:default="{}">
            <strong class="white--text text-sm">
              {{ userManagerStore.currentCampaign.purchasedQuantity }}/{{
                userManagerStore.currentCampaign.totalQuantity
              }}</strong
            >
          </template>
        </v-progress-linear>
        <div class="text-sm neutral70--text font-weight-bold mt-3">
          Category
        </div>
        <div class="d-flex align-center neutral10-bg px-2 border-radius-8 mt-1">
          <v-img
            max-height="36px"
            max-width="36px"
            :src="categoryIcon"
            contain
          />
          <div class="ml-2">
            {{ categoryName }}
          </div>
        </div>
        <div class="text-sm neutral70--text font-weight-bold mt-3">Status</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="neutral10"
          readonly
          class="mt-1 border-radius-8"
          :value="userManagerStore.currentCampaign.status"
          solo
          dense
          hide-details
          flat
        />
        <div class="text-sm neutral70--text font-weight-bold mt-3">Price</div>
        <v-text-field
          height="36px"
          type="text"
          background-color="neutral10"
          class="mt-1 border-radius-8"
          :value="userManagerStore.currentCampaign.price"
          solo
          readonly
          dense
          hide-details
          flat
        >
          <template #prepend-inner>
            <div class="mr-2 pt-1">
              <v-img
                width="15px"
                height="15px"
                :style="{
                  'border-radius': '40px',
                  border: '1px solid black',
                }"
                :src="require(`@/assets/redeem/coin.webp`)"
              />
            </div>
          </template>
        </v-text-field>
      </div>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from "pinia";
import { userManagerStore } from "../stores/userManagerStore";
import { get } from "lodash";
export default {
  computed: {
    ...mapStores(userManagerStore),
    categoryIcon() {
      return get(
        this.userManagerStore.currentCampaign,
        "category.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
    categoryName() {
      return get(
        this.userManagerStore.currentCampaign,
        "category.name",
        "Category Name"
      );
    },
  },
  methods: {
    goToCampaignDetail() {
      this.$router.push(
        "/campaign/" + this.userManagerStore.currentCampaign.id
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
