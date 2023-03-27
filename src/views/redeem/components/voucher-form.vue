<template>
  <v-card class="form-detail pa-3 mt-4" rounded="12" outlined>
    
  </v-card>
</template>

<script>
import { mapStores } from "pinia";
import { userStore } from "@/stores/userStore";

export default {
  components: {},

  data() {
    return {};
  },
  computed: {
    ...mapStores(userStore),
  },
};
</script>
<style lang="scss" scoped>
.form-detail {
  background-color: white;
  height: 280px;
}
</style>
