<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <!-- <div class="d-flex flex-column align-center"> -->
  <!-- <div class="right-container d-flex flex-column pa-6 full-height"> -->

  <div>
    <CreatePartnerDialog />
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center gap-8">
        <v-btn
          class="text-none text-btn border-radius-6 px-3"
          color="primary"
          @click="partnerStore.createPartnerDialog = true"
          depressed
        >
          <v-icon small>mdi-plus</v-icon>
          <span class="ml-1 text-capitalize">New Partner</span>
        </v-btn>
        <v-btn
          class="white-bg neutral30-border text-none font-weight-bold px-3 border-radius-8"
          depressed
          >Export CSV</v-btn
        >
      </div>
      <div class="">
        <v-text-field
          v-model="partnerStore.searchKey"
          class="border-radius-6"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          clearable
          flat
          solo
          outlined
          dense
          hide-details
        ></v-text-field>
      </div>
    </div>

    <div class="border-radius-12 neutral30-border overflow-hidden mt-4">
      <v-data-table
        class="px-3 pb-3"
        :headers="headers"
        :items="partnerStore.slicedPartners"
        @click:row="onRowClicked($event)"
        hide-default-footer
      >
        <template v-slot:[`item.id`]="{ item }">
          <div class="text-center neutral50--text">
            {{ item.id }}
          </div>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>
            {{ item.createdAt | ddmmyyyyhhmmss }}
          </div>
        </template>
        <template v-slot:[`item.campaign`]="{ item }">
          <div>
            {{ item.campaigns.count || 0 }}
          </div>
        </template>
        <template v-slot:[`item.thumbnail`]="{ item }">
          <div class="partner-avatar">
            <v-img
              height="36"
              width="36"
              :src="item.avatarUrl || require('@/assets/metaAva.webp')"
              contain
            ></v-img>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span class="success--text" v-if="item.isActive">Active </span>
          <span class="error--text" v-else>Disable </span>
        </template>
      </v-data-table>
    </div>

    <div class="d-flex align-center justify-space-between mt-4">
      <div class="neutral70--text text-sm font-weight-bold">
        Total Partner: {{ partnerStore.partners.length }}
      </div>
      <v-pagination
        v-model="partnerStore.partnerPage"
        :length="partnerStore.totalPartnerPage"
        class="pa-0 mr-n2"
        total-visible="7"
        color="primary"
      ></v-pagination>
    </div>
  </div>

  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";

export default {
  components: {
    CreatePartnerDialog: () => import("../dialogs/partner-create-form.vue"),
  },

  data() {
    return {
      headers: [
        {
          text: "No.",
          align: "start",
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: "",
          value: "thumbnail",
          align: "start",
          sortable: false,
        },
        {
          text: "Partner",
          value: "brandName",
          align: "start",
        },
        {
          text: "Contact info",
          value: "email",
          align: "start",
          sortable: false,
        },
        {
          text: "Total Campaign",
          value: "campaign",
          align: "center",
        },
        { text: "Join Date", value: "createdAt", align: "start" },
        {
          text: "Status",
          value: "status",
          align: "end",
        },
      ],
    };
  },
  computed: {
    ...mapStores(partnerStore),
  },
  methods: {
    onRowClicked(partner) {
      this.$router.push("/partner/" + partner.id);
    },
  },
  async created() {
    await this.partnerStore.fetchPartners();
  },
};
</script>

<style scoped>
.partner-avatar {
  width: 36px !important;
  height: 36px !important;
}
</style>
