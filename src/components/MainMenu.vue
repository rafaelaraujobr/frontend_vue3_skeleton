<template>
  <q-scroll-area :style="`height: ${$q.screen.height - 80}px`">
    <q-input
      v-if="!miniState"
      v-model="filter"
      type="text"
      placeholder="Buscar..."
      outlined
      debounce="300"
      dense
      class="q-mx-md q-mt-md"
      ><template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-table
      flat
      :rows="listMenu"
      row-key="label"
      class="bg-transparent"
      grid
      :filter="filter"
      :pagination="{ rowsPerPage: 0 }"
      hide-pagination
    >
      <template v-slot:item="props">
        <div class="col-12">
          <q-item
            v-if="
              props.row.children &&
              props.row.children.length == 0 &&
              props.row.type == 'internal'
            "
            :to="props.row.path"
            clickable
            v-ripple
            :active="$route.path === props.row.path"
            active-class="active"
          >
            <q-item-section side>
              <q-icon :name="props.row.icon" color="grey-6" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">{{
                props.row.label
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-else-if="
              props.row.children &&
              props.row.children.length == 0 &&
              props.row.type == 'external'
            "
            tag="a"
            target="_blank"
            :href="props.row.path"
            clickable
            v-ripple
          >
            <q-item-section side>
              <q-icon :name="props.row.icon" color="grey-6" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">{{
                props.row.label
              }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item-label
            header
            class="text-grey-6 text-weight-medium text-body1"
            v-else-if="props.row.type == 'header'"
          >
            {{ props.row.label }}</q-item-label
          >
        </div>
      </template>
    </q-table>
  </q-scroll-area>
</template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {
      filter: "",
      listMenu: [
        {
          label: "Header",
          type: "header",
          path: "",
          icon: "",
          caption: "",
          children: [],
        },
        {
          label: "Home",
          type: "internal",
          path: "/",
          icon: "mdi-home",
          caption: "",
          children: [],
        },
        {
          label: "SignIn",
          type: "internal",
          path: "/signin",
          icon: "mdi-home",
          caption: "",
          children: [],
        },
        {
          label: "SignUp",
          type: "internal",
          path: "/signup",
          icon: "mdi-home",
          caption: "",
          children: [],
        },
        {
          label: "About",
          type: "internal",
          path: "/about",
          icon: "mdi-information-outline",
          caption: "",
          children: [],
        },
        {
          label: "Google",
          type: "external",
          path: "https://google.com.br",
          icon: "mdi-google",
          caption: "Maior buscador",
          children: [],
        },
      ],
    };
  },
};
</script>

<style>
</style>