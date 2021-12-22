<template>
  <q-page padding>
    <q-card flat>
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" :ratio="21 / 9">
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
          </div>
        </template>
        <q-btn
          color="primary"
          icon="edit"
          dense
          round
          @click="onClick"
          class="absolute"
          style="top: 25px; right: 10px; transform: translateY(-50%)"
      /></q-img>
      <q-card-section>
        <q-avatar
          size="100px"
          font-size="52px"
          color="teal"
          text-color="white"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        >
          <q-img src="https://cdn.quasar.dev/img/mountains.jpg" :ratio="1 / 1">
            <template v-slot:error>
              <div
                class="absolute-full flex flex-center bg-negative text-white"
              >
                Cannot load image
              </div>
            </template>
          </q-img>
          <q-btn
            color="primary"
            icon="edit"
            dense
            round
            @click="onClick"
            class="absolute"
            style="bottom: -17px; right: 0; transform: translateY(-50%)"
          />
        </q-avatar>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "StoreProfilePage",
};
</script>
