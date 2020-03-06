<template>
  <div>
    <v-toolbar dark>
        <v-toolbar-title
          @click="redirectToHome">MaaS: Monitoring as a service
        </v-toolbar-title>

      <div class="flex-grow-1"></div>
      <v-toolbar-items>
      </v-toolbar-items>
      <v-toolbar-items v-if="isServicioSelected">
        <v-btn text
        @click="cambiarServicio()"
        >Cambiar Servicio</v-btn>
      </v-toolbar-items>

      <v-toolbar-items v-else>
       <v-btn text @click="redirectToAdd">Agregar Servicio</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters(['isServicioSelected']),
  },
  methods: {
    ...mapActions(['cambiarServicioAction']),
    redirectToHome() {
      this.$router.push('/');
    },
    redirectToAdd() {
      this.$router.push('/agregarServicio');
    },
    cambiarServicio() {
      this.cambiarServicioAction();
      this.redirectToHome();
    },
  },
  data() {
    return {};
  },
};
</script>
