<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-deprecated-filter -->
<template>
  <div>
    <v-card class="neutral30-border border-radius-12 pa-4 mt-3" elevation="0">
      <v-form>
        <div class="mt-2">
          <div class="text-sm neutral70--text font-weight-bold">
            Reward Type
          </div>
          <v-select
            v-model="ball.rewardType"
            :items="gameStore.rewardType"
            background-color="neutral10"
            :disabled="!gameStore.isConfigEditing"
            item-text="title"
            item-value="value"
            class="border-radius-6 mt-1"
            placeholder="Select-Type"
            flat
            solo
            dense
          ></v-select>
        </div>
        <div class="mt-2">
          <div class="text-sm neutral70--text font-weight-bold">Value</div>
          <v-text-field
            v-model="ball.value"
            :background-color="!gameStore.isConfigEditing ? 'neutral10' : ''"
            :outlined="gameStore.isConfigEditing"
            :disabled="!gameStore.isConfigEditing"
            class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
            placeholder="100"
            type="number"
            flat
            solo
            filled
            dense
          >
          </v-text-field>
        </div>
        <div class="mt-2">
          <div class="text-sm neutral70--text font-weight-bold">Quantity</div>
          <v-text-field
            v-model="ball.quantity"
            :background-color="!gameStore.isConfigEditing ? 'neutral10' : ''"
            :outlined="gameStore.isConfigEditing"
            :disabled="!gameStore.isConfigEditing"
            class="border-radius-6 mt-1 flex-grow-1 d-flex flex-column"
            placeholder="100"
            type="number"
            flat
            solo
            filled
            dense
          >
          </v-text-field>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { gameStore } from "../stores/gameStore";
export default {
  props: {
    ball: {
      type: Object,
      default: null,
    },
  },
  components: {},
  computed: {
    ...mapStores(gameStore),
  },
  methods: {},
};
</script>

<style scoped>
.campaign-thumbnail {
  height: 268px;
}
</style>
