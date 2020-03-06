import ApiHelper from '@/services/ApiHelper';

export default {

  state: {
    servicios: [],
    selectedServicio: null,
    selectedSemana: null,
    usuarios: [],
    turnos: [],
  },

  actions: {
    fetchAllServiciosAction({ commit }) {
      return new Promise((resolve, reject) => {
        ApiHelper.getServicios()
          .then((response) => {
            commit('fetchAllServiciosMutation', response);
            resolve(response);
          })
          .catch((error) => {
            commit('failureServiciosMutation');
            reject(error);
          });
      });
    },

    fetchUsuariosAction({ commit }, servicioId) {
      return new Promise((resolve, reject) => {
        ApiHelper.getUsuarios(servicioId)
          .then((response) => {
            commit('fetchUsuariosMutation', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchTurnosAction({ commit }, { servicioId, semana }) {
      return new Promise((resolve, reject) => {
        ApiHelper.getTurnos(servicioId, semana)
          .then((response) => {
            commit('fetchTurnosMutation', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    selectServicioAction({ commit }, formData) {
      commit('saveSelectedServicioMutation', formData);
    },

    saveServicioAction({ commit }, servicioData) {
      return new Promise((resolve, reject) => {
        ApiHelper.servicio(servicioData)
          .then((response) => {
            commit('saveServicioMutation', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    updateServicioAction({ commit }, servicio) {
      return new Promise((resolve, reject) => {
        ApiHelper.updateServicio(servicio)
          .then((response) => {
            commit('updateServicioMutation', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    cambiarServicioAction({ commit }) {
      commit('cambiarServicioMutation');
    },
  },

  mutations: {
    fetchAllServiciosMutation(state, servicios) {
      state.servicios = servicios;
    },

    fetchUsuariosMutation(state, usuarios) {
      state.usuarios = usuarios;
    },

    fetchTurnosMutation(state, turnos) {
      state.turnos = turnos;
    },

    failureServiciosMutation(state) {
      state.servicios = [];
    },

    saveServicioMutation(state, servicio) {
      state.servicios = [...state.servicios, servicio];
    },

    updateServicioMutation(state, servicio) {
      const index = state.servicios.findIndex((element) => element.id === servicio.id);
      state.servicios[index] = servicio;
    },

    saveSelectedServicioMutation(state, formData) {
      const index = state.servicios.findIndex((element) => element.id === formData.servicioId);
      state.selectedServicio = state.servicios[index];
      state.selectedSemana = formData.semana;
    },

    cambiarServicioMutation(state) {
      state.selectedServicio = null;
      state.selectedSemana = null;
      state.usuarios = [];
      state.turnos = [];
    },


  },

  getters: {
    allServicios: (state) => state.servicios.sort((a, b) => b.id - a.id),
    isServicioSelected: (state) => !!state.selectedServicio,
    selectedServicio: (state) => state.selectedServicio,
    selectedSemana: (state) => state.selectedSemana,
    allUsuarios: (state) => state.usuarios,
  },
};
