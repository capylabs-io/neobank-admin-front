<template>
  <v-dialog
    v-model="categoryStore.createCategoryDialog"
    max-width="432px"
    persistent
    absolute
  >
    <v-card class="border-radius-16 pa-4">
      <div class="font-weight-bold text-lg">Create new Category</div>
      <div class="neutral70--text mt-2">
        Category will be used by partners to identify the type of service each
        campaign will provide.
      </div>
      <v-divider class="my-4"></v-divider>
      <div class="neutral70--text text-md font-weight-bold">Upload icon</div>
      <div class="upload-container mt-2">
        <picture-input
          ref="pictureInput"
          width="432"
          height="144"
          accept="image/jpeg,image/png,image/jpg"
          size="10"
          button-class="btn"
          :custom-strings="{
            upload: '<h1>Bummer!</h1>',
            drag: '',
          }"
          @change="onIconSelect($event)"
          hideChangeButton
          :crop="false"
        >
        </picture-input>
        <div class="upload-text text-center" v-if="!isIconSelected">
          <v-img
            class="mx-auto"
            width="40px"
            height="40px"
            :src="require('@/assets/components/upload-icon.png')"
          ></v-img>
          <div class="mt-1">
            <span class="font-weight-bold primary--text">Click to upload</span>
            or drag and drop
          </div>
          <div>PNG, JPG or JPEG file (recommended 24x24px)</div>
        </div>
      </div>
      <div class="mt-6">
        <div class="neutral70--text text-md font-weight-bold">
          Category name
        </div>
        <v-text-field
          v-model="categoryStore.categoryName"
          class="border-radius-6 mt-2"
          placeholder="Ex: Shopping, Gaming,..."
          :rules="[$rules.required]"
          flat
          solo
          outlined
          dense
        ></v-text-field>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between align-center mt-6">
        <v-btn
          class="text-none border-radius-8 px-2"
          color="gray"
          elevation="0"
          @click="onCancelClicked"
          dense
        >
          Cancel
        </v-btn>
        <v-btn
          class="text-none border-radius-8 px-2"
          color="primary"
          elevation="0"
          @click="onCreateClicked"
          :disabled="!categoryStore.isValidCategoryInput"
          dense
        >
          Create
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.upload-container {
  position: relative;
}
.upload-text {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
}
</style>

<script>
import PictureInput from "vue-picture-input";
import { mapStores } from "pinia";
import { categoryStore } from "../stores/categoryStore";

export default {
  components: {
    PictureInput,
  },
  computed: {
    ...mapStores(categoryStore),
  },
  data() {
    return {
      createDialog: true,
      image: null,
      isIconSelected: false,
    };
  },
  methods: {
    onIconSelect(image) {
      if (image) {
        const imageFile = this.$refs.pictureInput.file;
        this.categoryStore.changeCategoryIcon(imageFile);
        this.isIconSelected = true;
      } else {
        this.isIconSelected = false;
        console.log("FileReader API not supported!");
      }
    },
    onCancelClicked() {
      this.categoryStore.toggleCreateDialog(false);
    },
    async onCreateClicked() {
      await this.categoryStore.createNewCategory();
    },
  },
};
</script>
