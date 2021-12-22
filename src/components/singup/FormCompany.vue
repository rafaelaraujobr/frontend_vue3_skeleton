<template>
  <q-card-section class="text-center">
    <q-icon name="mdi-store-outline" size="xl" />
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
        v-model="company_name"
        placeholder="Informe o nome do estabelecimento"
        clearable
        ref="company_name"
        aria-label="company_name"
        clear-icon="mdi-close"
        label="Nome"
      >
      </q-input>
    </div>
    <div class="col-12">
      <q-input
        outlined
        type="number"
        bg-color="white"
        v-model="phone"
        placeholder="Informe o telefone"
        clearable
        ref="email"
        aria-label="email"
        clear-icon="mdi-close"
        label="Telefone"
      >
      </q-input>
    </div>
    <div class="col-12">
      <q-input
        outlined
        type="number"
        bg-color="white"
        v-model="cnpj"
        placeholder="Informe o cnpj"
        clearable
        ref="email"
        aria-label="email"
        clear-icon="mdi-close"
        label="CNPJ"
      >
      </q-input>
    </div>
  </q-card-section>
</template>

<script>
export default {
  name: "FormCompany",
  data() {
    return {
      company_name: null,
      phone: null,
      cnpj: null,
    };
  }
};
</script>

<style>
</style>