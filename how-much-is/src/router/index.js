import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Monthly from '@/pages/Monthly.vue';
import Settings from '@/pages/Settings.vue';
import LoginForm from '@/components/login/LoginForm.vue';
import RegisterForm from '@/components/login/RegisterForm.vue';
import { createRouter, createWebHistory } from 'vue-router';
<<<<<<< HEAD
import { useLoginStore } from '@/stores/login';
=======
import Transaction from '@/pages/Transaction.vue';
>>>>>>> 745f833c88c6d89608520f039a52c10581b956e9

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/monthly', component: Monthly },
    { path: '/transaction', component: Transaction },
    { path: '/settings', component: Settings },
    { path: '/loginform', component: LoginForm },
    { path: '/registerform', component: RegisterForm },
  ],
});

export default router;
