<template>
  <v-dialog
    v-model="dashBoardStore.changeBannerDialog"
    max-width="460px"
    persistent
    absolute
  >
    <v-card class="pa-4">
      <v-form v-model="changeBanner">
        <div class="text-sm neutral70--text font-weight-bold mt-2">
          Banner Image<span class="error--text ml-1">*</span>
        </div>
        <div class="upload-container mt-2">
          <picture-input
            ref="pictureInput"
            width="520"
            height="144"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            size="10"
            button-class="btn"
            :custom-strings="{
              upload: 'This device does not support uploading images!',
              drag: '',
            }"
            :prefill="prefillImage"
            @change="onIconSelect($event)"
            hideChangeButton
            :crop="false"
          >
          </picture-input>
          <div class="upload-text text-center" v-if="!dashBoardStore.banner">
            <v-img
              class="mx-auto"
              width="40px"
              height="40px"
              :src="require('@/assets/components/upload-icon.png')"
            ></v-img>
            <div class="mt-1">
              <span class="font-weight-bold primary--text"
                >Click to upload</span
              >
              or drag and drop
            </div>
            <div>PNG, JPG, WEBP or JPEG file (suggest 24x24px)</div>
          </div>
        </div>
        <v-divider class="my-4"></v-divider>
        <div class="d-flex align-center justify-space-between">
          <v-btn
            class="text-none text-btn border-radius-8 px-2"
            color="gray"
            elevation="0"
            @click="onCancelClicked"
            dense
          >
            Cancel
          </v-btn>
          <v-btn
            class="text-none text-btn border-radius-8 px-2"
            color="primary"
            elevation="0"
            @click="onChangeClicked"
            :disabled="!changeBanner"
            dense
          >
            Change
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapStores } from "pinia";
import { dashBoardStore } from "../stores/dashBoardStore";
import PictureInput from "vue-picture-input";
export default {
  data() {
    return {
      changeBanner: false,
    };
  },
  computed: {
    ...mapStores(dashBoardStore),
    prefillImage() {
      if (this.dashBoardStore.banner) {
        return this.dashBoardStore.banner;
      }
      return null;
    },
  },
  components: {
    PictureInput,
  },
  methods: {
    onIconSelect(image) {
      if (image) {
        const imageFile = this.$refs.pictureInput.file;
        this.dashBoardStore.changePartnerAvatar(imageFile);
      } else {
        console.log("FileReader API not supported!");
      }
    },
    onCancelClicked() {
      this.dashBoardStore.changeBannerDialog = false;
    },
    onChangeClicked() {
      this.dashBoardStore.updateBanner();
    },
  },
};
</script>
