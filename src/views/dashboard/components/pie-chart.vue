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
        :type="type"
        :width="width"
        :height="height"
        :options="options"
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
  props: ["options", "width", "height"],
  components: {
    apexchart: VueApexCharts,
  },

  data() {
    return {
      series: [33, 20, 20, 20, 7],
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
</style>
