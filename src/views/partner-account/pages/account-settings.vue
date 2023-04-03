<template>
  <div>
    <ChangePasswordDialog />
    <div>
      <v-btn class="px-0 text-none primary--text" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="text-dp-xs font-weight-bold">Account Management</div>
    <div class="d-flex align-center justify-space-between mt-4">
      <div class="text-lg font-weight-bold">Brand Information</div>
      <div class="neutral30-border border-radius-8 overflow-hidden">
        <v-btn color="white" class="text-none font-weight-bold px-2" depressed
          >Edit Info</v-btn
        >
      </div>
    </div>
    <v-card
      class="border-radius-12 neutral30-border px-4 pt-4 pb-2 mt-2"
      elevation="0"
    >
      <v-row>
        <v-col cols="12" md="5">
          <div>
            <div class="text-sm neutral70--text font-weight-bold">
              Brand name <span class="red60--text">*</span>
            </div>
            <v-text-field
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Brand Name"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
          <div>
            <div class="text-sm neutral70--text font-weight-bold">
              Brand avatar <span class="red60--text">*</span>
            </div>
            <div
              class="neutral10-bg border-radius-6 pa-4 mt-1"
              v-if="!isEditing"
            >
              <v-img
                class="account-ava border-radius-4 neutral30-border mx-auto"
                :src="require('@/assets/metaAva.webp')"
              ></v-img>
            </div>
            <div class="upload-container mt-2" v-else>
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
                disabled
                :crop="false"
              >
              </picture-input>
              <div class="upload-text text-center" v-if="!isLogoSelected">
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
                <div>PNG, JPG or JPEG file (recommended 24x24px)</div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">
              Gmail <span class="red60--text">*</span>
            </div>
            <v-text-field
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Gmail"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">Link</div>
            <v-text-field
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Website"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
        </v-col>
        <v-col cols="12" md="7" class="d-flex flex-column">
          <div class="text-md text-sm neutral70--text font-weight-bold">
            Information Description
          </div>
          <v-textarea
            class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
            placeholder="Information Description"
            background-color="neutral10"
            no-resize
            flat
            solo
            filled
            disabled
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
    <div class="d-flex align-center justify-space-between mt-4">
      <div class="text-lg font-weight-bold">Representative Information</div>
      <div class="neutral30-border border-radius-8 overflow-hidden">
        <v-btn color="white" class="text-none font-weight-bold px-2" depressed
          >Edit Info</v-btn
        >
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
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Customer Support"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">
              Full Name
            </div>
            <v-text-field
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Full Name"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">Gmail</div>
            <v-text-field
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Gmail"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
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
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Telephone"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
          <div class="mt-2">
            <div class="text-sm neutral70--text font-weight-bold">Staff ID</div>
            <v-text-field
              class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
              placeholder="Staff ID"
              background-color="neutral10"
              flat
              solo
              filled
              dense
              disabled
            >
            </v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <div class="d-flex align-center justify-space-between mt-4">
      <div class="text-lg font-weight-bold">Password</div>
      <div class="neutral30-border border-radius-8 overflow-hidden">
        <v-btn color="white" class="text-none font-weight-bold px-2" depressed
          >Change Password</v-btn
        >
      </div>
    </div>
    <v-card class="border-radius-12 neutral30-border pa-4 mt-2" elevation="0">
      <v-row>
        <v-col cols="12" md="2">
          <div class="text-sm font-weight-bold mt-3">Password</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            type="password"
            :rules="$rules.password"
            class="neutral30-border border-radius-6 mt-1 pa-0"
            placeholder="Password"
            hide-details
            flat
            solo
            filled
            dense
            disabled
          />
        </v-col>
      </v-row>
    </v-card>
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

export default {
  data() {
    return {
      isLogoSelected: false,
      isEditing: false,
      isShowPass: false,
    };
  },
  components: {
    PictureInput,
    ChangePasswordDialog: () => import("../dialogs/change-password-dialog.vue"),
  },
};
</script>
