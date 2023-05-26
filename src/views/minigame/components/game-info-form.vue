<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <v-card class="neutral30-border border-radius-12 pa-4 mt-3" elevation="0">
      <v-form>
        <v-row>
          <v-col cols="12" md="5">
            <div>
              <div class="neutral10-bg mt-1">
                <v-btn
                  color="primary"
                  class="btn-image-change"
                  depressed
                  :disabled="!gameStore.isConfigEditing"
                  @click="gameStore.changeImageDialog = true"
                  ><v-icon color="white" large>mdi-camera-outline</v-icon>
                </v-btn>
                <v-img
                  class="campaign-thumbnail border-radius-8"
                  :src="getImage"
                  cover
                ></v-img>
              </div>
            </div>
          </v-col>
          <v-col class="d-flex flex-column" cols="12" md="7">
            <div class="flex-grow-1 d-flex flex-column">
              <div class="text-sm neutral70--text font-weight-bold">
                Description
              </div>
              <v-textarea
                v-model="gameStore.Game.description"
                :background-color="
                  !gameStore.isConfigEditing ? 'neutral10' : ''
                "
                :outlined="gameStore.isConfigEditing"
                :disabled="!gameStore.isConfigEditing"
                class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
                placeholder="Description"
                hide-details
                no-resize
                flat
                solo
                filled
              ></v-textarea>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { gameStore } from "../stores/gameStore";
import { get } from "lodash";

export default {
  components: {},
  computed: {
    ...mapStores(gameStore),
    getImage() {
      return get(
        this.gameStore,
        "Game.image",
        require("@/assets/game-image.png")
      );
    },
  },
  methods: {},
};
</script>

<style scoped>
.campaign-thumbnail {
  height: 268px;
  z-index: 1;
}
.btn-image-change {
  width: 50px;
  height: 50px;
  position: absolute !important;
  z-index: 2;
}
</style>
