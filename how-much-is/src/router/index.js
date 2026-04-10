import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Monthly from '@/pages/Monthly.vue';
import Settings from '@/pages/Settings.vue';
import Statistics from '@/pages/Statistics.vue';
import LoginForm from '@/components/login/LoginForm.vue';
import RegisterForm from '@/components/login/RegisterForm.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useLoginStore } from '@/stores/login';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/monthly', component: Monthly },
    { path: '/statistics', component: Statistics },
    { path: '/settings', component: Settings },
    { path: '/loginform', component: LoginForm },
    { path: '/registerform', component: RegisterForm },
  ],
});

export default router;
