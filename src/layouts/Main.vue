<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title>app</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <main-menu />
    </q-drawer>
    <q-footer class="bg-transparent" bordered v-if="$q.platform.is.mobile">
      <main-menu-mobile />
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import MainMenuMobile from "@/components/MainMenuMobile.vue";
import MainMenu from "@/components/MainMenu";
export default {
  name: "MainLayout",
  components: { MainMenu, MainMenuMobile },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>
