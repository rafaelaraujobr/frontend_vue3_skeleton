<template>
  <router-view />
</template>

<script>
import { colors } from "quasar";
export default {
  name: "App",
  created() {
    this.$q.addressbarColor.set(colors.getPaletteColor("primary"));
  },
};
</script>

<style>
</style>
