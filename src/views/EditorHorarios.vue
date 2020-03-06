<template>
  <div>
    <v-container class="grey lighten-5">
      <v-row no-gutters style="height: 250px;">
        <v-col cols="4">
          <v-card class="pa-2" outlined tile>
            <h3>{{ this.selectedServicio }}</h3>
            <h4>Semana {{ this.selectedSemana }}</h4>
            <h4>Del {{firstDay}} al {{lastDay}}</h4>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card class="pa-2" outlined tile v-if="usuarios">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr v-for="(usuario) in usuarios" :key="usuario.nombre">
                    <td :class="usuario.color"><span  >{{ usuario.nombre }}</span></td>
                    <td>{{ usuario.disponibilidad }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>

        <v-col cols="4" md="4">
          <v-card class="pa-2" outlined tile>
            <v-btn text @click="editDisponibilidad()">Editar Disponibilidad</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="grey lighten-5">
      <v-row>
        <v-col cols="12" sm="3" md="4" v-for="(turno) in this.turnos" :key="turno.day">
          <v-card>
            <v-card-title class="subheading font-weight-bold">{{ turno.day }}</v-card-title>

            <v-divider></v-divider>

            <v-list dense>
                <!-- eslint-disable-next-line max-len -->
              <v-list-item name="hora.start" v-for="hora in turno.horarios" :key="hora.start" >
                <v-list-item-content>{{ hora.start }} - {{ hora.end}}</v-list-item-content>
                <v-list-item-content>{{ hora.assigned }}</v-list-item-content>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

const moment = require('moment');


export default {
  name: 'Home',
  components: {},
  created() {
    this.$store.dispatch('fetchUsuariosAction', 1).then((r) => {
      this.usuarios = r;
    });
    this.$store.dispatch('fetchTurnosAction', 1, this.selectedSemana).then((r) => {
      this.turnos = r;
    });

    // this.usuarios = this.allUsuarios;
    this.firstDay = moment().isoWeek(this.selectedSemana).day('Monday').format('YYYY-MM-DD');
    this.lastDay = moment().isoWeek(this.selectedSemana).day('Sunday').format('YYYY-MM-DD');
  },
  computed: {
    ...mapGetters(['selectedServicio', 'selectedSemana', 'allUsuarios']),
  },
  methods: {
    ...mapActions(['fetchUsuariosAction']),
    editDisponibilidad() {
    },
  },
  data() {
    return {
      usuarios: null,
      firstDay: null,
      lastDay: null,
      turnos: [],
      // turnos: [
      //   {
      //     day: 'Lunes',
      //     horarios: [
      //       {
      //         start: 10,
      //         end: 11,
      //         assigned: null,
      //       },
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Barbara',
      //       },
      //     ],
      //   },
      //   {
      //     day: 'Martes',
      //     horarios: [
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Ernesto',
      //       },
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Barbara',
      //       },
      //     ],
      //   },
      //   {
      //     day: 'Miercoles',
      //     horarios: [
      //       {
      //         start: 10,
      //         end: 11,
      //         assigned: null,
      //       },
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Barbara',
      //       },
      //     ],
      //   },
      //   {
      //     day: 'Jueves',
      //     horarios: [
      //       {
      //         start: 10,
      //         end: 11,
      //         assigned: null,
      //       },
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Barbara',
      //       },
      //     ],
      //   },
      //   {
      //     day: 'Viernes',
      //     horarios: [
      //       {
      //         start: 10,
      //         end: 11,
      //         assigned: null,
      //       },
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Barbara',
      //       },
      //     ],
      //   },
      //   {
      //     day: 'Sabado',
      //     horarios: [
      //       {
      //         start: 10,
      //         end: 11,
      //         assigned: null,
      //       },
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Barbara',
      //       },
      //     ],
      //   },
      //   {
      //     day: 'Domingo',
      //     horarios: [
      //       {
      //         start: 10,
      //         end: 11,
      //         assigned: null,
      //       },
      //       {
      //         start: 11,
      //         end: 12,
      //         assigned: 'Barbara',
      //       },
      //     ],
      //   },
      // ],
    };
  },
};
</script>
