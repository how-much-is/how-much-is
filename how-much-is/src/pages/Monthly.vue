<template>
  <div class="container">
    <div class="box">
      <MonthlyChart />
      <div class="box-in">
        <MonthlyIncome />
        <MonthlyExpense />
      </div>
    </div>
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
.container {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: 0 auto;
}
.box {
  display: flex;
  justify-content: center;
}
.box-in {
  display: flex;
  flex-direction: column;
}
</style>
