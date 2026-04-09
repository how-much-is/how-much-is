<template>
  <div>
    <router-link to="/">Home</router-link>
    <br />
    <router-link to="/monthly">Monthly</router-link>

    <router-view></router-view>
  </div>
  <Header />
</template>

<script setup>
import Header from './components/Header.vue';
</script>

<style scoped></style>
