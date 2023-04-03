<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <CreateCategoryDialog />
    <div class="d-flex align-center">
      <div class="text-dp-xs font-weight-bold">Category Management</div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-text-field
          v-model="categoryStore.searchKey"
          class="border-radius-6"
          placeholder="Search By Name"
          prepend-inner-icon="mdi-magnify"
          clearable
          flat
          solo
          outlined
          dense
          hide-details
        ></v-text-field>
        <v-btn
          class="text-none border-radius-6 ml-4"
          color="primary"
          elevation="0"
          @click="onCreateClicked"
          dense
        >
          <v-icon class="mr-1" small>mdi-plus</v-icon>
          Create
        </v-btn>
      </div>
    </div>

    <div class="border-radius-12 neutral30-border overflow-hidden mt-4">
      <v-data-table
        class="px-3 pb-3"
        :headers="headers"
        :items="categoryStore.slicedCategories"
        hide-default-footer
      >
        <template v-slot:[`item.id`]="{ item }">
          <div class="text-center neutral50--text">
            {{ item.id }}
          </div>
        </template>
        <template v-slot:[`item.icon`]="{ item }">
          <div class="category-icon">
            <v-img :src="item.icon"></v-img>
          </div>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <div>
            {{ item.createdAt | ddmmyyyyhhmmss }}
          </div>
        </template>
        <template v-slot:[`item.action`]="{}">
          <v-btn icon>
            <v-icon color="neutral40">mdi-trash-can-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>

    <div class="d-flex align-center justify-space-between mt-4">
      <div class="neutral70--text text-sm font-weight-bold">
        Total category: {{ categoryStore.categories.length }}
      </div>
      <v-pagination
        class="pa-0 mr-n2"
        v-model="categoryStore.categoryPage"
        :length="categoryStore.totalCategoryPage"
        total-visible="7"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { categoryStore } from "../stores/categoryStore";

export default {
  components: {
    CreateCategoryDialog: () => import("../dialogs/create-category-dialog.vue"),
  },
  computed: {
    ...mapStores(categoryStore),
  },
  async created() {
    await this.categoryStore.fetchCategories();
  },
  data() {
    return {
      headers: [
        {
          text: "No.",
          value: "id",
          align: "center",
          sortable: false,
        },
        {
          text: "Category",
          value: "name",
          align: "left",
        },
        {
          text: "Icon",
          value: "icon",
          align: "left",
          sortable: false,
        },
        {
          text: "Date Created",
          value: "createdAt",
          align: "center",
        },
        {
          text: "",
          value: "action",
          align: "end",
        },
      ],
    };
  },
  methods: {
    onCreateClicked() {
      this.categoryStore.toggleCreateDialog(true);
    },
  },
};
</script>

<style scoped>
.category-icon {
  width: 24px;
  height: 24px;
}
</style>
