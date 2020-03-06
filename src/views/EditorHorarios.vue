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
                    <td :class="usuario.color"><span>{{ usuario.nombre }}</span></td>
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
        <v-col cols="12" sm="3" md="4" v-for="(turno) in this.turnos" :key="turno.dia_completo">
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              {{ turno[0].dia_completo  }}
              </v-card-title>

            <v-divider></v-divider>

            <v-list dense>
                <!-- eslint-disable-next-line max-len -->
              <v-list-item name="hora.inicio" v-for="hora in turno" :key="hora.start" >
                <v-list-item-content>{{ hora.inicio }}:00 - {{ hora.fin}}:00</v-list-item-content>
                <v-list-item-content :class="getUserColor(hora.usuario_id)">
                  {{ getUserName(hora.usuario_id) }}
                  </v-list-item-content>
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
    this.$store.dispatch('fetchTurnosAction', { servicioId: 1, semana: this.selectedSemana }).then((r) => {
      this.formatTurnos(r);
    });

    this.firstDay = moment().isoWeek(this.selectedSemana).day('Monday').format('YYYY-MM-DD');
    this.lastDay = moment().isoWeek(this.selectedSemana).day('Sunday').format('YYYY-MM-DD');
  },
  computed: {
    ...mapGetters(['selectedServicio', 'selectedSemana', 'allUsuarios']),
  },
  methods: {
    ...mapActions(['fetchUsuariosAction', 'fetchTurnosAction']),
    editDisponibilidad() {
    },
    formatTurnos(turnos) {
      const grouped = Object.create(null);

      turnos.forEach((a) => {
        grouped[a.dia_completo] = grouped[a.dia_completo] || [];
        grouped[a.dia_completo].push(a);
      });
      this.turnos = grouped;
    },
    getUserName(id) {
      const usuario = this.usuarios.find((u) => u.id === id);
      if (usuario && usuario.nombre) {
        return usuario.nombre;
      }
      return 'Sin asignar';
    },
    getUserColor(id) {
      const usuario = this.usuarios.find((u) => u.id === id);
      if (usuario && usuario.color) {
        return usuario.color;
      }
      return '';
    },
  },
  data() {
    return {
      usuarios: null,
      firstDay: null,
      lastDay: null,
      turnos: null,
    };
  },
};
</script>
