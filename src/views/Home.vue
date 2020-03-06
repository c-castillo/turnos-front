<template>
    <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Seleccionar servicio</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
          <v-select
              :items="servicios()"
              label="Servicio"
              v-model="servicio"
            ></v-select>
          <v-select
              :items="semanas"
              :value="currentWeek()"
              label="Semana"
              v-model="semana"
            ></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="selectServicio">Seleccionar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapGetters(['allServicios']),
  },
  methods: {
    ...mapActions(['fetchAllServiciosAction', 'selectServicioAction']),
    selectServicio() {
      const servicioData = {
        servicio: this.servicio,
        semana: this.semana,
      };
      this.selectServicioAction(servicioData)
        .then(() => {
          this.$router.push('/editHorarios');
        })
        .catch(() => {
          this.$router.push('/');
        });
    },
    currentWeek() {
      const d = new Date(+Date.now());
      d.setHours(0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
    },
    servicios() {
      if (this.allServicios.length === 0) {
        this.fetchAllServiciosAction();
      }
      return this.allServicios.map((s) => s.nombre);
    },
  },
  data() {
    return {
      servicio: null,
      semana: null,
      semanas: Array.from(new Array(6), (x, i) => i + this.currentWeek()),
    };
  },
};
</script>
