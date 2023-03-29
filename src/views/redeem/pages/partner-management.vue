<template>
  <!-- <div class="d-flex flex-column align-center"> -->
  <div class="right-container d-flex flex-column pa-6 full-height">
    <div class="d-flex mt-2 align-center justify-space-between">
      <div class="d-flex align-center">
        <v-btn
          text
          :style="{ backgroundColor: 'var(--v-blue-base)' }"
          class="text-left d-flex align-center white--text"
          @click="voucherStore.partnerDialog = true"
        >
          <v-icon small>mdi-plus</v-icon>
          <span class="ml-2 text-capitalize">New Partner</span>
        </v-btn>
        <v-btn class="btn-customize text-capitalize ml-3" elevation="0" text>
          Export CVS
        </v-btn>
        <v-select
          class="ml-3 btn-customize"
          v-model="filterData"
          :items="data"
          :menu-props="{ maxHeight: '400' }"
          label="Filter by Partner"
          solo
          dense
          multiple
          flat
          hide-details
          persistent-hint
        ></v-select>
      </div>
      <div class="">
        <v-card
          rounded="7"
          class="btn-customize ml-3 search d-flex align-center px-2 py-1"
          elevation="0"
          text
        >
          <v-icon>mdi-magnify</v-icon>
          <input class="ml-2" placeholder="Search for Campaign" />
        </v-card>
      </div>
    </div>

    <div class="full-width mt-4">
      <v-card class="pa-3" outlined>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          hide-default-footer
          @click:row="handleClick"
        >
          <template v-slot:[`item.status`]="{ item }">
            <span v-if="item.status" :style="{ color: 'var(--v-success-base)' }"
              >Active
            </span>
            <span v-else :style="{ color: 'var(--v-error-base)' }"
              >Disable
            </span>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div class="d-flex justify-space-between align-center">
      <div><span>Total current users: 12</span></div>
      <div class="pagination">
        <v-pagination :length="3" light color="#5752e3" />
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
export default {
  components: {},

  data() {
    return {
      filterData: [],
      data: [""],
      search: "",
      headers: [
        {
          text: "No.",
          align: "start",
          value: "id",
          align: "center",
        },
        {
          text: "Partner",
          value: "name",
          align: "center",
        },
        {
          text: "User ID",
          value: "user",
          align: "center",
        },
        {
          text: "Contact info",
          value: "contact",
          align: "center",
        },
        {
          text: "Program running",
          value: "token",
          align: "center",
        },
        { text: "Date", value: "date", align: "center" },
        {
          text: "Status",
          value: "status",
          align: "center",
        },
      ],
      users: [
        {
          id: "1",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
        {
          id: "2",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: false,
        },
        {
          id: "3",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
        {
          id: "4",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: false,
        },
        {
          id: "5",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
        {
          id: "6",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
        {
          id: "7",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
        {
          id: "8",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
        {
          id: "9",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
        {
          id: "10",
          name: "Thomas Shelly",
          contact: "khoidan@gmail.com",
          user: "FB.Admin",
          token: 20,
          date: "10:10 Dec 12 2023",
          status: true,
        },
      ],
    };
  },
  computed: {
    ...mapStores(userStore),
    ...mapStores(voucherStore),
  },
  methods: {
    handleClick(value) {
      this.voucherStore.partnerDetail = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.right-container {
  width: 1500px;
  animation: fadeleft 1s ease-in-out;
}
nav {
  padding: 30px 0 !important;
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

textarea:focus,
select:focus,
input:focus {
  outline: none;
}
.search {
  width: 300px;
}
.btn-select {
  background: white;
  border-radius: 8px;
  border: 1px solid #e3e8ef;
  width: 120px;
}
.btn-customize {
  background: white;
  border-radius: 8px;
  border: 1px solid #e3e8ef;
}
.v-card {
  border-radius: 12px;
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
.sort-box {
  max-width: 170px;
}
</style>
