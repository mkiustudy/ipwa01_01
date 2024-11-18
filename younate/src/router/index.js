import { createRouter, createWebHistory } from 'vue-router';
import ResultPage from '../views/ResultPage.vue'
import MainPage from '../views/MainPage.vue'
import TabletPage from '../views/TabletPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:index?',
      name: 'MainPage',
      component: MainPage,
      props: true
    },
    {
      path: '/tablet',
      name: 'TabletPage',
      component: TabletPage,
      props: true
    },
    {
      path: '/result',
      name: 'result',
      component: ResultPage,
      props: true // Aktiviert das Übergeben von Props
    },
    {
      path: '/impressum',
      name: 'ImpressumPage', 
      component: MainPage,
      props: true
    },
    {
      path: '/datenschutz',
      name: 'DatenschutzPage', 
      component: MainPage,
      props: true
    }
  ]
});

export default router