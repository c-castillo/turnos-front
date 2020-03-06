import Vue from 'vue';
import Vuex from 'vuex';


import servicios from '@/store/modules/servicios';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    servicios,
  },
  state: {},
  mutations: {},
  actions: {},
});
