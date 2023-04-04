<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <v-card class="neutral30-border border-radius-12 pa-4 mt-3" elevation="0">
      <v-form v-model="campaignStore.campaignForm">
        <v-row>
          <v-col cols="12" md="5">
            <div>
              <div class="text-sm neutral70--text font-weight-bold">
                Campaign Thumbnail
              </div>
              <div class="neutral10-bg mt-1" v-if="!campaignStore.isEditing">
                <v-img
                  class="campaign-thumbnail border-radius-8"
                  :src="campaignThumbnail"
                  contain
                ></v-img>
              </div>
              <div class="upload-container mt-2" v-else>
                <picture-input
                  ref="pictureInput"
                  width="432"
                  height="160"
                  accept="image/jpeg,image/png,image/jpg"
                  size="10"
                  button-class="btn"
                  :z-index="0"
                  :prefill="campaignThumbnail"
                  :custom-strings="{
                    upload: 'This device does not support uploading image!',
                    drag: '',
                  }"
                  @change="onThumbnailChange($event)"
                  hideChangeButton
                  disabled
                  :crop="false"
                >
                </picture-input>
                <div
                  class="upload-text text-center d-flex align-center justify-center"
                  v-if="
                    !campaignStore.campaignInputAvatar &&
                    !campaignStore.campaign.thumbnailUrl
                  "
                >
                  <img :src="require('@/assets/components/upload-icon.png')" />
                  <div class="text-sm ml-4">
                    <div class="mt-1 text-start">
                      <span class="font-weight-bold primary--text"
                        >Click to upload</span
                      >
                      or drag and drop
                    </div>
                    <div>PNG, JPG or JPEG file (recommended 24x24px)</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-sm neutral70--text font-weight-bold">
                Campaign name
              </div>
              <v-text-field
                :background-color="!campaignStore.isEditing ? 'neutral10' : ''"
                :outlined="campaignStore.isEditing"
                :disabled="!campaignStore.isEditing"
                v-model="campaignStore.campaign.title"
                class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
                placeholder="Description"
                flat
                solo
                filled
                dense
              >
              </v-text-field>
            </div>
            <div>
              <div class="text-sm neutral70--text font-weight-bold">
                Category
              </div>
              <v-select
                v-model="campaignStore.campaign.campaignCategory"
                :items="campaignStore.categories"
                :background-color="!campaignStore.isEditing ? 'neutral10' : ''"
                :outlined="campaignStore.isEditing"
                :disabled="!campaignStore.isEditing"
                item-text="name"
                item-value="id"
                class="border-radius-6 mt-1"
                placeholder="Filter by Category"
                return-object
                flat
                solo
                dense
              >
                <template v-slot:item="{ item }">
                  <div class="d-flex align-center">
                    <v-img class="category-icon mr-2" :src="item.icon" />
                    <div>{{ item.name }}</div>
                  </div>
                </template>
                <template v-slot:selection="{ item }">
                  <div class="d-flex align-center">
                    <v-img class="category-icon mr-2" :src="item.icon" />
                    <div>{{ item.name }}</div>
                  </div>
                </template>
              </v-select>
            </div>
            <div>
              <div class="text-sm neutral70--text font-weight-bold">
                Market Price
              </div>
              <v-text-field
                :background-color="!campaignStore.isEditing ? 'neutral10' : ''"
                :outlined="campaignStore.isEditing"
                :disabled="!campaignStore.isEditing"
                v-model="campaignStore.campaign.price"
                class="border-radius-6 mt-1"
                placeholder="Description"
                flat
                solo
                filled
                dense
              >
                <template v-slot:prepend-inner>
                  <v-img
                    class="category-icon mr-1"
                    :src="require('@/assets/redeem/coin.webp')"
                  ></v-img>
                </template>
              </v-text-field>
            </div>
            <div>
              <div class="text-sm neutral70--text font-weight-bold">
                Quantity
              </div>
              <v-text-field
                :background-color="!campaignStore.isEditing ? 'neutral10' : ''"
                :outlined="campaignStore.isEditing"
                :disabled="!campaignStore.isEditing"
                v-model="campaignStore.campaign.totalQuantity"
                class="border-radius-6 mt-1"
                placeholder="Quantity"
                flat
                solo
                filled
                dense
              ></v-text-field>
            </div>
            <div class="mt-2">
              <div class="text-sm neutral70--text font-weight-bold">
                Voucher Duration
              </div>
              <div v-if="campaignStore.isEditing">
                <RangeDatePicker
                  :chosenDate="[
                    campaignStore.campaign.startDate,
                    campaignStore.campaign.endDate,
                  ]"
                  @change="campaignStore.changeVoucherDuration"
                />
              </div>
              <div
                class="info-field border-radius-6 pa-2 mt-1 d-flex align-center neutral10-bg"
                v-else
              >
                <div>
                  {{
                    campaignStore.campaign.startDate || $moment.now() | ddmmyyyy
                  }}
                  -
                  {{
                    campaignStore.campaign.endDate || $moment.now() | ddmmyyyy
                  }}
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="text-sm neutral70--text font-weight-bold">
                Voucher Status
              </div>
              <v-select
                v-model="campaignStore.campaign.status"
                :items="campaignStore.statusSelection"
                background-color="neutral10"
                item-text="title"
                item-value="value"
                class="border-radius-6 mt-1"
                placeholder="Status"
                disabled
                flat
                solo
                dense
              ></v-select>
            </div>
          </v-col>
          <v-col class="d-flex flex-column" cols="12" md="7">
            <div>
              <div class="text-sm neutral70--text font-weight-bold">
                Short Description
              </div>
              <v-textarea
                :background-color="!campaignStore.isEditing ? 'neutral10' : ''"
                :outlined="campaignStore.isEditing"
                :disabled="!campaignStore.isEditing"
                v-model="campaignStore.campaign.shortDescription"
                class="border-radius-6 mt-1"
                placeholder="Short Description"
                hide-details
                no-resize
                flat
                solo
                filled
              ></v-textarea>
            </div>
            <div class="flex-grow-1 mt-2 d-flex flex-column">
              <div class="text-sm neutral70--text font-weight-bold">
                Description
              </div>
              <v-textarea
                :background-color="!campaignStore.isEditing ? 'neutral10' : ''"
                :outlined="campaignStore.isEditing"
                :disabled="!campaignStore.isEditing"
                v-model="campaignStore.campaign.fullDescription"
                class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
                placeholder="Description"
                hide-details
                no-resize
                flat
                solo
                filled
              ></v-textarea>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { campaignStore } from "../stores/campaignStore";
import { get } from "lodash";
import PictureInput from "vue-picture-input";

export default {
  components: {
    PictureInput,
    RangeDatePicker: () => import("@/components/RangeDatePicker.vue"),
  },
  methods: {
    onThumbnailChange(image) {
      if (image) {
        const imageFile = this.$refs.pictureInput.file;
        this.campaignStore.changeCampaignThumbnail(imageFile);
      } else {
        console.log("FileReader API not supported!");
      }
    },
  },
  computed: {
    ...mapStores(campaignStore),
    campaignThumbnail() {
      const image = get(
        this.campaignStore,
        "campaign.thumbnailUrl",
        require("@/assets/home/intro-background.webp")
      );
      return image ?? require("@/assets/home/intro-background.webp");
    },
    categoryIcon() {
      return get(
        this.campaignStore,
        "campaign.campaignCategory.iconUrl",
        require("@/assets/views/category/category-icon-example.png")
      );
    },
    categoryName() {
      return get(
        this.campaignStore,
        "campaign.campaignCategory.name",
        "Category Name"
      );
    },
  },
};
</script>

<style scoped>
.campaign-thumbnail {
  height: 160px;
}
</style>