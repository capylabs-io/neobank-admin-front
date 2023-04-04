<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <div class="d-flex mt-2 justify-space-between">
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center gap-8">
          <v-btn
            class="white-bg neutral30-border text-none font-weight-bold px-3 border-radius-8"
            depressed
            >Export CSV</v-btn
          >
        </div>
      </div>

      <div>
        <v-text-field
          v-model="userManagerStore.searchKey"
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
        :items="userManagerStore.slicedUsers"
        @click:row="onRowClicked($event)"
        hide-default-footer
      >
        <template v-slot:[`item.id`]="{ item }">
          <div class="neutral50--text">
            {{ item.id }}
          </div>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>
            {{ item.createdAt | ddmmyyyyhhmmss }}
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <span
            class="success--text"
            v-if="!item.status || item.status != 'disabled'"
            >Active
          </span>
          <span class="error--text" v-else>Disable </span>
        </template>
        <template v-slot:[`item.voucher`]="{ item }">
          <div>
            {{ item.vouchers.count }}
          </div>
        </template>
        <template v-slot:[`item.token`]="{ item }">
          <div>
            {{ item.userMetadata.token }}
          </div>
        </template>
      </v-data-table>
    </div>

    <div class="d-flex align-center justify-space-between mt-4">
      <div class="neutral70--text text-sm font-weight-bold">
        Total Partner: {{ userManagerStore.users.length }}
      </div>
      <v-pagination
        v-model="userManagerStore.userPage"
        :length="userManagerStore.totalUserPage"
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
import { userManagerStore } from "../stores/userManagerStore";

export default {
  components: {},

  data() {
    return {
      search: "",
      headers: [
        {
          text: "No.",
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: "User",
          value: "username",
          align: "start",
        },
        {
          text: "Contact info",
          value: "email",
          align: "start",
          sortable: false,
        },
        {
          text: "Claimed voucher",
          value: "voucher",
          align: "center",
        },
        {
          text: "Token owned",
          value: "token",
          align: "center",
        },
        {
          text: "Join Date",
          value: "createdAt",
          align: "start",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          align: "end",
        },
      ],
    };
  },
  computed: {
    ...mapStores(userManagerStore),
  },
  methods: {
    onRowClicked(user) {
      this.$router.push("/user-detail/" + user.id);
    },
  },
  async created() {
    await this.userManagerStore.fetchUsers();
  },
};
</script>
