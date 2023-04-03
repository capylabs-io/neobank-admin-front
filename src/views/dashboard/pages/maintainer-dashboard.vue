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
                class="text-dp-sm font-weight-bold neutral100--texttext-left"
              >
                128
              </div>
              <div
                class="green60--text text-overline-1 d-flex align-center mt-3"
              >
                <v-icon small class="mr-2 chart-icon" color="green60"
                  >mdi-chart-line</v-icon
                >
                +10
              </div>
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col>
        <v-col cols="12" xl="2"
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
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                5
              </div>
              <div
                class="neutral70--text text-overline-1 d-flex align-center mt-3"
              >
                --
              </div>
            </div>
            <v-icon small class="align-self-start">mdi-export</v-icon>
          </v-card>
        </v-col>
        <v-col cols="12" xl="2"
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
        </v-col>
        <v-col cols="12" xl="3"
          ><v-card
            class="number-card pa-4 d-flex justify-space-between"
            rounded="12"
            outlined
          >
            <div>
              <div class="text-left neutral70--text text-xs">Total Users</div>
              <div
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                2023
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
        </v-col>
        <v-col cols="12" xl="2"
          ><v-card
            class="number-card pa-4 d-flex justify-space-between"
            rounded="12"
            outlined
          >
            <div>
              <div class="text-left neutral70--text text-xs">Partners</div>
              <div
                class="text-dp-sm font-weight-bold neutral100--text text-left"
              >
                10
              </div>
              <div
                class="green60--text text-overline-1 d-flex align-center mt-3"
              >
                <v-icon small class="mr-2 chart-icon" color="green60"
                  >mdi-chart-line</v-icon
                >
                +2
              </div>
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
              <v-icon small class="ml-2">mdi-export</v-icon>
            </div>
            <v-data-table
              class="mt-2"
              :headers="header1"
              :items="users"
              :search="search"
              hide-default-footer
            >
              <template v-slot:[`item.number`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-account-multiple
                </v-icon>
                <span>{{ item.number }}</span>
              </template>
            </v-data-table>
          </v-card></v-col
        >
        <v-col cols="12" xl="7">
          <pieChart :options="options" :width="600" :height="416" :index="1" />
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
              :items="users"
              :search="search"
              hide-default-footer
            >
              <template v-slot:[`item.number`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-account-multiple
                </v-icon>
                <span>{{ item.number }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="7">
          <lineChart />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import pieChart from "@/views/dashboard/components/pie-chart.vue";
import lineChart from "@/views/dashboard/components/line-chart.vue";

export default {
  components: {
    pieChart: pieChart,
    lineChart: lineChart,
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
          value: "name",
          align: "center",
        },
        {
          text: "Quant.",
          value: "number",
          align: "center",
        },
        {
          text: "%",
          value: "percent",
          align: "center",
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
          value: "name",
          align: "center",
        },
        {
          text: "Quant.",
          value: "number",
          align: "center",
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
      options: {
        // plotOptions: {
        //   pie: {
        //     dataLabels: {
        //       offset: -36,
        //     },
        //   },
        // },
        stroke: {
          show: false,
        },
        colors: ["#C1D6FF", "#A1C0FF", "#9592FE", "#726FF3", "#5752E3"],
        chart: {
          width: 240,
          height: 240,
          type: "pie",
        },
        labels: [
          "Beverage 20%",
          "Cinema 20%",
          "Shopping 20%",
          "Telecom 20%",
          "Others 20%",
        ],
        legend: {
          position: "bottom",
        },
      },
    };
  },
  computed: {
    ...mapStores(userStore),
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
  height: max-content;
  border-radius: 12px;
}
.voucher-list-card {
  height: max-content;
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
