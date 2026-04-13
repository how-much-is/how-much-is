<template>
  <div class="stat-row">
    <div class="stat-card">
      <div class="card-header">
        <p class="stat-label">오늘 지출</p>
        <div class="icon-box expense-icon">💸</div>
      </div>
      <p class="stat-val">
        {{ formatNum(dayExpense) }} <span class="unit">원</span>
      </p>
    </div>
    <div class="stat-card">
      <div class="card-header">
        <p class="stat-label">이번 주 수입</p>
        <div class="icon-box income-icon">💰</div>
      </div>
      <p class="stat-val">
        {{ formatNum(weeklyInco) }} <span class="unit">원</span>
      </p>
    </div>
    <div class="stat-card">
      <div class="card-header">
        <p class="stat-label">이번 주 지출</p>
        <div class="icon-box expense-icon">💳</div>
      </div>
      <p class="stat-val">
        {{ formatNum(weekly) }} <span class="unit">원</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  monthlyIncome: Number,
  monthlyExpense: Number,
  balance: Number,
  weeklyExpense: Array,
  weeklyIncome: Array,
  dayExpense: Number,
});

const formatNum = (n) => n?.toLocaleString('ko-KR') || 0;

const weekly = computed(() => {
  return (
    props.weeklyExpense
      ?.map((week) => week.amount)
      .reduce((acc, cur) => acc + cur, 0) || 0
  );
});
const weeklyInco = computed(() => {
  return (
    props.weeklyIncome
      ?.map((week) => week.amount)
      .reduce((acc, cur) => acc + cur, 0) || 0
  );
});
</script>

<style scoped>
.stat-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 0;
}

.stat-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f3f5;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.stat-label {
  font-size: 15px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
}

.icon-box {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.income-icon {
  background-color: #fde047;
  color: #854f0b;
}

.expense-icon {
  background-color: #f1f3f5;
  color: #64748b;
}

.stat-val {
  font-size: 26px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}
.unit {
  font-size: 16px;
  font-weight: 500;
  color: #9ca3af;
}
</style>
