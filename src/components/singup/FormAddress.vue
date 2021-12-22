<template>
  <q-card-section class="text-center">
    <q-icon name="mdi-map-marker" size="xl" />
    <div class="text-h6">Lorem ipsum</div>
    <div class="text-subtitle2">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </div>
  </q-card-section>
  <q-card-section class="row q-col-gutter-sm q-px-none">
    <div class="col-12">
      <q-input
        bg-color="white"
        :loading="loading"
        v-model="address.zip_code"
        label="Cep"
        type="number"
        fill-mask
        mask="#####-###"
        lazy-rules
        :rules="[required]"
        outlined
      >
        <template v-slot:append>
          <q-btn
            unelevated
            round
            flat
            color="primary"
            icon="mdi-map-search-outline"
            @click="getAddressToZipCode(address.zip_code)"
          />
        </template>
      </q-input>
    </div>
    <div class="col-12">
      <q-input
        bg-color="white"
        ref="number"
        v-model="address.number"
        type="number"
        label="Numero"
        outlined
        lazy-rules
        :rules="[required]"
      />
    </div>
    <div class="col-12">
      <q-input
        v-model="address.complement"
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
        v-model="address.public_place"
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
        v-model="address.district"
        type="text"
        label="Bairro"
        bg-color="white"
        lazy-rules
        :rules="[required]"
        outlined
      />
    </div>
    <div class="col-9">
      <q-input
        v-model="address.city"
        type="text"
        label="Cidade"
        bg-color="white"
        lazy-rules
        :rules="[required]"
        outlined
      />
    </div>
    <div class="col-3">
      <q-input
        v-model="address.state"
        type="text"
        label="UF"
        bg-color="white"
        outlined
        lazy-rules
        :rules="[required]"
        maxlength="2"
      />
    </div>
  </q-card-section>
</template>

<script>
import axios from "axios";
export default {
  name: "FormAddress",
  data() {
    return {
      loading: false,
      address: {
        zip_code: null,
        number: null,
        complement: null,
        public_place: null,
        district: null,
        city: null,
        state: null,
      },
    };
  },
  methods: {
    async getAddressToZipCode(zip_code) {
      this.loading = true;
      try {
        const { data, status } = await axios.get(
          `https://viacep.com.br/ws/${zip_code}/json/`
        );
        if (status == 200) {
          this.address.district = data.bairro;
          this.address.complement = data.complemento;
          this.address.public_place = data.logradouro;
          this.address.city = data.localidade;
          this.address.state = data.uf;
          this.$refs.number.focus();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>