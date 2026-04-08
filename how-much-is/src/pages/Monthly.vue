<template>
  <div>
    안녕하세요
    <MonthlyChart />
    <MonthlyIncome />
    <MonthlyExpense />
    <MonthlyList />
  </div>
</template>

<script setup>
import MonthlyList from '@/components/monthly//MonthlyList.vue';
import MonthlyChart from '@/components/monthly/MonthlyChart.vue';
import MonthlyExpense from '@/components/monthly/MonthlyExpense.vue';
import MonthlyIncome from '@/components/monthly/MonthlyIncome.vue';


</script>

<style scoped>
</style>