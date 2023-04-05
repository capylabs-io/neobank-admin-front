<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <ChangePasswordDialog />
    <div>
      <v-btn class="px-0 text-none primary--text" @click="routerGoBack" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="text-dp-xs font-weight-bold">Account Management</div>
    <div class="d-flex align-center justify-space-between mt-4">
      <div class="text-lg font-weight-bold">Brand Information</div>
      <div class="d-flex align-center gap-8">
        <v-btn
          color="red"
          class="text-none font-weight-bold px-0"
          @click="onDisableClicked"
          v-if="userStore.isMaintainer"
          text
          >Disable Account</v-btn
        >
        <div class="neutral30-border border-radius-8 overflow-hidden">
          <v-btn
            color="white"
            class="text-none font-weight-bold px-2"
            @click="partnerStore.isEditingBrandInfo = true"
            v-if="!partnerStore.isEditingBrandInfo && userStore.isPartner"
            depressed
            >Edit Info</v-btn
          >
        </div>
        <div
          class="neutral30-border border-radius-8 overflow-hidden"
          v-if="partnerStore.isEditingBrandInfo"
        >
          <v-btn
            color="white"
            class="text-none font-weight-bold px-2"
            @click="partnerStore.isEditingBrandInfo = false"
            depressed
            >Cancel</v-btn
          >
        </div>
        <div
          class="neutral30-border border-radius-8 overflow-hidden"
          v-if="partnerStore.isEditingBrandInfo"
        >
          <v-btn
            color="white"
            class="primary--text text-none font-weight-bold px-2"
            :disabled="!partnerStore.brandInfoForm && !partnerStore.inputAvatar"
            @click="partnerStore.updateBrandInfo"
            depressed
            >Save Change</v-btn
          >
        </div>
      </div>
    </div>
    <v-card
      class="border-radius-12 neutral30-border px-4 pt-4 pb-2 mt-2"
      elevation="0"
    >
      <v-form v-model="partnerStore.brandInfoForm">
        <v-row>
          <v-col cols="12" md="5">
            <div>
              <div class="text-sm neutral70--text font-weight-bold">
                Brand name <span class="red60--text">*</span>
              </div>
              <v-text-field
                :background-color="
                  !partnerStore.isEditingBrandInfo ? 'neutral10' : ''
                "
                :outlined="partnerStore.isEditingBrandInfo"
                :disabled="!partnerStore.isEditingBrandInfo"
                :rules="[$rules.required]"
                v-model="partnerStore.partner.brandName"
                class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
                placeholder="Brand Name"
                flat
                solo
                filled
                dense
              >
              </v-text-field>
            </div>
            <div>
              <div class="text-sm neutral70--text font-weight-bold">
                Brand avatar
              </div>
              <div
                class="neutral10-bg border-radius-6 pa-4 mt-1"
                v-if="!partnerStore.isEditingBrandInfo"
              >
                <v-img
                  class="account-ava border-radius-4 neutral30-border mx-auto"
                  :src="partnerAvatar"
                  v-if="partnerAvatar"
                ></v-img>
                <div class="neutral70--text text-center" v-else>
                  No Avatar yet!
                </div>
              </div>
              <div class="upload-container mt-2" v-else>
                <picture-input
                  ref="pictureInput"
                  width="432"
                  height="88"
                  accept="image/jpeg,image/png,image/jpg"
                  size="10"
                  button-class="btn"
                  :z-index="0"
                  :prefill="partnerAvatar"
                  :custom-strings="{
                    upload: 'This device does not support uploading image!',
                    drag: '',
                  }"
                  @change="onIconSelect($event)"
                  hideChangeButton
                  disabled
                  :crop="false"
                >
                </picture-input>
                <div
                  class="upload-text text-center d-flex align-center justify-center"
                  v-if="
                    !partnerStore.inputAvatar && !partnerStore.partner.avatarUrl
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
                Gmail <span class="red60--text">*</span>
              </div>
              <v-text-field
                :background-color="
                  !partnerStore.isEditingBrandInfo ? 'neutral10' : ''
                "
                :outlined="partnerStore.isEditingBrandInfo"
                :disabled="!partnerStore.isEditingBrandInfo"
                :rules="[$rules.required]"
                v-model="partnerStore.partner.email"
                class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
                placeholder="Gmail"
                flat
                solo
                filled
                dense
              >
              </v-text-field>
            </div>
            <div class="mt-2">
              <div class="text-sm neutral70--text font-weight-bold">Link</div>
              <v-text-field
                :background-color="
                  !partnerStore.isEditingBrandInfo ? 'neutral10' : ''
                "
                :outlined="partnerStore.isEditingBrandInfo"
                :disabled="!partnerStore.isEditingBrandInfo"
                v-model="partnerStore.partner.siteUrl"
                class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
                placeholder="Website"
                flat
                solo
                filled
                dense
              >
              </v-text-field>
            </div>
          </v-col>
          <v-col cols="12" md="7" class="d-flex flex-column">
            <div class="text-sm neutral70--text font-weight-bold">
              Information Description
            </div>
            <v-textarea
              :background-color="
                !partnerStore.isEditingBrandInfo ? 'neutral10' : ''
              "
              :outlined="partnerStore.isEditingBrandInfo"
              :disabled="!partnerStore.isEditingBrandInfo"
              v-model="partnerStore.partner.description"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Information Description"
              no-resize
              flat
              solo
              filled
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <div class="d-flex align-center justify-space-between mt-4">
      <div class="text-lg font-weight-bold">Representative Information</div>
      <div class="d-flex align-center gap-8">
        <div
          class="neutral30-border border-radius-8 overflow-hidden"
          v-if="
            !partnerStore.isEditingRepresentativeInfo && userStore.isPartner
          "
        >
          <v-btn
            color="white"
            class="text-none font-weight-bold px-2"
            @click="partnerStore.isEditingRepresentativeInfo = true"
            depressed
            >Edit Info</v-btn
          >
        </div>
        <div
          class="neutral30-border border-radius-8 overflow-hidden"
          v-if="partnerStore.isEditingRepresentativeInfo"
        >
          <v-btn
            color="white"
            class="text-none font-weight-bold px-2"
            @click="partnerStore.isEditingRepresentativeInfo = false"
            depressed
            >Cancel</v-btn
          >
        </div>
        <div
          class="neutral30-border border-radius-8 overflow-hidden"
          v-if="partnerStore.isEditingRepresentativeInfo"
        >
          <v-btn
            color="white"
            class="primary--text text-none font-weight-bold px-2"
            @click="partnerStore.updateRepresentativeInfo()"
            depressed
            >Save Change</v-btn
          >
        </div>
      </div>
    </div>
    <v-card
      class="border-radius-12 neutral30-border px-4 pt-4 pb-2 mt-2"
      elevation="0"
    >
      <v-row>
        <v-col cols="12" md="5">
          <div>
            <div class="text-sm neutral70--text font-weight-bold">Role</div>
            <v-text-field
              :background-color="
                !partnerStore.isEditingRepresentativeInfo ? 'neutral10' : ''
              "
              :outlined="partnerStore.isEditingRepresentativeInfo"
              :disabled="!partnerStore.isEditingRepresentativeInfo"
              v-model="partnerStore.userMetadata.role"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Customer Support"
              flat
              solo
              filled
              dense
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">
              First Name
            </div>
            <v-text-field
              :background-color="
                !partnerStore.isEditingRepresentativeInfo ? 'neutral10' : ''
              "
              :outlined="partnerStore.isEditingRepresentativeInfo"
              :disabled="!partnerStore.isEditingRepresentativeInfo"
              v-model="partnerStore.userMetadata.firstName"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Full Name"
              flat
              solo
              filled
              dense
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">
              Last Name
            </div>
            <v-text-field
              :background-color="
                !partnerStore.isEditingRepresentativeInfo ? 'neutral10' : ''
              "
              :outlined="partnerStore.isEditingRepresentativeInfo"
              :disabled="!partnerStore.isEditingRepresentativeInfo"
              v-model="partnerStore.userMetadata.lastName"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Full Name"
              flat
              solo
              filled
              dense
            >
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <div>
            <div class="text-sm neutral70--text font-weight-bold">
              Telephone
            </div>
            <v-text-field
              :background-color="
                !partnerStore.isEditingRepresentativeInfo ? 'neutral10' : ''
              "
              :outlined="partnerStore.isEditingRepresentativeInfo"
              :disabled="!partnerStore.isEditingRepresentativeInfo"
              v-model="partnerStore.userMetadata.phoneNumber"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Telephone"
              flat
              solo
              filled
              dense
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">Gmail</div>
            <v-text-field
              :background-color="
                !partnerStore.isEditingRepresentativeInfo ? 'neutral10' : ''
              "
              :outlined="partnerStore.isEditingRepresentativeInfo"
              :disabled="!partnerStore.isEditingRepresentativeInfo"
              v-model="partnerStore.userMetadata.email"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Gmail"
              flat
              solo
              filled
              dense
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">Staff ID</div>
            <v-text-field
              :background-color="
                !partnerStore.isEditingRepresentativeInfo ? 'neutral10' : ''
              "
              :outlined="partnerStore.isEditingRepresentativeInfo"
              :disabled="!partnerStore.isEditingRepresentativeInfo"
              v-model="partnerStore.userMetadata.staffId"
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Staff ID"
              flat
              solo
              filled
              dense
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <div v-if="userStore.isPartner">
      <div class="d-flex align-center justify-space-between mt-4">
        <div class="text-lg font-weight-bold">Password</div>
      </div>
      <v-row>
        <v-col cols="12" md="5">
          <v-btn
            color="primary"
            class="border-radius-8 text-none font-weight-bold mt-3"
            @click="partnerStore.changePasswordDialog = true"
            depressed
            >Change Password</v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
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
.account-ava {
  width: 56px !important;
  height: 56px !important;
}
</style>

