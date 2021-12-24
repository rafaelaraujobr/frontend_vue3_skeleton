<template>
  <q-page class="flex flex-center login">
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
          <div class="text-h6">Redefiniar senha</div>
          Insira o email associado à sua conta e enviaremos um email com
          instruções para redefinir sua senha.
        </q-card-section>
        <q-card-section class="q-gutter-sm q-pb-none">
          <q-input
            outlined
            type="email"
            v-model="email"
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
            <template v-slot:prepend>
              <q-icon name="mdi-email-outline" color="" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-section class="row q-col-gutter-x-sm">
          <div class="col-3">
            <q-btn
              no-caps
              unelevated
              outline
              color="primary"
              class="q-mb-md q-py-md full-width"
              icon="mdi-arrow-left"
              to="/signin"
            />
          </div>
          <div class="col-9">
            <q-btn
              unelevated
              color="primary"
              no-caps
              type="submit"
              class="full-width q-mb-md q-py-md"
              label="Enviar"
            />
          </div>
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
      email: null,
      rememberMe: false,
      showPassword: false,
    };
  },
  methods: {
    async submit() {
      this.$q.loading.show();
      this.$refs.email.validate();
      if (!this.form.email) throw "email empty";
      try {
        const { status } = await this.$http.post(
          "access-control/authentication"
        );
        if (status == 200) {
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
