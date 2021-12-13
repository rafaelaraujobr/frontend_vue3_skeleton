<template>
  <q-tabs
    v-model="tab"
    class="text-dark main-menu"
    dense
    no-caps
    switch-indicator
    :breakpoint="0"
    align="justify"
    :indicator-color="tab == 'register' ? 'transparent' : 'primary'"
    active-color="primary"
  >
    <q-route-tab
      name="home"
      icon="mdi-view-dashboard-outline"
      to="/main"
      exact
      label="Painel"
    />
    <q-route-tab
      icon="mdi-calendar"
      to="/schedule"
      exact
      label="Agenda"
      name=""
    />
    <q-tab
      label="Registrar"
      class="item-menu-main"
      name="register"
      :ripple="false"
    >
      <q-btn
        @click.prevent="ActionSetRegisterVisitDialog(true)"
        color="primary"
        round
        icon="mdi-wallet-outline"
        size="20px"
        class="fixed"
        style="bottom: 25px; border: 4px solid white"
      />
    </q-tab>
    <q-route-tab
      name="performance"
      icon="mdi-chart-areaspline"
      to="/performance"
      exact
      label="Desemp"
    />
    <q-route-tab
      name="profile"
      icon="mdi-store-outline"
      to="/profile"
      exact
      label="Perfil"
    />
  </q-tabs>
</template>

<script>
export default {
  name: "MainMenuMobile",
  data() {
    return {
      tab: "home",
    };
  },
};
</script>

<style>
.item-menu-main .q-tab__label {
  padding-top: 23px;
}
.main-menu .q-tab__label {
  font-size: 12px;
  font-weight: 500;
}
</style>