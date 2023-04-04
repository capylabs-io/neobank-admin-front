import { defineStore } from "pinia";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Partner } from "@/plugins/api";
import moment from "moment";

export const partnerStore = defineStore("partner", {
  state: () => ({
    partner: {},
    isEditingBrandInfo: false,
    isEditingRepresentativeInfo: false,
    changePasswordDialog: false,
    inputAvatar: null,
    brandInfoForm: false
  }),
  getters: {},
  actions: {
    changePartnerAvatar(image) {
      if (!image) return;
      this.inputAvatar = image;
    },
  },
});
