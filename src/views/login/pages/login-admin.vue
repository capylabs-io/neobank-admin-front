<template>
  <div>
    <div class="container">
      <v-row>
        <v-col class="d-flex flex-column justify-center" cols="5">
          <v-card flat class="mx-auto form">
            <v-form
              ref="form"
              lazy-validation
              class="full-width d-flex flex-column align-center justify-center"
            >
              <div class="d-flex flex-column">
                <div>
                  <v-img
                    width="80px"
                    height="80px"
                    :style="{ 'border-radius': '10px' }"
                    class
                    :src="require(`@/assets/logo-admin.webp`)"
                  />
                </div>
                <div class="text-left">
                  <span class="text-xl font-weight-bold text-uppercase"
                    >NeoBank</span
                  >
                </div>
              </div>
              <div class="d-flex flex-column mt-8 full-width">
                <span class="text-lg font-weight-bold">Login</span>
                <div class="text-sm neutral70--text font-weight-bold mt-6">
                  Name
                </div>
                <v-text-field
                  height="36px"
                  type="text"
                  v-model="userStore.username"
                  :rules="rules.checkIdentifier"
                  class="pa-0 mt-1"
                  placeholder="Name"
                  dense
                />
                <div class="text-sm neutral70--text font-weight-bold mt-2">
                  Password
                </div>
                <v-text-field
                  height="36px"
                  v-model="userStore.password"
                  :append-icon="isShowPass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="isShowPass ? 'text' : 'password'"
                  :rules="rules.password"
                  @click:append="isShowPass = !isShowPass"
                  class="pa-0"
                  placeholder="Password"
                  dense
                />
              </div>
              <v-btn
                class="mt-7 full-width"
                color="blue"
                @click="submitForm"
                depressed
                ><span class="white--text text-capitalize text-btn"
                  >Login</span
                ></v-btn
              >
              <div class="mt-3">
                <span :style="{ fontSize: '12px' }">Troublewith login?</span>
                <a
                  :style="{
                    fontSize: '12px',
                    fontWeight: 700,
                    'text-decoration': 'underline',
                  }"
                  class="ml-2 black--text"
                  >Contact Service</a
                >
              </div>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="7"
          ><div>
            <v-img
              height="97vh"
              :style="{
                'border-top-left-radius': '100px',
                'border-bottom-right-radius': '100px',
              }"
              class="img-wrap"
              :src="require(`@/assets/login-pic.webp`)"
            >
              <div class="img-text text-left white--text mx-auto flex-column">
                <div
                  :style="{
                    fontSize: '24px',
                    fontWeight: 700,
                  }"
                >
                  "
                </div>
                <div class="mt-3">
                  Lorem ipsum dolor sit amet consectetur. At luctus in ac ut et
                  vitae vitae pulvinar. Sapienerat orci nam nisi. Non vestibulum
                  dictum sed augue commodo mauris odio proinipsum doloris.
                </div>
                <div
                  class="mt-3"
                  :style="{
                    fontSize: '20px',
                    fontWeight: 700,
                  }"
                >
                  HSBC
                </div>
                <div class="d-flex justify-space-between mt-3">
                  <span>Torino, Italia</span>
                  <div class="d-flex">
                    <v-btn
                      icon
                      class="mr-3"
                      color="white"
                      :style="{ border: '1px solid white' }"
                      ><v-icon>mdi-arrow-left</v-icon></v-btn
                    >
                    <v-btn
                      icon
                      color="white"
                      :style="{ border: '1px solid white' }"
                      ><v-icon>mdi-arrow-right</v-icon></v-btn
                    >
                  </div>
                </div>
              </div></v-img
            >
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { rules } from "@/plugins/rules";
import { userStore } from "@/stores/userStore";
export default {
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      rules: rules,
      isShow: true,
      isShowPass: false,
    };
  },
  methods: {
    gotoRouter(url) {
      this.$router.push({
        params: "vn",
        name: url,
      });
    },
    change() {
      this.userStore.pageIndex = 3;
    },
    submitForm() {
      if (this.$refs.form.validate()) {
        this.userStore.signIn();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
}
.img-wrap:before {
  content: "";
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 50.52%,
    #000000 100%
  );
  position: absolute;
  height: 320px;
  right: 0;
  bottom: 0;
  left: 0;
}
.img-text {
  position: absolute;
  height: 250px;
  width: 90%;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
}
</style>
