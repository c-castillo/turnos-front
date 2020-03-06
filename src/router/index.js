import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import EditorHorarios from '../views/EditorHorarios.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/editHorarios',
    name: 'EditarHorarios',
    component: EditorHorarios,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
