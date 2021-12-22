<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card
      flat
      :bordered="!$q.platform.is.mobile"
      :class="$q.platform.is.mobile ? 'q-pa-sm  transparent  ' : 'q-pa-md'"
      :style="$q.platform.is.mobile ? `width: 100%` : `width: 420px`"
    >
      <q-form @submit="submit()">
        <!-- <q-card-section
          class="text-center"
          :class="$q.platform.is.mobile ? 'q-py-sm' : ''"
        >
          <q-img
            :src="require('@/assets/images/logo.svg')"
            style="height: auto; max-width: 128px"
          />
        </q-card-section> -->
        <q-stepper
          v-model="step"
          ref="stepperSignUp"
          color="primary"
          animated
          alternative-labels
          flat
          class="bg-transparent stepper-sign-up"
        >
          <q-step name="1" title="Loja" icon="mdi-store-outline">
            <form-company />
          </q-step>
          <q-step name="2" title="Local" icon="mdi-map-marker-outline">
            <form-address />
          </q-step>
          <q-step name="3" title="Usuário" icon="mdi-account-outline">
            <form-account />
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="row">
              <q-btn
                @click="$refs.stepperSignUp.next()"
                :color="step == 3 ? 'positive' : 'primary'"
                no-caps
                unelevated
                class="full-width q-mb-md q-py-md"
                :label="step == 3 ? 'Finalizar' : 'Avançar'"
              />
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepperSignUp.previous()"
                label="Voltar"
                no-caps
                unelevated
                icon="mdi-arrow-left"
                class="q-mb-md q-py-md"
              />
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <q-card-section class="text-center q-py-xs">
          Já tem uma conta?
          <a class="text-weight-bold text-primary" href="/signin">Entrar</a>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import FormAccount from "../components/singup/FormAccount.vue";
import FormAddress from "../components/singup/FormAddress.vue";
import FormCompany from "../components/singup/FormCompany.vue";
export default {
  name: "SignIn",
  components: { FormCompany, FormAccount, FormAddress },
  data() {
    return {
      form: {
        company_name: null,
        email: null,
        password: null,
      },
      step: "1",
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

<style >
.stepper-sign-up > .q-stepper__header {
  display: none !important;
}
</style>
