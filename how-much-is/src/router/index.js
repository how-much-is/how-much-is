import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Monthly from '@/pages/Monthly.vue';
import Settings from '@/pages/Settings.vue';
import LoginForm from '@/components/login/LoginForm.vue';
import RegisterForm from '@/components/login/RegisterForm.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Transaction from '@/pages/Transaction.vue';
import Category from '@/pages/Category.vue';
import { useLoginStore } from '@/stores/login';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/category', component: Category },
    { path: '/monthly', component: Monthly },
    { path: '/transaction', component: Transaction },
    { path: '/settings', component: Settings },
    { path: '/loginform', component: LoginForm },
    { path: '/registerform', component: RegisterForm },
  ],
});

// router.beforeEach((to, from, next) => {
//   const loginStore = useLoginStore();

//   if (to.path === '/') {
//     if (loginStore.isLogged) {
//       next();
//     } else {
//       // alert('로그인이 필요한 서비스입니다.');
//       next('/loginform');
//     }
//   } else {
//     next();
//   }
// });

export default router;
