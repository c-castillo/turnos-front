import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_RAILS_API_URL;

export default {
  async getServicios() {
    const response = await axios.get('servicios');
    return response.data;
  },

  async getUsuarios(servicioId) {
    const response = await axios.get(`servicios/${servicioId}/usuarios`);
    return response.data;
  },

  async getTurnos(servicioId, semana) {
    const response = await axios.get(`servicios/${servicioId}/turnos?semana=${semana}`);
    return response.data;
  },

  async addServicio(servicioData) {
    const response = await axios.post('servicios', servicioData);
    return response.data;
  },

  async addHorario(horarioData) {
    const response = await axios.post('horarios', horarioData);
    return response.data;
  },

};
