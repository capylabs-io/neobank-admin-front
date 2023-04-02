<template>
  <div>
    <div>
      <v-btn class="px-0 text-none primary--text" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="d-flex justify-space-between">
      <div class="text-dp-xs font-weight-bold">Campaign Detail</div>
      <div>
        <v-btn class="text-none error--text" elevation="0" text
          >Disable Campaign</v-btn
        >
      </div>
    </div>
    <v-card class="neutral30-border border-radius-12 pa-4 mt-3" elevation="0">
      <v-row>
        <v-col cols="12" md="5">
          <v-img
            height="100px"
            class="border-radius-6"
            :src="require('@/assets/home/image1.webp')"
            :position="'center 70%'"
          ></v-img>
          <div class="mt-2">
            <div class="text-md neutral70--text font-weight-bold">
              Campaign name
            </div>
            <div
              class="info-field border-radius-6 pa-2 mt-1 d-flex align-center"
            >
              <v-img
                class="category-icon mr-2"
                :src="
                  require('@/assets/views/category/category-icon-example.png')
                "
              ></v-img>
              <div>Movie</div>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-md neutral70--text font-weight-bold">
              Market Price
            </div>
            <div
              class="info-field border-radius-6 pa-2 mt-1 d-flex align-center"
            >
              <v-img
                class="category-icon mr-2"
                :src="require('@/assets/redeem/coin.webp')"
              ></v-img>
              <div>1000</div>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-md neutral70--text font-weight-bold">
              Voucher Status
            </div>
            <div
              class="info-field border-radius-6 pa-2 mt-1 d-flex align-center"
            >
              <div>New Deal</div>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-md neutral70--text font-weight-bold">Quantity</div>
            <div
              class="info-field border-radius-6 pa-2 mt-1 d-flex align-center"
            >
              <div>1000</div>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-md neutral70--text font-weight-bold">
              Voucher Duration
            </div>
            <div
              class="info-field border-radius-6 pa-2 mt-1 d-flex align-center"
            >
              <div>1000</div>
            </div>
          </div>
        </v-col>
        <v-col class="d-flex flex-column" cols="12" md="7">
          <div>
            <div class="text-md neutral70--text font-weight-bold">
              Short Description
            </div>
            <v-textarea
              class="border-radius-6 mt-1"
              placeholder="Short Description"
              background-color="primary10"
              hide-details
              no-resize
              flat
              solo
              filled
              disabled
            ></v-textarea>
          </div>
          <div class="flex-grow-1 mt-2 d-flex flex-column">
            <div class="text-md neutral70--text font-weight-bold">
              Description
            </div>
            <v-textarea
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Description"
              background-color="primary10"
              hide-details
              no-resize
              flat
              solo
              filled
              disabled
            ></v-textarea>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <div class="d-flex align-center justify-space-between mt-6">
      <div class="text-lg font-weight-bold">Transaction History</div>
      <v-text-field
        class="search-field border-radius-6"
        placeholder="Search"
        prepend-inner-icon="mdi-magnify"
        flat
        solo
        outlined
        dense
        hide-details
      ></v-text-field>
    </div>
    <div class="border-radius-12 neutral30-border overflow-hidden mt-3">
      <v-data-table
        class="px-3 pb-3"
        :headers="headers"
        :items="categories"
        hide-default-footer
      >
        <template v-slot:[`item.id`]="{ index }">
          <div class="text-center neutral50--text">
            {{ index + 1 }}
          </div>
        </template>
        <template v-slot:[`item.icon`]="{ item }">
          <div class="category-icon">
            <v-img :src="item.icon"></v-img>
          </div>
        </template>
        <template v-slot:[`item.action`]="{}">
          <v-btn icon>
            <v-icon color="neutral40">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>

    <div class="d-flex align-center justify-space-between mt-3">
      <div class="neutral70--text text-sm font-weight-bold">
        Total transaction: 12
      </div>
      <v-pagination
        class="pa-0 mr-n2"
        :length="1"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          user: "Tung",
          createdAt: "10:10 Dec 12 2023",
          quantity: 1,
          code: "67869fdfsdj20lkbv",
        },
        {
          user: "Tung",
          createdAt: "10:10 Dec 12 2023",
          quantity: 1,
          code: "67869fdfsdj20lkbv",
        },
        {
          user: "Tung",
          createdAt: "10:10 Dec 12 2023",
          quantity: 1,
          code: "67869fdfsdj20lkbv",
        },
        {
          user: "Tung",
          createdAt: "10:10 Dec 12 2023",
          quantity: 1,
          code: "67869fdfsdj20lkbv",
        },
      ],
      headers: [
        {
          text: "No.",
          value: "id",
          align: "center",
        },
        {
          text: "User",
          value: "user",
          align: "center",
        },
        {
          text: "Quantity",
          value: "quantity",
          align: "center",
        },
        {
          text: "Date Created",
          value: "createdAt",
          align: "center",
        },
        {
          text: "Code",
          value: "code",
          align: "center",
        },
      ],
    };
  },
};
</script>

<style scoped>
.info-field {
  background: var(--v-primary10-base) !important;
}
.search-field {
  max-width: 240px;
}
</style>
