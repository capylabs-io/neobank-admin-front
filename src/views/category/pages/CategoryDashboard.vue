<template>
  <div>
    <CreateCategoryDialog />
    <div class="d-flex align-center">
      <div class="text-dp-xs font-weight-bold">Category Management</div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <v-text-field
          class="border-radius-6"
          placeholder="Search By Name"
          prepend-inner-icon="mdi-magnify"
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
        :items="categories"
        hide-default-footer
        @click:row="handleClick()"
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

    <div class="d-flex align-center justify-space-between mt-4">
      <div class="neutral70--text text-sm font-weight-bold">
        Total category: 12
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
import { mapStores } from "pinia";
import { categoryStore } from "../stores/categoryStore";

export default {
  components: {
    CreateCategoryDialog: () => import("../dialogs/create-category-dialog.vue"),
  },
  computed: {
    ...mapStores(categoryStore),
  },
  data() {
    return {
      categories: [
        {
          name: "Cinema",
          createdAt: "10:10 Dec 12 2023",
          icon: require("@/assets/views/category/category-icon-example.png"),
        },
        {
          name: "Cinema",
          createdAt: "10:10 Dec 12 2023",
          icon: require("@/assets/views/category/category-icon-example.png"),
        },
        {
          name: "Cinema",
          createdAt: "10:10 Dec 12 2023",
          icon: require("@/assets/views/category/category-icon-example.png"),
        },
        {
          name: "Cinema",
          createdAt: "10:10 Dec 12 2023",
          icon: require("@/assets/views/category/category-icon-example.png"),
        },
      ],
      headers: [
        {
          text: "No.",
          value: "id",
          align: "center",
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
    handleClick(categoryId) {
      this.$router.push(`/category/${categoryId || 0}`);
    },
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
