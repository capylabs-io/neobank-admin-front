<!-- eslint-disable vue/no-deprecated-v-bind-sync -->
<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="formattedDate"
        background-color="white"
        prepend-inner-icon="mdi-calendar"
        readonly
        outlined
        hide-details
        dense
        placeholder="Pick Duration Range"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" formatting no-title scrollable range>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="dateChange"> OK </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
import moment from "moment";
export default {
  props: {
    chosenDate: {
      type: Array,
      default: null,
    },
  },
  computed: {
    formattedDate() {
      if (!this.date || this.date.length == 0) return;
      return (
        moment.utc(this.date[0]).format("DD/MM/YYYY") +
        "-" +
        moment.utc(this.date[1]).format("DD/MM/YYYY")
      );
    },
  },
  data: () => ({
    date: [],
    menu: false,
  }),
  watch: {
    chosenDate: {
      handler(currentDate) {
        if (!currentDate || currentDate.length == 0) return;
        if (currentDate.length == 1)
          this.date = [
            moment.now().toISOString().substring(0, 10),
            moment(currentDate[0]).toISOString().substring(0, 10),
          ];
        else
          this.date = [
            moment(currentDate[0]).toISOString().substring(0, 10),
            moment(currentDate[1]).toISOString().substring(0, 10),
          ];
      },
      immediate: true,
    },
  },
  methods: {
    dateChange() {
      if (
        moment
          .utc(this.date[0], "YYYY-MM-DD")
          .isAfter(moment.utc(this.date[1], "YYYY-MM-DD"))
      ) {
        let temp = this.date[0];
        this.date[0] = this.date[1];
        this.date[1] = temp;
      }
      this.$refs.menu.save(this.date);
      this.$emit("change", [
        moment.utc(this.date[0], "YYYY-MM-DD").startOf("day").toISOString(),
        moment.utc(this.date[1], "YYYY-MM-DD").endOf("day").toISOString(),
      ]);
      // this.date[0] = moment
      //   .utc(this.date[0], "YYYY-MM-DD")
      //   .format("DD/MM/YYYY");
      // this.date[1] = moment
      //   .utc(this.date[1], "YYYY-MM-DD")
      //   .format("DD/MM/YYYY");
      this.menu = false;
    },
  },
};
</script>
