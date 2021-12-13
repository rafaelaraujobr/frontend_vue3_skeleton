<template>
  <q-page class="flex flex-center login">
    <q-card
      flat
      :bordered="!$q.platform.is.mobile"
      :class="$q.platform.is.mobile ? 'q-pa-sm  transparent  ' : 'q-pa-md'"
      :style="$q.platform.is.mobile ? `width: 100%` : `width: 420px`"
    >
      <q-form @submit="submit()">
        <q-card-section
          class="text-center"
          :class="$q.platform.is.mobile ? 'q-py-sm' : ''"
        >
          <q-img
            :src="require('@/assets/images/logo.svg')"
            style="height: auto; max-width: 128px"
          />
        </q-card-section>
        <q-card-section class="q-gutter-sm q-pb-none">
          <q-input
            outlined
            type="text"
            v-model="form.company_name"
            placeholder="Informe o nome do estabelecimento"
            clearable
            ref="company_name"
            aria-label="company_name"
            clear-icon="mdi-close"
            label="Nome do estabelecimento"
            lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)"
          >
          </q-input>
          <q-input
            outlined
            type="text"
            v-model="form.username"
            placeholder="Informe nome de usuario"
            clearable
            ref="username"
            aria-label="username"
            clear-icon="mdi-close"
            label="Username"
            lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)"
          >
          </q-input>
          <q-input
            outlined
            type="email"
            v-model="form.email"
            placeholder="Informe o email"
            clearable
            ref="email"
            aria-label="email"
            clear-icon="mdi-close"
            label="Email"
            lazy-rules
            :rules="[required, isEmail]"
            @keyup.enter="login(form)"
          >
          </q-input>
          <q-input
            clearable
            aria-autocomplete="password"
            clear-icon="mdi-close"
            outlined
            placeholder="Informe sua senha"
            v-model="form.password"
            ref="password"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)"
          >
            <template v-slot:append>
              <q-icon
                color="primary"
                class="cursor-pointer"
                :name="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
          <q-input
            clearable
            aria-autocomplete="password"
            clear-icon="mdi-close"
            outlined
            placeholder="Informe sua senha"
            v-model="form.password"
            ref="checkPassword"
            label="Confirmar senha"
            :type="showPassword ? 'text' : 'password'"
            lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)"
          >
            <template v-slot:append>
              <q-icon
                color="primary"
                class="cursor-pointer"
                :name="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-btn
            unelevated
            color="primary"
            no-caps
            type="submit"
            class="full-width q-mb-md q-py-md"
            label="Criar conta"
          />
        </q-card-section>
        <q-card-section class="text-center q-py-xs">
          Já tem uma conta?
          <a class="text-weight-bold text-primary" href="/signin">Entrar</a>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
// import AccountServices from "@/mixins/AccountServices";
export default {
  name: "SignIn",
  //   mixins: [AccountServices],
  data() {
    return {
      form: {
        company_name: null,
        email: null,
        password: null,
      },
      rememberMe: false,
      showPassword: false,
    };
  },
  methods: {
    async submit() {
      this.$q.loading.show();
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.form.email) throw "email empty";
      if (!this.form.password) throw "password empty";
      if (localStorage["ncl_store"]) localStorage.removeItem("ncl_store");
      try {
        const encodedString = btoa(`${this.form.email}:${this.form.password}`);
        const { data, status } = await this.$http.patch(
          "access-control/authentication",
          null,
          { headers: { Authorization: `Basic ${encodedString}` } }
        );
        if (status == 200) {
          localStorage.setItem("ncl_store", JSON.stringify(data.token));
          this.$router.push({ name: "Main" });
        }
      } catch (error) {
        this.$q.notify({
          message: error.response ? error.response : error,
          color: "primary",
        });
      } finally {
        this.$q.loading.hide();
      }
    },
  },
};
</script>

<style scoped>
</style>
