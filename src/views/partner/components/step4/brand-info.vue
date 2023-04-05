<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="text-md font-weight-bold"
      >Brand info</v-expansion-panel-header
    >
    <v-expansion-panel-content>
      <div class="pa-1">
        <div class="text-sm neutral70--text font-weight-bold">
          Brand Name<span class="error--text ml-1">*</span>
        </div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.partner.brandName"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-sm neutral70--text font-weight-bold mt-2" partner>
          Brand Avatar<span class="error--text ml-1">*</span>
        </div>
        <div class="neutral10-bg border-radius-8 mt-1">
          <picture-input
            ref="pictureInput"
            width="64"
            height="64"
            accept="image/jpeg,image/png,image/jpg"
            size="10"
            button-class="btn"
            :custom-strings="{
              upload: 'This device does not support uploading images!',
              drag: '',
            }"
            :prefill="prefillImage"
            hideChangeButton
            :crop="false"
          >
          </picture-input>
        </div>
        <div class="text-sm neutral70--text font-weight-bold mt-2" partner>
          Gmail<span class="error--text ml-1">*</span>
        </div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          background-color="neutral10"
          v-model="partnerStore.partner.email"
          solo
          readonly
          dense
          hide-details
          flat
        />
        <div class="text-sm neutral70--text font-weight-bold mt-2" partner>
          Link
        </div>
        <v-text-field
          height="36px"
          type="text"
          class="border-radius-8 mt-1"
          v-model="partnerStore.partner.siteUrl"
          background-color="neutral10"
          solo
          readonly
          dense
          hide-details
          flat
        />
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapStores } from "pinia";
import { partnerStore } from "../../stores/partnerStore";
import PictureInput from "vue-picture-input";
export default {
  computed: {
    ...mapStores(partnerStore),
    prefillImage() {
      if (this.partnerStore.inputAvatar) {
        return this.partnerStore.inputAvatar;
      }
      return require("@/assets/components/upload-icon.png");
    },
  },
  components: {
    PictureInput,
  },
  methods: {},
};
</script>

<style lang="scss">
.input-field {
}
.v-expansion-panel-header {
  padding: 0 !important;
}
.v-expansion-panel-content__wrap {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #e3e8ef;
}
</style>
