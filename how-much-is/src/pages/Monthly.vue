<template>
  <div class="container">
    <div class="box">
      <MonthlyChart class="chart-area" />

      <div class="box-in">
        <MonthlyIncome class="report-card" />
        <MonthlyExpense class="report-card" />
      </div>
    </div>
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
  margin: 40px auto;
}

.box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 30px;
  width: 100%;
}

.chart-area {
  flex: 2;
}

.box-in {
  display: flex;

  flex-direction: column;
}
</style>
