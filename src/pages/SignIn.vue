<template>
  <q-page class="flex flex-center login bg-grey-2">
    <q-card
      flat
      :bordered="!$q.platform.is.mobile"
      :class="$q.platform.is.mobile ? 'q-pa-sm  transparent  ' : 'q-pa-md'"
      :style="$q.platform.is.mobile ? `width: 100%` : `width: 512px`"
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
            bg-color="white"
            v-model="form.username"
            placeholder="Informe o username ou email"
            clearable
            ref="username"
            aria-label="username"
            clear-icon="mdi-close"
            label="Username"
            lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)"
          >
            <!-- lazy-rules
            :rules="[this.required, this.isEmail, this.short]" -->
            <template v-slot:prepend>
              <q-icon name="mdi-account-outline" color="" />
            </template>
          </q-input>
          <q-input
            clearable
            aria-autocomplete="password"
            clear-icon="mdi-close"
            outlined
            bg-color="white"
            placeholder="Informe sua senha"
            v-model="form.password"
            ref="password"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            lazy-rules
            :rules="[required]"
            @keyup.enter="login(form)"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-lock-open-outline" />
            </template>
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
            label="Entrar"
          />
          <div class="row justify-between">
            <q-space />
            <q-btn
              no-caps
              unelevated
              flat
              to="/recoverpassword"
              label="Recuperar senha"
            />
          </div>
        </q-card-section>
        <q-card-section class="text-center q-py-xs">
          Já tem uma conta?
          <a class="text-weight-bold text-primary" href="/signup"
            >Inscrever-se</a
          >
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
        username: null,
        password: null,
      },
      rememberMe: false,
      showPassword: false,
    };
  },
  methods: {
    async submit() {
      this.$q.loading.show();
      this.$refs.username.validate();
      this.$refs.password.validate();
      if (!this.form.username) throw "username empty";
      if (!this.form.password) throw "password empty";
      if (localStorage["ncl_store"]) localStorage.removeItem("ncl_store");
      try {
        const encodedString = btoa(
          `${this.form.username}:${this.form.password}`
        );
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
