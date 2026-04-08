<template>
  <div>
    <router-link to="/">Home</router-link>
    <br />
    <router-link to="/monthly">Monthly</router-link>

    <router-view></router-view>
  </div>
</template>

<script setup>
import MonthlyList from './components/monthly/MonthlyList.vue';
</script>

<style scoped></style>
