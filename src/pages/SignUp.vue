<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card
      flat
      :bordered="!$q.platform.is.mobile"
      :class="$q.platform.is.mobile ? 'q-pa-sm  transparent  ' : 'q-pa-md'"
      :style="$q.platform.is.mobile ? `width: 100%` : `width: 512px`"
    >
      <q-form @submit="submit()">
        <q-stepper
          v-model="step"
          ref="stepperSignUp"
          color="primary"
          animated
          :contracted="$q.platform.is.mobile"
          alternative-labels
          done-color="positive"
          swipeable
          flat
          class="bg-transparent stepper-sign-up q-my-none"
        >
          <q-step name="1" title="Empresa" prefix="1" :done="step > 1">
            <q-card-section class="text-center q-pt-none">
              <q-icon name="mdi-store-outline" size="xl" />
              <div class="text-h6">Empresa</div>
              <div class="text-subtitle2">
                Informações sobre o estabelecimento
              </div>
            </q-card-section>
            <q-card-section class="row q-col-gutter-sm q-pa-none">
              <div class="col-12">
                <q-input
                  outlined
                  bg-color="white"
                  type="text"
                  v-model="form.company_name"
                  placeholder="Informe o nome do estabelecimento"
                  clearable
                  ref="company_name"
                  aria-label="company_name"
                  clear-icon="mdi-close"
                  label="Nome"
                  lazy-rules
                  :rules="[required]"
                  hint="Identificação da empresa"
                />
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  type="tel"
                  bg-color="white"
                  v-model="form.phone"
                  placeholder="Informe o telefone"
                  clearable
                  ref="phone"
                  :mask="maskPhone"
                  aria-label="tel"
                  clear-icon="mdi-close"
                  label="Telefone ou Celular"
                  lazy-rules
                  :rules="[required]"
                  hint="Telefone para contato"
                >
                </q-input>
              </div>
              <div class="col-12">
                <!-- <q-select
                  v-model="form.company_type"
                  :options="[
                    { value: 1, label: 'Produtos' },
                    { value: 2, label: 'Serviço' },
                  ]"
                  label="Modalidade"
                  outlined
                  use-chips
                  multiple
                  clear-icon="mdi-close"
                  clearable
                  bg-color="white"
                  lazy-rules
                  :rules="[required]"
                /> -->
                <!-- <q-input
                  outlined
                  type="number"
                  bg-color="white"
                  v-model="form.company_type"
                  placeholder="Informe o cnpj"
                  clearable
                  ref="email"
                  aria-label="email"
                  clear-icon="mdi-close"
                  label="CNPJ"
                >
                </q-input> -->
              </div>
            </q-card-section>
          </q-step>
          <q-step name="2" title="Endereço" prefix="2" :done="step > 2">
            <q-card-section class="text-center q-pt-none">
              <q-icon name="mdi-map-marker" size="xl" />
              <div class="text-h6">Endereço</div>
              <div class="text-subtitle2">Como encontrar sua empresa</div>
            </q-card-section>
            <q-card-section
              class="row q-col-gutter-x-sm q-col-gutter-y-xs q-pa-none"
            >
              <div class="col-12">
                <q-input
                  bg-color="white"
                  :loading="loading"
                  v-model="form.address.zip_code"
                  label="Cep"
                  type="tel"
                  mask="#####-###"
                  lazy-rules
                  :rules="[required]"
                  outlined
                  hint="Ex: 23565-510"
                >
                  <template v-slot:append>
                    <q-btn
                      unelevated
                      round
                      flat
                      color="primary"
                      icon="mdi-map-search-outline"
                      @click="getAddressToZipCode(form.address.zip_code)"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-4">
                <q-input
                  bg-color="white"
                  ref="number"
                  v-model="form.address.number"
                  type="number"
                  label="Numero"
                  outlined
                  lazy-rules
                  :rules="[required]"
                />
              </div>
              <div class="col-8">
                <q-input
                  v-model="form.address.complement"
                  type="text"
                  bg-color="white"
                  label="Complemento"
                  outlined
                  lazy-rules
                  :rules="[required]"
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="form.address.public_place"
                  type="text"
                  bg-color="white"
                  label="Logradouro"
                  lazy-rules
                  :rules="[required]"
                  outlined
                />
              </div>
              <div class="col-12">
                <q-input
                  v-model="form.address.district"
                  type="text"
                  label="Bairro"
                  bg-color="white"
                  lazy-rules
                  :rules="[required]"
                  outlined
                />
              </div>
              <div class="col-8">
                <q-input
                  v-model="form.address.city"
                  type="text"
                  label="Cidade"
                  bg-color="white"
                  lazy-rules
                  :rules="[required]"
                  outlined
                />
              </div>
              <div class="col-4">
                <q-input
                  v-model="form.address.state"
                  type="text"
                  label="UF"
                  bg-color="white"
                  outlined
                  lazy-rules
                  :rules="[required]"
                  maxlength="2"
                  hint="Ex: RJ"
                  mask="AA"
                />
              </div>
            </q-card-section>
          </q-step>
          <q-step name="3" title="Usuário" prefix="3">
            <q-card-section class="text-center q-pt-none">
              <q-icon name="mdi-account" size="xl" />
              <div class="text-h6">Usuário</div>
              <div class="text-subtitle2">
                Informe seus dados de authenticação
              </div>
            </q-card-section>
            <q-card-section class="row q-col-gutter-x-sm q-pa-none">
              <div class="col-6">
                <q-input
                  outlined
                  bg-color="white"
                  type="text"
                  v-model="form.first_name"
                  clearable
                  ref="first_name"
                  aria-label="first_name"
                  clear-icon="mdi-close"
                  label="Nome"
                  lazy-rules
                  :rules="[required]"
                >
                </q-input>
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  bg-color="white"
                  type="text"
                  v-model="form.first_name"
                  clearable
                  ref="first_name"
                  aria-label="first_name"
                  clear-icon="mdi-close"
                  label="Sobrenome"
                  lazy-rules
                  :rules="[required]"
                >
                </q-input>
              </div>
              <div class="col-12">
                <q-input
                  outlined
                  type="email"
                  bg-color="white"
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
                />
              </div>
              <div class="col-12">
                <q-input
                  clearable
                  bg-color="white"
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
                      :name="
                        showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                      "
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
                      :name="
                        showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
                      "
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
              </div>
            </q-card-section>
          </q-step>
          <template v-slot:navigation>
            <q-stepper-navigation class="row q-col-gutter-x-sm">
              <div class="col-3" v-if="step > 1">
                <q-btn
                  outline
                  color="primary"
                  @click="$refs.stepperSignUp.previous()"
                  no-caps
                  unelevated
                  icon="mdi-arrow-left"
                  class="q-mb-md q-py-md full-width"
                />
              </div>
              <div :class="step > 1 ? 'col-9' : 'col-12'">
                <q-btn
                  @click="$refs.stepperSignUp.next()"
                  :color="step == 3 ? 'positive' : 'primary'"
                  no-caps
                  unelevated
                  class="full-width q-mb-md q-py-md"
                  :label="step == 3 ? 'Finalizar' : 'Avançar'"
                />
              </div>
            </q-stepper-navigation>
          </template>
        </q-stepper>
        <q-card-section class="text-center q-py-none">
          Já tem uma conta?
          <a class="text-weight-bold text-primary" href="/signin">Entrar</a>
        </q-card-section>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  name: "SignIn",
  data() {
    return {
      loading: false,
      step: "1",
      form: {
        company_name: "",
        phone: "",
        company_type: [],
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        address: {
          zip_code: "",
          number: "",
          complement: "",
          public_place: "",
          district: "",
          city: "",
          state: "",
        },
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
    async getAddressToZipCode(zip_code) {
      this.loading = true;
      try {
        const { data, status } = await axios.get(
          `https://viacep.com.br/ws/${zip_code}/json/`
        );
        if (status == 200) {
          this.form.address.district = data.bairro;
          this.form.address.complement = data.complemento;
          this.form.address.public_place = data.logradouro;
          this.form.address.city = data.localidade;
          this.form.address.state = data.uf;
          this.$refs.number.focus();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  computed: {
    maskPhone() {
      if (this.form.phone && this.form.phone.substr(5, 1) == 9)
        return "(##) #####-####";
      else return "(##) ####-####";
    },
  },
};
</script>

<style >
.q-stepper__step-inner {
  padding: 16px !important;
}
.q-stepper--horizontal > .q-stepper__nav {
  padding: 0 16px 16px !important;
}
/* .stepper-sign-up > .q-stepper__header {
  display: none !important;
} */
</style>
