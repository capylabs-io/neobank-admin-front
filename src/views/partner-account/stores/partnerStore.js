import { defineStore } from "pinia";
import { get } from "lodash-es";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
import { Partner, User, Common } from "@/plugins/api";
import moment from "moment";

export const partnerStore = defineStore("partner", {
  state: () => ({
    user: {},
    userMetadata: {},
    partner: {},
    isEditingBrandInfo: false,
    isEditingRepresentativeInfo: false,
    changePasswordDialog: false,
    inputAvatar: null,
    brandInfoForm: false,
  }),
  getters: {},
  actions: {
    changePartnerAvatar(image) {
      if (!image) return;
      this.inputAvatar = image;
    },
    async fetchPartnerInfo() {
      try {
        loading.show();
        const res = await Partner.fetchPartnerInfo();
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        this.user = get(res, "data", {});
        this.userMetadata = get(this.user, "userMetadata", {}) || {};
        this.partner = get(this.user, "partner", {});
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async updateBrandInfo() {
      try {
        loading.show();
        if (!this.partner) return;
        let uploadedAvatarUrl = this.partner.avatarUrl;
        if (this.inputAvatar) {
          const res = await this.uploadFile();
          if (!res) {
            alert.error("Error occurred when uploading icon!", "Please try again later!");
            return;
          }
          uploadedAvatarUrl = res;
        }
        const res = await Partner.update(this.partner.id, {
          data: {
            ...this.partner,
            brandEmail: this.partner.email,
            avatarUrl: uploadedAvatarUrl,
          },
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const partner = get(res, "data.data", {});
        this.partner = { id: partner.id, ...partner.attributes };
        this.user.partner = this.partner;
        this.isEditingBrandInfo = false;
        alert.success("Update information successfully!", "");
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async updateRepresentativeInfo() {
      try {
        loading.show();
        if (!this.user || !this.userMetadata) return;
        const res = await User.update(this.user.id, {
          userMetadata: this.userMetadata,
        });
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const updatedUserMetadata = get(res, "data.userMetadata", {});
        this.userMetadata = updatedUserMetadata;
        this.user.userMetadata = this.userMetadata;
        this.isEditingRepresentativeInfo = false;
        alert.success("Update information successfully!", "");
      } catch (error) {
        alert.error("Error occurred!", error);
      } finally {
        loading.hide();
      }
    },
    async uploadFile() {
      try {
        loading.show();
        if (!this.inputAvatar) {
          throw new Error("Please select partner avatar!");
        }
        const formData = new FormData();
        formData.append("files", this.inputAvatar);
        const res = await Common.uploadFile(formData);
        if (!res) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        const uploadedUrls = res.data.map((data) => data.url);
        if (!uploadedUrls || uploadedUrls.length == 0) {
          alert.error("Error occurred!", "Please try again later!");
          return;
        }
        alert.success("Upload Image successfully!");
        return uploadedUrls[0];
      } catch (error) {
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
    async changePassword(currentPassword, newPassword, confirmPassword) {
      try {
        loading.show();
        await User.changePassword(currentPassword, newPassword, confirmPassword);
        alert.success("Change password successfully!");
        this.changePasswordDialog = false;
      } catch (error) {
        console.log("error", error);
        alert.error("Error occurred!", error.message);
      } finally {
        loading.hide();
      }
    },
  },
});
