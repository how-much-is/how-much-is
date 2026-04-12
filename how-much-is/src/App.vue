<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
  <!-- <LoginForm />
  <RegisterForm /> -->
</template>

<script setup>
import Header from './components/Header.vue';
import LoginForm from './components/login/LoginForm.vue';

import RegisterForm from './components/login/RegisterForm.vue';
</script>

<style scoped></style>
