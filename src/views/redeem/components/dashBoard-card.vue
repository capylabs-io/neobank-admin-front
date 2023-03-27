<template>
  <v-card elevation="2" rounded="8" class="pa-3" @click="Click()">
    <div class="card-image d-flex flex-column">
      <div class="full-width">
        <v-img
          class="card-image"
          height="150px"
          src="@/assets/redeem/card/baemin-card.webp"
        ></v-img>
      </div>
      <!-- <div
        v-if="cards.attributes.status == 'New'"
        class="mt-3 pa-1 px-3"
        :style="{
          background: '#FDDF59',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.status }}
      </div>
      <div
        v-else-if="cards.attributes.status == 'Hot'"
        class="mt-3 pa-1 px-3"
        :style="{
          background: '#f65970',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        {{ cards.attributes.status }}
      </div> -->
      <!-- <div
      v-else
        class="mt-3 pa-1 px-3"
        :style="{
          background: '#CBCBCB',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      ></div> -->
      <div
        class="mt-3 pa-1 px-3 white--text"
        :style="{
          background: '#EC1D1D',
          width: 'max-content',
          height: 'max-content',
          position: 'absolute',
          'border-bottom-right-radius': '8px',
          'border-top-right-radius': '8px',
        }"
      >
        HOT
      </div>
    </div>
    <div class="d-inline-block voucher-title text-center mt-3" :style="{width:'90%'}">
      100.000đ voucher Baemin
    </div>
    <div
      class="d-flex mt-3 font-weight-bold align-center justify-center column-gap-10"
    >
      <div>
        <v-img class="card-icon" src="@/assets/redeem/card/baemin-icon.webp" />
      </div>

      <v-progress-linear
        height="25"
        rounded
        color="#E87331"
        value="85"
      >
        <strong class="white--text">40/50</strong>
      </v-progress-linear>
    </div>
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "../../../stores/userStore";
// import tooltip from "@/views/redeem/components/card-tooltip.vue";
export default {
  components: {
    // tooltip: tooltip,
  },
  props: ["cards", "id"],
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      index: 1,
      loading: true,
      purchased: true,
      number: 90,
    };
  },
  mounted() {
    this.purchased = this.userStore.voucherPurchased.includes(this.id);
  },
  methods: {
    Click() {
      this.userStore.adminDetail = !this.userStore.adminDetail;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-image {
  height: 150px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.card-icon {
  border-radius: 100px;
  width: 26px;
  height: 26px;
}

.column-gap-10 {
  column-gap: 10px;
}
.tooltip {
  position: absolute;
  width: 400px;
  top: 7%;
  margin-left: 100px;
  z-index: 99;
}

.v-card {
  border-radius: 8px;
  animation: fadeleft 1s ease-in-out;
}

.unpurchased {
  background: #5752e3;
  padding: 4px, 16px, 4px, 16px;
}
.expired {
  padding: 4px, 16px, 4px, 16px;
}

.purchased {
  background: #00ff2926;
  color: #22c33c;
  padding: 4px, 16px, 4px, 16px;
}
@keyframes fadeleft {
  0% {
    opacity: 0;
    transform: translatex(-100px);
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translatey(300px);
  }
  to {
    opacity: 1;
  }
}
</style>
