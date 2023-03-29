<template>
  <div class="d-flex flex-column">
    <div class="right-container align-self-center pa-6 full-height">
      <div class="text-left" :style="{ fontWeight: '700' }">
        Voucher Metrics
      </div>
      <div class="full-width mt-6 card-container">
        <v-row>
          <v-col cols="12" xl="3">
            <v-card class="number-card pa-4" rounded="12" outlined>
              <div class="text-left">Total Vouchers</div>
              <div class="text-md-h4 text-left">3000</div>
            </v-card>
          </v-col>
          <v-col cols="12" xl="3"
            ><v-card class="number-card pa-4" rounded="12" outlined>
              <div class="text-left">Voucher Purchased</div>
              <div class="text-md-h4 text-left">3000</div>
            </v-card>
          </v-col>
          <v-col cols="12" xl="3"
            ><v-card class="number-card pa-4" rounded="12" outlined>
              <div class="text-left">Voucher Available</div>
              <div class="text-md-h4 text-left">3000</div>
            </v-card>
          </v-col>
          <v-col cols="12" xl="3"
            ><v-card class="number-card pa-4" rounded="12" outlined>
              <div class="text-left">Total Vouchers</div>
              <div class="text-md-h4 text-left"></div>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div class="full-width mt-6 card-container">
        <v-row>
          <v-col cols="12" xl="7"
            ><v-card class="chart-card pa-4" rounded="12" outlined>
              <div class="text-left" :style="{ fontWeight: '700' }">
                Chart name here
              </div>
              <div id="chart" class="d-flex justify-center mt-2">
                <apexchart
                  type="pie"
                  width="380"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div> </v-card
          ></v-col>
          <v-col cols="12" xl="5"
            ><v-card class="voucher-list-card pa-4" rounded="12" outlined>
              <div class="text-center" :style="{ fontWeight: '700' }">
                Top Most Purchased Voucher
              </div>
              <v-data-table
                class="mt-2"
                :headers="headers"
                :items="users"
                :search="search"
                hide-default-footer
                hide-default-header
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
        </v-row>
      </div>
      <div class="full-width mt-6 card-container">
        <v-row>
          <v-col cols="12" xl="2" md="3" sm="6" xs="12">
            <card></card>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="pagination">
      <v-pagination :length="3" light circle color="#5752e3" />
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import dashboardCard from "@/views/redeem/components/dashBoard-card.vue";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    card: dashboardCard,
    apexchart: VueApexCharts,
  },

  data() {
    return {
      status: ["Availble", "Expired", "Purchased"],
      sort: ["By Name", "By Time", "By Price"],
      headers: [
        {
          text: "No.",
          align: "start",
          filterable: false,
          sortable: false,
          value: "id",
          align: "center",
        },
        {
          text: "Voucher",
          value: "name",
          align: "center",
        },
        {
          text: "NumberUser",
          value: "number",
          align: "center",
        },
      ],
      users: [
        {
          id: "1",
          name: "Voucher name here",
          number: "10000",
        },
        {
          id: "2",
          name: "Voucher name here",
          number: "10000",
        },
        {
          id: "3",
          name: "Voucher name here",
          number: "10000",
        },
        {
          id: "4",
          name: "Voucher name here",
          number: "10000",
        },
        {
          id: "5",
          name: "Voucher name here",
          number: "10000",
        },
        {
          id: "6",
          name: "Voucher name here",
          number: "10000",
        },
      ],
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
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
  height: 350px;
  border-radius: 12px;
}
.voucher-list-card {
  height: 350px;
  border-radius: 12px;
}
.column-gap-10 {
  column-gap: 10px;
}
.row-gap-3 {
  row-gap: 3px;
}
.row-gap-6 {
  row-gap: 6px;
}
.v-btn {
  border-radius: 8px;
  text-transform: capitalize;
}
.gap-45 {
  gap: 45px;
}
.left-profile-section {
  background: #f5f8ff;
  border-radius: 8px;
  padding: 8px, 16px, 8px, 16px;
}

.content {
  border-radius: 8px;
}
.content:hover {
  background: #f5f8ff;
  .v-icon {
    color: #2970ff;
  }
}
.right-container {
  width: 1500px;
}
.card-container {
  height: max-content;
  animation: fadeleft 1s ease-in-out;
}
.button-filter {
  animation: fadeleft 1s ease-in-out;
}

.active {
  background: #5752e3;
  color: white;
}
.pagination {
  z-index: 97;
}

@keyframes fadeleft {
  0% {
    opacity: 0;
    transform: translatex(-100px);
  }
  100% {
    opacity: 1;
  }
}
</style>
