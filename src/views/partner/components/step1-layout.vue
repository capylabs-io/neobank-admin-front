<template>
  <v-form v-model="step1Form">
    <div class="text-sm neutral70--text font-weight-bold">
      Brand Name<span class="error--text ml-1">*</span>
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="input-field border-radius-8 mt-1"
      v-model="partnerStore.partner.brandName"
      :rules="[$rules.required]"
      outlined
      dense
      flat
    />
    <div class="text-sm neutral70--text font-weight-bold mt-2">
      Brand Avatar<span class="error--text ml-1">*</span>
    </div>
    <div class="upload-container mt-2">
      <picture-input
        ref="pictureInput"
        width="520"
        height="144"
        accept="image/jpeg,image/png,image/jpg"
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
      <div class="upload-text text-center" v-if="!partnerStore.inputAvatar">
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
    <div class="text-sm neutral70--text font-weight-bold mt-2">
      Email<span class="error--text ml-1">*</span>
    </div>
    <v-text-field
      height="36px"
      type="text"
      class="input-field border-radius-8 mt-1"
      v-model="partnerStore.partner.email"
      :rules="[$rules.required]"
      outlined
      dense
      flat
    />
    <div class="text-sm neutral70--text font-weight-bold mt-2">Link</div>
    <v-text-field
      height="36px"
      type="text"
      class="input-field border-radius-8 mt-1"
      v-model="partnerStore.partner.siteUrl"
      outlined
      dense
      flat
    />
    <v-divider class="mt-2 mb-4"></v-divider>
    <div class="d-flex flex-left">
      <v-btn
        class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
        @click="onCancelClicked"
        depressed
        >Cancel</v-btn
      >

      <v-btn
        class="ml-4 text-none border-radius-8 px-2"
        color="primary"
        @click="partnerStore.createPartnerStep = 2"
        :disabled="!step1Form || !partnerStore.inputAvatar"
      >
        Next Step
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";
import PictureInput from "vue-picture-input";

export default {
  data() {
    return {
      step1Form: false,
      isAvatarSelected: false,
    };
  },
  components: {
    PictureInput,
  },
  computed: {
    ...mapStores(partnerStore),
    prefillImage() {
      if (this.partnerStore.inputAvatar) {
        return this.partnerStore.inputAvatar;
      }
      return null;
    },
  },
  methods: {
    onIconSelect(image) {
      if (image) {
        const imageFile = this.$refs.pictureInput.file;
        this.partnerStore.changePartnerAvatar(imageFile);
      } else {
        console.log("FileReader API not supported!");
      }
    },
    onCancelClicked() {
      this.partnerStore.createPartnerDialog = false;
      this.partnerStore.step = 1;
    },
  },
};
</script>
