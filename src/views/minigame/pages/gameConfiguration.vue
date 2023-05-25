<template>
  <div class="full-height">
    <v-row class="mt-3">
      <v-col
        cols="12"
        md="3"
        sm="6"
        xs="12"
        v-for="game in gameStore.slicedGames"
        :key="game.id"
      >
        <GameCard :config="game" />
      </v-col>
    </v-row>
    <!-- <div
      class="full-width mx-auto d-flex flex-column justify-center"
      style="min-height: 320px"
      v-if="!gameStore.campaigns || gameStore.campaigns.length == 0"
    >
      <div class="text-dp-xs neutral70--text text-center">No Campaign yet!</div>
    </div> -->
    <v-spacer></v-spacer>
    <div class="d-flex align-center">
      <div class="neutral70--text text-sm font-weight-bold">
        Total current games: {{ gameStore.Games.length }}
      </div>
      <v-spacer></v-spacer>
      <v-pagination
        :length="gameStore.totalGamePage"
        :total-visible="5"
        v-model="gameStore.GamePage"
        color="primary"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { gameStore } from "../stores/gameStore";
import { userStore } from "@/stores/userStore";

export default {
  components: {
    GameCard: () => import("../components/game-card.vue"),
  },
  data() {
    return {
      campaign: {
        title: "",
      },
    };
  },
  computed: {
    ...mapStores(gameStore),
    ...mapStores(userStore),
    exportedCampaigns() {
      return this.gameStore.campaigns;
    },
  },
  async created() {
    await this.gameStore.fetchGameConfigs();
  },
  methods: {
    // goToCreateCampaign() {
    //   this.$router.push("/create-campaign");
    // },
    showLoading() {
      this.$loading.show();
    },
    hideLoading() {
      this.$loading.hide();
    },
  },
};
</script>

<style scoped>
.select {
  max-width: 250px;
}
.sort-select {
  max-width: 282px;
}
</style>
