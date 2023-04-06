<template>
  <div class="d-flex flex-column">
    <div class="full-width card-container">
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
                v-if="dashBoardStore.dashboard.totalCampaigns"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.dashboard.totalCampaigns }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                128
              </div>
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
                v-if="dashBoardStore.dashboard.totalCategories"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.dashboard.totalCategories }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                5
              </div>
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
              <div class="text-left neutral70--text text-xs">Total Users</div>
              <div
                v-if="dashBoardStore.dashboard.totalUsers"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.dashboard.totalUsers }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                2023
              </div>
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
              <div class="text-left neutral70--text text-xs">Partners</div>
              <div
                v-if="dashBoardStore.dashboard.totalPartners"
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                {{ dashBoardStore.dashboard.totalPartners }}
              </div>
              <div
                v-else
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                10
              </div>
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5"
          ><v-card class="voucher-list-card pa-4" rounded="12" outlined>
            <div class="text-center neutral100-text text-xs">
              Most purchased Campaign
              <v-icon small class="ml-2">mdi-export</v-icon>
            </div>
            <v-data-table
              class="mt-2"
              :headers="header1"
              :items="dashBoardStore.dashboard.mostPurchasedCampaign"
              hide-default-footer
            >
              <template v-slot:[`item.total_quantity`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-account-multiple
                </v-icon>
                <span>{{ item.total_quantity }}</span>
              </template>
              <template v-slot:[`item.percentage`]="{ item }">
                <span>{{ Math.round(item.percentage * 100) / 100 }}</span>
              </template>
            </v-data-table>
          </v-card></v-col
        >
        <v-col cols="7">
          <pieChart
            :width="600"
            :height="416"
            :options="options"
            :index="1"
            :series="dashBoardStore.pieSeries"
            :labels="pieLabels"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5"
          ><v-card class="voucher-list-card pa-4" rounded="12" outlined>
            <div class="text-center neutral100-text text-xs">
              Campaign by each Partner
              <v-icon small class="ml-2">mdi-export</v-icon>
            </div>
            <v-data-table
              class="mt-2"
              :headers="header2"
              :items="dashBoardStore.dashboard.campaignByEachPartner"
              hide-default-footer
            >
              <template v-slot:[`item.campaigns.count`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-account-multiple
                </v-icon>
                <span>{{ item.campaigns.count }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="7">
          <lineChart
            :xAxis="dashBoardStore.lineCategory"
            :series="lineSeries"
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
import lineChart from "@/views/dashboard/components/line-chart.vue";

export default {
  components: {
    pieChart: pieChart,
    lineChart: lineChart,
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(dashBoardStore),
    pieLabels() {
      return this.dashBoardStore.pieLabels;
    },
    columnSeries() {
      return this.dashBoardStore.lineSeries;
    },
  },
  async created() {
    await this.dashBoardStore.fetchMaintainerDashBoard();
    this.lineSeries.push({
      name: "New Users",
      data: this.columnSeries,
    });
  },
  data() {
    return {
      type: "pie",
      header1: [
        {
          text: "No.",
          align: "start",
          filterable: false,
          sortable: false,
          value: "id",
          align: "center",
        },
        {
          text: "Brand",
          value: "title",
          align: "left",
          filterable: false,
          sortable: false,
        },
        {
          text: "Total Quant.",
          value: "total_quantity",
          align: "left",
          filterable: false,
          sortable: false,
        },
        {
          text: "Percent(%)",
          value: "percentage",
          align: "left",
          filterable: false,
          sortable: false,
        },
      ],

      header2: [
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
          value: "brandName",
          align: "left",
          filterable: false,
          sortable: false,
        },
        {
          text: "Quant.",
          value: "campaigns.count",
          align: "left",
          filterable: false,
          sortable: false,
        },
      ],
      lineSeries: [
        {
          name: "month",
          data: [],
          // data: [25, 43, 32, 65, 85, 58, 27, 36, 1, 1, 1, 1],
        },
      ],
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
        legend: {
          position: "bottom",
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
.chart-card {
  height: 100%;
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
.column-gap-5 {
  column-gap: 5px;
}
.left-filter-group {
  color: var(--v-neutral50-base);
  background-color: var(--v-neutral20-base);
  width: max-content;
  height: max-content;
  border-radius: 6px;
  padding: 2px;
}
.active {
  background: white;
  color: black;
  font-weight: bold;
}
</style>
