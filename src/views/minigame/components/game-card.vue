<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="game-card pa-3 border-radius-16 cursor-pointer full-height d-flex flex-column"
      :class="{ 'game-card-hover': isHovering }"
      elevation="0"
      v-bind="props"
      :disabled="!config.active"
      @click.stop="ongameCardClick"
    >
      <v-btn
        v-if="!config.active"
        color="primary"
        class="btn-image-change text-none font-weight-bold"
        depressed
      >
        Coming soon
      </v-btn>
      <div>
        <v-img
          class="game-card-img border-radius-8 elevation-1"
          :src="getGameImage"
          cover
        >
        </v-img>
      </div>
      <div class="mt-3">
        <div class="textlg text-center text-capitalize font-weight-bold">
          {{ config.name }}
        </div>
      </div>
      <div class="mt-2 flex-grow-1">
        <div class="d-flex align-center">
          <div class="text-sm neutral70--text">
            {{ config.description }}
          </div>
        </div>
      </div>

      <v-row class="mt-1">
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-account-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">ID</span>
          </div>
          <div class="text-sm font-weight-bold">#{{ config.id }}</div>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-calendar-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">Last update</span>
          </div>
          <div class="text-sm font-weight-bold">
            {{ config.updatedAt | ddmmyyyy }}
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
import { get } from "lodash";
import moment from "moment";
import { gameStore } from "../stores/gameStore";
import { mapStores } from "pinia";
export default {
  props: {
    config: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapStores(gameStore),
    getGameImage() {
      return get(this.config, "image", require("@/assets/game-image.png"));
    },
  },
  methods: {
    ongameCardClick() {
      if (this.config.active) {
        // if (this.game && this.game.id) this.$router.push(`/game/${this.game.id}`);
        if (this.config && this.config.id)
          this.$router.push(`/game-configs/${this.config.id}`);
      }
    },
  },
  created() {},
  data() {
    return {};
  },
};
</script>

<style scoped>
.game-card {
  border: 1px solid var(--v-neutral30-base);
}
.game-card-img {
  height: 168px;
}
.game-card-hover {
  border: 1px solid var(--v-primary-base) !important;
}
.card-status {
  position: absolute;
  border-radius: 4px;
  top: 8px;
}
.category-icon {
  width: 14px;
  height: 14px;
}

.btn-image-change {
  width: max-content;
  height: 50px;
  position: absolute !important;
  z-index: 99 !important;
}
</style>
