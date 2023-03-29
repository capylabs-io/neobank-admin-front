<template>
  <div class="d-flex flex-column align-center">
    <div class="right-container pa-6 full-height">
      <v-btn
        text
        class="text-left active d-flex align-center"
        @click="userStore.adminDetail = false"
      >
        <v-icon small>mdi-chevron-double-left</v-icon>
        <span class="ml-2 text-capitalize">Get Back</span>
      </v-btn>
      <div class="d-flex mt-2 justify-space-between">
        <div class="d-flex">
          <v-btn class="text-capitalize" elevation="1"> Export CVS </v-btn>
          <v-btn class="ml-3 search" elevation="1"
            ><v-icon>mdi-magnify</v-icon></v-btn
          >
        </div>
        <div class="d-flex align-center" :style="{ width: '320px' }">
          <div
            class="d-flex flex-column text-left mr-3"
            :style="{ width: '158px' }"
          >
            <span class="">Coupons Remaining:</span>
            <span class="subtitle-2">(Update 2 min ago)</span>
          </div>
          <v-progress-linear
            height="25"
            rounded
            color="#E87331"
            value="85"
            :style="{ width: '150px' }"
          >
            <strong class="white--text">40/50</strong>
          </v-progress-linear>
        </div>
      </div>
      <div class="full-width mt-4">
        <informationform></informationform>
      </div>
      <div class="full-width mt-4">
        <v-card class="pa-3">
          <v-card-title>
            <v-text-field
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="users" :search="search">
            <template v-slot:[`item.status`]="{ item }">
              <v-chip v-if="item.status == 'Code used'">
                {{ item.status }}
              </v-chip>
              <v-chip
                v-else-if="item.status == 'Purchased'"
                color="lightblue"
                text-color="white"
              >
                {{ item.status }}
              </v-chip>
              <v-chip v-else color="green" text-color="white">
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:[`item.select`]="{ item }">
              <v-simple-checkbox v-model="item.glutenfree"></v-simple-checkbox>
            </template>
          </v-data-table>
        </v-card>
      </div>
      <div class="pagination">
        <v-pagination :length="3" light color="#5752e3" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import informationform from "@/views/redeem/components/information-form.vue";
export default {
  components: {
    informationform: informationform,
  },

  data() {
    return {
      search: "",
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
          text: "User",
          value: "name",
          align: "center",
        },
        {
          text: "Status",
          value: "status",
          filterable: false,
          sortable: false,
          align: "center",
        },
        {
          text: "Code",
          value: "code",
          filterable: false,
          sortable: false,
          align: "center",
        },
        { text: "Date", value: "date", align: "center" },
        {
          text: "Select Box",
          value: "select",
          filterable: false,
          sortable: false,
          align: "center",
        },
      ],
      users: [
        {
          id: "1",
          name: "Thomas Shelly",
          status: "Code used",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
          select: false,
        },
        {
          id: "2",
          name: "Thomas Shelly",
          status: "Code used",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
          select: false,
        },
        {
          id: "3",
          name: "Thomas Shelly",
          status: "Purchased",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
          select: false,
        },
        {
          id: "4",
          name: "Thomas Shelly",
          status: "Purchased",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
          select: false,
        },
        {
          id: "5",
          name: "Thomas Shelly",
          status: "Redeemed",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
          select: false,
        },
        {
          id: "6",
          name: "Thomas Shelly",
          status: "Redeemed",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
          select: false,
        },
      ],
    };
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.right-container {
  width: 1500px;
  animation: fadeleft 1s ease-in-out;
}
.pagination {
  z-index: 97;
}
.active {
  color: #2970ff;
  .v-icon {
    color: #2970ff;
  }
}
.v-data-table::v-deep th {
  font-size: 15px !important;
}
.v-data-table::v-deep td {
  font-size: 15px !important;
}
.form-detail {
  background-color: white;
  height: 280px;
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
