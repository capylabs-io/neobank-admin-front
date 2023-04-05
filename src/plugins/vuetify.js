import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    light: true,
    themes: {
      light: {
        secondary: "#f5f8ff",

        //Neutral
        neutral10: "#F8FAFC",
        neutral20: "#EEF2F6",
        neutral30: "#E3E8EF",
        neutral40: "#CDD5DF",
        neutral50: "#9AA4B2",
        neutral70: "#4B5565",
        neutral100: "#121926",

        //Primary
        primary: "#2970FF",
        primary5: "#F5F8FF",
        primary10: "#EFF4FF",
        primary20: "#D1E0FF",
        primary30: "#B2CCFF",
        primary40: "#84ADFF",
        primary50: "#528BFF",
        primary60: "#2970FF",
        primary70: "#155EEF",
        primary80: "#004EEB",

        //Green
        green10: "#F0FDF3",
        green20: "#DAF7E1",
        green40: "#8FDFA8",
        green60: "#53B06C",

        //Red
        red20: "#FAE5E3",
        red60: "#DE5242",
        red70: "#C83E2E",
        red80: "#A53224",

        //Yellow
        yellow40: "#F9E283",
      },
    },
  },
});
