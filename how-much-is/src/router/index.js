import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Monthly from '@/pages/Monthly.vue';
import Statistics from '@/pages/Statistics.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/monthly', component: Monthly },
    { path: '/statistics', component: Statistics },
  ],
});

export default router;