<template>
  <v-card class="chart-card pa-4" rounded="12" outlined>
    <div class="d-flex justify-space-between">
      <div class="neutral100--text text-xs">
        New User thru time
        <v-icon small class="ml-2">mdi-export</v-icon>
      </div>
      <div class="d-flex column-gap-5 left-filter-group">
        <v-btn class="clothes text-caption text-capitalize" text> Week </v-btn>
        <v-btn class="voucher active text-caption text-capitalize" text>
          Month
        </v-btn>
      </div>
    </div>
    <div id="chart" class="mt-2">
      <apexchart
        type="bar"
        height="348"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: ["series"],
  data() {
    return {
      chartOptions: {
        colors: ["#84ADFF"],
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: true,
            tools: {
              download: false,
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
        yaxis: {},
        fill: {
          opacity: 1,
        },
        // tooltip: {
        //   y: {
        //     formatter: function (val) {
        //       return "+43";
        //     },
        //   },
        // },
      },
    };
  },
  computed: {
    ...mapStores(userStore),
  },
};
</script>

<style lang="scss" scoped>
.chart-card {
  height: max-content;
  border-radius: 12px;
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
