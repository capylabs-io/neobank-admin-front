<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <changeImageDialog />
    <div>
      <v-btn class="px-0 text-none primary--text" @click="routerGoBack" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="d-flex justify-space-between">
      <div class="text-dp-xs font-weight-bold">
        {{ gameStore.Game.name ? gameStore.Game.name : "Game title" }}
      </div>
    </div>
    <div class="d-flex align-center gap-8 justify-end">
      <v-btn
        class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
        @click="gameStore.isConfigEditing = true"
        v-if="!gameStore.isConfigEditing"
        depressed
        >Edit Info</v-btn
      >
      <v-btn
        class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
        @click="gameStore.isConfigEditing = false"
        v-if="gameStore.isConfigEditing"
        depressed
        >Cancel</v-btn
      >
      <v-btn
        class="text-none font-weight-bold px-2 border-radius-8"
        color="primary"
        v-if="gameStore.isConfigEditing"
        @click="gameStore.updateGameConfig(gameId)"
        depressed
        >Save Change</v-btn
      >
    </div>
    <div>
      <infoForm />
    </div>
    <div class="d-flex justify-space-between">
      <div class="d-flex mt-10 align-center">
        <div class="neutral70--text text-sm font-weight-bold">
          Ball type quantities:
        </div>
        <v-text-field
          v-model="getQuantity"
          class="border-radius-6 quantity-config ml-2"
          placeholder="Ex: 10"
          outlined
          flat
          solo
          filled
          disabled
          type="number"
          dense
        >
        </v-text-field>
      </div>
    </div>
    <div>
      <v-row
        ><v-col
          v-for="ball in gameStore.dataConfig"
          :key="ball.id"
          cols="12"
          xl="4"
          md="4"
        >
          <configForm :ball="ball" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { gameStore } from "../stores/gameStore";
import { mapStores } from "pinia";
import CampaignHelper from "@/helpers/campaign-helper";
import { get } from "lodash";

export default {
  components: {
    infoForm: () => import(`@/views/minigame/components/game-info-form.vue`),
    configForm: () => import(`@/views/minigame/components/config-form.vue`),
    changeImageDialog: () =>
      import(`@/views/minigame/dialogs/change-image-dialog.vue`),
  },
  data() {
    return {
      campaignHelper: CampaignHelper,
      gameId: 0,
    };
  },
  computed: {
    ...mapStores(gameStore),
    getQuantity() {
      return get(this.gameStore, "Game.config.balls.quantity", "5");
    },
  },

  async created() {
    this.gameStore.changeImageDialog = false;
    this.gameStore.isConfigEditing = false;
    this.gameId = this.$route.params.id;
    if (!this.gameId) this.$router.push("/");
    await this.gameStore.fetchGameConfig(this.gameId);
  },
  methods: {
    routerGoBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.info-field {
  background: var(--v-primary10-base) !important;
}
.quantity-config {
  max-width: 200px;
}
</style>
