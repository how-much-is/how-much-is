<template>
  <div>
    <router-link to="/">Home</router-link>
    <br />
    <router-link to="/monthly">Monthly</router-link>

    <router-view></router-view>
  </div>
<<<<<<< HEAD
  <Header />
</template>

<script setup>
import Header from './components/Header.vue';
=======
</template>

<script setup>
import MonthlyList from './components/monthly/MonthlyList.vue';
>>>>>>> efd047c7286b8b9274ecea7417ff07f04c367a1f
</script>

<style scoped></style>
