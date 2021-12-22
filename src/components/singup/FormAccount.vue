<template>
  <q-card-section class="text-center">
    <q-icon name="mdi-account" size="xl" />
    <div class="text-h6">Lorem ipsum</div>
    <div class="text-subtitle2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </div>
  </q-card-section>
  <q-card-section class="row q-col-gutter-md q-px-none">
    <div class="col-12">
      <q-input
        outlined
        bg-color="white"
        type="text"
        v-model="username"
        placeholder="Informe nome de usuario"
        clearable
        ref="username"
        aria-label="username"
        clear-icon="mdi-close"
        label="Username"
      >
      </q-input>
      <!-- lazy-rules
        :rules="[required]"
        @keyup.enter="login(form)" -->
    </div>
    <div class="col-12">
      <q-input
        outlined
        type="email"
        bg-color="white"
        v-model="email"
        placeholder="Informe o email"
        clearable
        ref="email"
        aria-label="email"
        clear-icon="mdi-close"
        label="Email"
      />
      <!-- lazy-rules
            :rules="[required, isEmail]"
            @keyup.enter="login(form)" -->
    </div>
    <div class="col-12">
      <q-input
        clearable
        bg-color="white"
        aria-autocomplete="password"
        clear-icon="mdi-close"
        outlined
        placeholder="Informe sua senha"
        v-model="password"
        ref="password"
        label="Senha"
        :type="showPassword ? 'text' : 'password'"
      >
        <!-- lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)" -->
        <template v-slot:append>
          <q-icon
            color="primary"
            class="cursor-pointer"
            :name="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <q-input
        clearable
        bg-color="white"
        aria-autocomplete="password"
        clear-icon="mdi-close"
        outlined
        placeholder="Informe sua senha"
        v-model="password"
        ref="checkPassword"
        label="Confirmar senha"
        :type="showPassword ? 'text' : 'password'"
      >
        <!-- lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)" -->
        <template v-slot:append>
          <q-icon
            color="primary"
            class="cursor-pointer"
            :name="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: "FormAccount",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      showPassword: false,
    };
  },
};
</script>

<style>
</style>