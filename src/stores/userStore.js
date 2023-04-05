import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, User } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
export const userStore = defineStore("user", {
  state: () => ({
    userData: {},
    jwt: "",
    rememberMe: false,
    username: "",
    password: "",
    partner: {},
    role: {},
  }),
  getters: {
    isConnected() {
      return !!this.userData && !!this.jwt;
    },
    isMaintainer() {
      return this.role && this.role.type == "maintainer";
    },
    isPartner() {
      return this.role && this.role.type == "partner";
    },
  },
  actions: {
    async signIn() {
      try {
        loading.show();
        const res = await Auth.signIn({
          identifier: this.username,
          password: this.password,
        });
        if (!res) {
          alert.error(`Error occurred! Please try again later!`);
          return;
        }
        const userInfo = res.data.user;
        const jwt = res.data.jwt;
        if (
          !jwt ||
          !userInfo ||
          !userInfo.role ||
          (userInfo.role.type != "maintainer" && userInfo.role.type != "partner")
        ) {
          alert.error(`Only Maintainer and Partner are allowed to signin!`);
          return;
        }
        alert.success("Login successfully!");
        this.jwt = jwt;
        this.userData = userInfo;
        this.role = this.userData.role;
        this.partner = this.userData.partner;
        if (!this.rememberMe) {
          this.password = "";
        }
        this.router.push("/dashboard");
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    },
    logout() {
      this.jwt = "";
      this.userData = {};
    },
  },
  persist: [
    {
      paths: ["password", "rememberMe", "username", "userData", "jwt", "partner", "role"],
      storage: localStorage,
    },
  ],
});
/* eslint-enable */
