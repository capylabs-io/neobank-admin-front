<template>
  <v-card class="chart-card pa-4" rounded="12" outlined>
    <div class="text-center neutral100--text text-xs" v-if="index == 1">
      Total Categories (in Percentage %)
      <v-icon small class="ml-2">mdi-export</v-icon>
    </div>
    <div class="text-left neutral100--text text-xs" v-else>
      Total Categories (%)
    </div>
    <div id="chart" class="d-flex justify-center mt-2 chart">
      <apexchart
        :width="width"
        :height="height"
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
  props: {
    options: Object,
    index: Number,
    width: Number,
    height: Number,
    series: Array,
    labels: Array,
  },
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
    chartOptions() {
      return {
        ...this.options,
        labels: this.labels,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-card {
  height: max-content;
  border-radius: 12px;
}
</style>
