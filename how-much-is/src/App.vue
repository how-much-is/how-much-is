<template>
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script setup>
import MonthlyList from './components/monthly/MonthlyList.vue';
import Header from './components/Header.vue';
</script>

<style scoped></style>
