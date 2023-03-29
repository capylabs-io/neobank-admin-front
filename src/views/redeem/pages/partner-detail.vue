<template>
  <div class="right-container d-flex flex-column pa-6 full-height">
    <div>
      <v-btn
        text
        class="text-left active d-flex align-center"
        @click="voucherStore.partnerDetail = false"
      >
        <v-icon small>mdi-chevron-double-left</v-icon>
        <span class="ml-2 text-capitalize">Get Back</span>
      </v-btn>
    </div>
    <div class="d-flex align-center mt-2">
      <div class="user-image">
        <v-img
          :style="{ 'border-radius': '10px' }"
          class
          :src="require(`@/assets/metaAva.webp`)"
        />
      </div>
      <span
        class="ml-2"
        :style="{
          fontSize: '24px',
          fontWeight: 700,
          lineHeight: '36px',
          letterSpacing: '0em',
        }"
        >Meta Inc.</span
      >
    </div>
    <div class="d-flex justify-space-between mt-2">
      <div class="d-flex align-center">
        <span :style="{ fontSize: '18px', fontWeight: 700 }"
          >Brand Information</span
        >
      </div>

      <div class="d-flex align-center">
        <v-btn
          text
          class="text-left d-flex align-center"
          @click="voucherStore.cfDialog = true"
        >
          <span
            class="text-capitalize"
            :style="{ fontSize: '15px', fontWeight: '500', color: '#C83E2E' }"
            >Disable account</span
          >
        </v-btn>
      </div>
      <!-- <v-btn class="" @click="signout()" text>
          <div class="mr-2">
            <v-icon color="red"> mdi-logout </v-icon>
          </div>
          <div class="text-capitalize" :style="{ color: 'red' }">Log-out</div>
        </v-btn> -->
    </div>
    <div class="full-width mt-2">
      <informationform :layout="2"></informationform>
    </div>
    <div class="d-flex mt-2 justify-space-between">
      <div class="d-flex align-center">
        <span :style="{ fontSize: '18px', fontWeight: 700 }"
          >Representative Information</span
        >
      </div>
    </div>
    <div class="full-width mt-2">
      <informationform :layout="3"></informationform>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";
import { voucherStore } from "@/stores/voucherStore";
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
          value: "id",
          align: "center",
          justify: "center",
        },
        {
          text: "Campaign name",
          value: "name",
          align: "center",
          justify: "center",
        },
        {
          text: "Price",
          value: "price",
          align: "center",
          justify: "center",
        },
        {
          text: "Category",
          value: "category",
          align: "center",
          justify: "center",
        },
        {
          text: "Code",
          value: "code",
          align: "center",
          justify: "center",
        },
        { text: "Date", value: "date", align: "center", justify: "center" },
      ],
      users: [
        {
          id: "1",
          name: "Raise awareness of LangGomBatTrang",
          price: "1000",
          category: "food",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
        },
        {
          id: "2",
          name: "Heil Titler",
          price: "500",
          category: "movie",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
        },
        {
          id: "3",
          name: "Raise awareness of LangGomBatTrang",
          price: "1000",
          category: "food",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
        },
        {
          id: "4",
          name: "Heil Titler",
          price: "500",
          category: "movie",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
        },
        {
          id: "5",
          name: "Raise awareness of LangGomBatTrang",
          price: "1000",
          category: "food",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
        },
        {
          id: "6",
          name: "Heil Titler",
          price: "500",
          category: "service",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
        },
        {
          id: "7",
          name: "Raise awareness of LangGomBatTrang",
          price: "1000",
          category: "service",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
        },
        {
          id: "8",
          name: "Heil Titler",
          price: "500",
          category: "service",
          code: "67869fdfsdj20lkbv",
          date: "10:10 Dec 12 2023",
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
      this.voucherStore.drawerDetail = true;
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
  width: 400px;
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
.active {
  color: #2970ff;
  .v-icon {
    color: #2970ff;
  }
}
.v-card {
  border-radius: 12px;
}
.user-image {
  width: 36px;
  height: 42px;
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
