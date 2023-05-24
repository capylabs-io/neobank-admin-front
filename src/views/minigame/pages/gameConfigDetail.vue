<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <div>
      <v-btn class="px-0 text-none primary--text" @click="routerGoBack" text
        ><v-icon color="primary" small>mdi-chevron-double-left</v-icon>Get
        back</v-btn
      >
    </div>
    <div class="d-flex justify-space-between">
      <div class="text-dp-xs font-weight-bold">Game title</div>
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
          class="border-radius-6 quantity-config ml-2"
          placeholder="Ex: 10"
          outlined
          flat
          solo
          filled
          type="number"
          dense
        >
        </v-text-field>
      </div>
      <div class="d-flex align-center gap-8">
        <v-btn
          class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
          @click="gameStore.isEditing = true"
          v-if="!gameStore.isEditing"
          depressed
          >Edit Info</v-btn
        >
        <v-btn
          class="white-bg neutral30-border text-none font-weight-bold px-2 border-radius-8"
          @click="gameStore.isEditing = false"
          v-if="gameStore.isEditing"
          depressed
          >Cancel</v-btn
        >
        <v-btn
          class="text-none font-weight-bold px-2 border-radius-8"
          color="primary"
          v-if="gameStore.isEditing"
          @click="gameStore.updateCampaign"
          depressed
          >Save Change</v-btn
        >
      </div>
    </div>
    <div>
      <v-row
        ><v-col v-for="i in 5" :key="i" cols="12" xl="4" md="4">
          <configForm />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { gameStore } from "../stores/gameStore";
import { mapStores } from "pinia";
import CampaignHelper from "@/helpers/campaign-helper";

export default {
  components: {
    infoForm: () => import(`@/views/minigame/components/game-info-form.vue`),
    configForm: () => import(`@/views/minigame/components/config-form.vue`),
  },
  data() {
    return {
      campaignHelper: CampaignHelper,
      campaignId: 0,
    };
  },
  computed: {
    ...mapStores(gameStore),
  },
  methods: {
    routerGoBack() {
      this.$router.go(-1);
    },
  },
  created() {},
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
