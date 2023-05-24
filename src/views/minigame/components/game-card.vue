<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      class="game-card pa-3 border-radius-16 cursor-pointer"
      :class="{ 'game-card-hover': isHovering }"
      elevation="0"
      v-bind="props"
      @click.stop="ongameCardClick"
    >
      <div>
        <v-img
          class="game-card-img border-radius-8 elevation-1"
          :src="require('@/assets/game-image.png')"
          cover
        >
        </v-img>
      </div>
      <div class="mt-3">
        <div class="textlg text-center text-capitalize font-weight-bold">
          balls
        </div>
      </div>
      <div class="mt-2">
        <div class="d-flex align-center">
          <div class="text-sm neutral70--text">
            Lorem ipsum dolor sit amet dolor amet consectetur amet consectetur.
          </div>
        </div>
      </div>

      <v-row class="mt-1">
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-account-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">ID</span>
          </div>
          <div class="text-sm font-weight-bold">#1311434</div>
        </v-col>
        <v-col cols="12" md="6" xs="12">
          <div class="d-flex align-center">
            <v-icon small> mdi-calendar-outline</v-icon>
            <span class="neutral70--text text-sm ml-1">Last update</span>
          </div>
          <div class="text-sm font-weight-bold">12 Aug 2023</div>
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
import { get } from "lodash";
import moment from "moment";

export default {
  props: {
    game: {
      type: Object,
      default: null,
    },
  },
  computed: {},
  methods: {
    ongameCardClick() {
      // if (this.game && this.game.id) this.$router.push(`/game/${this.game.id}`);
      this.$router.push('/config')
    },
  },
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
</style>
