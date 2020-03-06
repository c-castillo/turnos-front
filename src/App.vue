<template>
  <v-app>
    <v-content>
      <NavBar />
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  computed: {
    ...mapGetters(['isServicioSelected']),
  },

  data: () => ({
    //
  }),
  created() {
    if (!this.isServicioSelected) {
      // this.$router.push('/');
    } else {
      this.$router.push('/editHorarios');
    }
  },

};
</script>
