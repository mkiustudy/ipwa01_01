import { createRouter, createWebHistory } from 'vue-router';
import PageResult from '../views/PageResult.vue'
import MainPage from '../views/MainPage.vue'
import PageTablet from '../views/PageTablet.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:index?',
      name: 'MainPage',
      component: MainPage,
      props: true // Aktiviert das Übergeben von Props
    },
    {
      path: '/tablet',
      name: 'TabletPage',
      component: PageTablet,
      props: true // Aktiviert das Übergeben von Props
    },
    {
      path: '/result',
      name: 'result',
      component: PageResult,
      props: true // Aktiviert das Übergeben von Props
    },
    {
      path: '/impressum',
      name: 'ImpressumPage', 
      component: MainPage,
      props: true // Aktiviert das Übergeben von Props
    },
    {
      path: '/datenschutz',
      name: 'DatenschutzPage', 
      component: MainPage,
      props: true // Aktiviert das Übergeben von Props
    }
  ]
});

export default router