<script>
import PictureInput from "vue-picture-input";
import { mapStores } from "pinia";
import { partnerStore } from "../stores/partnerStore";
import { userStore } from "@/stores/userStore";
import { get } from "lodash";
export default {
  data() {
    return {
      isEditing: false,
      isShowPass: false,
    };
  },
  computed: {
    ...mapStores(partnerStore),
    ...mapStores(userStore),
    partnerAvatar() {
      return get(
        this.partnerStore,
        "partner.avatarUrl",
        require("@/assets/components/upload-icon.png")
      );
    },
  },
  methods: {
    routerGoBack() {
      this.$router.go(-1);
    },
    onIconSelect(image) {
      if (image) {
        const imageFile = this.$refs.pictureInput.file;
        this.partnerStore.changePartnerAvatar(imageFile);
      } else {
        console.log("FileReader API not supported!");
      }
    },
    onDisableClicked() {
      this.$dialog.confirm({
        title: "Confirm Disable Account",
        topContent:
          "<span class='error--text'>If you disable this account, users will no longer be able to signin!</span>",
        okText: "Confirm",
        cancelText: "Cancel",
        done: async () => {
          await this.partnerStore.disablePartner();
        },
      });
    },
  },
  async created() {
    this.partnerStore.reset();
    if (this.$route.path.includes("account-setting")) {
      await this.partnerStore.fetchPartnerInfo();
    } else {
      const partnerId = this.$route.params.id;
      if (!partnerId) this.$router.push("/dashboard");
      await this.partnerStore.fetchPartner(partnerId);
    }
  },
  components: {
    PictureInput,
    ChangePasswordDialog: () => import("../dialogs/change-password-dialog.vue"),
  },
};
</script>
