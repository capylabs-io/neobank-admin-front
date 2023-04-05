import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Auth, User } from "@/plugins/api.js";
import loading from "@/plugins/loading";
import alert from "@/plugins/alert";
export const userStore = defineStore(
  "user",
  () => {
    const pageIndex = ref(1);
    const index = ref(2);
    const cfDialog = ref(false);
    const scrollY = ref(1);
    const jwt = ref("");
    const rememberMe = ref(false);
    const isShowPass = ref(false);
    const sortBy = ref("");
    const username = ref("");
    const password = ref("");

    const userData = ref({});
    const adminDetail = ref(false);
    async function signIn() {
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
        alert.success("Login successfully!");
        this.jwt = res.data.jwt;
        this.userData = res.data.user;
        if (!this.rememberMe) {
          this.password = "";
        }
        this.router.push("/");
      } catch (error) {
        console.error(`Error: ${error}`);
        alert.error(error);
      } finally {
        loading.hide();
      }
    }

    function logout() {
      jwt.value = "";
      userData.value = null;
    }

    const isConnected = computed(() => jwt);
    return {
      //computed
      isConnected,
      //states
      index,
      username,
      password,
      jwt,
      pageIndex,
      isShowPass,
      userData,
      rememberMe,
      cfDialog,
      scrollY,
      sortBy,
      adminDetail,
      //action
      signIn,
      logout,
    };
  },
  {
    persist: [
      {
        paths: ["password", "rememberMe", "username"],
        storage: localStorage,
      },
      {
        paths: ["userData", "jwt"],
        storage: sessionStorage,
      },
    ],
  }
);
/* eslint-enable */
