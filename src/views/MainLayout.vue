<template>
  <div class="wrapper full-height">
    <NavigationDrawer />
    <div class="container mx-auto pa-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    NavigationDrawer: () => import("@/components/NavigationDrawer.vue"),
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.wrapper {
  background: var(--v-neutral10-base) !important;
}
.container {
  max-width: 1400px;
  animation: fadeleft 1s ease-in-out;
}
</style>
