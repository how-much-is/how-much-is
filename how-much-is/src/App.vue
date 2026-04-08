<<<<<<< HEAD
<script setup>
import userSetting from './pages/userSettings.vue';
</script>

<template>
  <div>
    <userSetting></userSetting>
  </div>
=======
<template>
 <div>

  <router-link to="/">Home</router-link>
  <br>
  <router-link to="/monthly">Monthly</router-link>

  <router-view></router-view>
 </div>
>>>>>>> 00be46bf0e8ce54fbd2c6a6a2b36b1e0049298c6
</template>

<script setup>
import MonthlyList from './components/monthly/MonthlyList.vue';



</script>



<style scoped></style>
