<template>
  <div class="d-flex flex-column">
    <changeBannerDialog />
    <div class="full-width">
      <v-btn
        class="btn-image-change"
        icon
        @click="dashBoardStore.changeBannerDialog = true"
        ><v-icon color="white" large>mdi-camera-outline</v-icon>
      </v-btn>
      <v-img
        class="image"
        height="240"
        :src="
          userStore.partner.bannerUrl
            ? userStore.partner.bannerUrl
            : require('@/assets/views/dashboard/dashboard.webp')
        "
      ></v-img>
    </div>
    <div class="full-width card-container mt-4">
      <v-row>
        <v-col cols="5">
          <div class="neutral100--text text-dp-xs font-weight-bold">
            Metric Overview
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xl="3">
          <v-card
            class="number-card pa-4 d-flex justify-space-between"
            rounded="12"
            outlined
          >
            <div>
              <div class="text-left neutral70--text text-xs">
                Total Campaign
              </div>
              <div
                v-if="dashBoardStore.partnerDashboard.totalCampaigns"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.partnerDashboard.totalCampaigns }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                0
              </div>
              <!-- <div
                class="green60--text text-overline-1 d-flex align-center mt-3"
              >
                <v-icon small class="mr-2 chart-icon" color="green60"
                  >mdi-chart-line</v-icon
                >
                +10
              </div> -->
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col>
        <v-col cols="12" xl="3"
          ><v-card
            class="number-card pa-4 d-flex justify-space-between"
            rounded="12"
            outlined
          >
            <div>
              <div class="text-left neutral70--text text-xs">
                Total Categories
              </div>
              <div
                v-if="dashBoardStore.partnerDashboard.totalCategories"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.partnerDashboard.totalCategories }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                0
              </div>
              <!-- <div
                class="neutral70--text text-overline-1 d-flex align-center mt-3"
              >
                --
              </div> -->
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col>
        <!-- <v-col cols="12" xl="2"
          ><v-card
            class="number-card pa-4 d-flex justify-space-between"
            rounded="12"
            outlined
          >
            <div>
              <div class="text-left neutral70--text text-xs">
                Campaign Active
              </div>
              <div
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                86
              </div>
              <div
                class="green60--text text-overline-1 d-flex align-center mt-3"
              >
                <v-icon small class="mr-2 chart-icon" color="green60"
                  >mdi-chart-line</v-icon
                >
                +100
              </div>
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col> -->
        <v-col cols="12" xl="3"
          ><v-card
            class="number-card pa-4 d-flex justify-space-between"
            rounded="12"
            outlined
          >
            <div>
              <div class="text-left neutral70--text text-xs">
                Campaign Active
              </div>
              <div
                v-if="dashBoardStore.partnerDashboard.totalCampaignActive"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.partnerDashboard.totalCampaignActive }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                0
              </div>
              <!-- <div
                class="green60--text text-overline-1 d-flex align-center mt-3"
              >
                <v-icon small class="mr-2 chart-icon" color="green60"
                  >mdi-chart-line</v-icon
                >
                +100
              </div> -->
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col>
        <v-col cols="3"
          ><v-card
            class="number-card pa-4 d-flex justify-space-between"
            rounded="12"
            outlined
          >
            <div>
              <div class="text-left neutral70--text text-xs">
                Total Purchase
              </div>
              <div
                v-if="dashBoardStore.partnerDashboard.totalPurchased"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.partnerDashboard.totalPurchased }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                0
              </div>
              <!-- <div
                class="green60--text text-overline-1 d-flex align-center mt-3"
              >
                <v-icon small class="mr-2 chart-icon" color="green60"
                  >mdi-chart-line</v-icon
                >
                +2
              </div> -->
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xl="5"
          ><v-card class="voucher-list-card pa-4" rounded="12" outlined>
            <div class="text-center neutral100-text text-xs">
              Most purchased Campaign
            </div>
            <v-data-table
              class="mt-2"
              :headers="header"
              :items="dashBoardStore.partnerDashboard.mostPurchasedCampaign"
              hide-default-footer
            >
              <template v-slot:[`item.vouchers.count`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-account-multiple
                </v-icon>
                <span>{{ item.vouchers.count }}</span>
              </template>
            </v-data-table>
          </v-card></v-col
        >
        <v-col cols="7">
          <pieChart
            class="full-height"
            :options="options"
            :width="600"
            :height="380"
            :index="1"
            :series="dashBoardStore.pieSeries"
            :labels="dashBoardStore.pieLabels"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { dashBoardStore } from "@/views/dashboard/stores/dashBoardStore";
import pieChart from "@/views/dashboard/components/pie-chart.vue";
import { get } from "lodash";

export default {
  components: {
    pieChart: pieChart,
    changeBannerDialog: () => import("../dialogs/change-banner-dialog.vue"),
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(dashBoardStore),
    totalCampaigns() {
      return get(this.dashBoardStore, "partnerDashboard.totalCampaigns", 0);
    },
  },
  async created() {
    await this.dashBoardStore.fetchPartnerDashBoard();
  },
  data() {
    return {
      header: [
        {
          text: "No.",
          align: "start",
          filterable: false,
          sortable: false,
          value: "id",
          align: "center",
        },
        {
          text: "Brand name",
          value: "title",
          align: "left",
          filterable: false,
          sortable: false,
        },
        {
          text: "Quant.",
          value: "vouchers.count",
          align: "left",
          filterable: false,
          sortable: false,
        },
      ],
      users: [
        {
          id: "1",
          name: "Grab",
          number: "10000",
          percent: "25%",
        },
        {
          id: "2",
          name: "Grab",
          number: "10000",
          percent: "20%",
        },
        {
          id: "3",
          name: "Grab",
          number: "10000",
          percent: "10%",
        },
        {
          id: "4",
          name: "Grab",
          number: "10000",
          percent: "10%",
        },
        {
          id: "5",
          name: "Grab",
          number: "10000",
          percent: "10%",
        },
        {
          id: "6",
          name: "Grab",
          number: "10000",
          percent: "10%",
        },

        {
          id: "7",
          name: "Grab",
          number: "10000",
          percent: "10%",
        },
      ],
      pieSeries: [33, 20, 20, 20, 7],

      options: {
        stroke: {
          show: false,
        },
        colors: [
          "#FD0100",
          "#F76915",
          "#EEDE04",
          "#A0D636",
          "#2FA236",
          "#333ED4",
        ],
        chart: {
          type: "pie",
        },
      },
    };
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.number-card {
  height: 120px;
  border-radius: 12px;
}
.voucher-list-card {
  height: 100%;
  border-radius: 12px;
}

.card-container {
  height: max-content;
  animation: fadeleft 1s ease-in-out;
}

.chart-icon {
  width: 11px;
  height: 9px;
}
.btn-image-change {
  width: 50px;
  height: 50px;
  position: absolute !important;
  z-index: 2;
}
.image {
  z-index: 1;
}
</style>
