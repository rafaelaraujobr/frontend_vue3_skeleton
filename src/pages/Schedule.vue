<template>
  <q-page padding>
    <!-- <q-calendar ref="calendar" v-model="selectedDate" /> -->
    <q-date
      flat
      bordered
      v-model="date"
      :events="events.map((item) => item.date)"
      event-color="orange"
      class="full-width"
      color="grey-3"
      text-color="dark"
    />
    <q-dialog v-model="dialog" persistent :full-width="$q.platform.is.mobile">
      <q-card>
        <q-toolbar class="text-dark">
          <q-toolbar-title>{{ parseDate(date) }} </q-toolbar-title>
          <q-btn flat round dense icon="mdi-close" @click="dialog = false" />
        </q-toolbar>
        <q-tab-panels v-model="date">
          <q-tab-panel
            class="q-px-none"
            v-for="(item, index) in events"
            :key="index"
            :name="item.date"
          >
            <q-list>
              <q-item>
                <q-item-section top side>
                  <q-avatar
                    color="primary"
                    text-color="white"
                    icon="bluetooth"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption lines="2"
                    >Secondary line text.</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>5 min</q-item-label>
                  <q-chip
                    icon="mdi-check"
                    label="Concluido"
                    color="positive"
                    text-color="white"
                    dense
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section top side>
                  <q-avatar
                    color="primary"
                    text-color="white"
                    icon="bluetooth"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Single line item</q-item-label>
                  <q-item-label caption lines="2"
                    >Secondary line text.</q-item-label
                  >
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>5 min ago</q-item-label>
                  <q-icon name="star" color="yellow" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date } from "quasar";
export default {
  name: "SchedulePage",
  data() {
    return {
      dialog: false,
      date: null,
      selectedDate: "",
      events: [
        { date: "2021/12/01" },
        { date: "2021/12/05" },
        { date: "2021/12/06" },
      ],
    };
  },
  methods: {
    teste() {
      console.log("test");
    },
    parseDate(value) {
      return date.formatDate(value, "DD/MM/YYYY");
    },
  },
  watch: {
    date() {
      if (this.events.find((item) => item.date == this.date))
        this.dialog = true;
      console.log(this.date);
    },
  },
  created() {
    this.date = date.formatDate(new Date(), "YYYY/MM/DD");
    console.log(this.date);
  },
};
</script>
