<template>
  <div class="stat-row">
    <div class="stat-card">
      <p class="stat-label">오늘 지출</p>
      <p class="stat-val" :class="balance >= 0 ? 'teal' : 'red'">
        <!-- {{ formatNum(balance) }} 원 -->
        {{ dayExpense }}
      </p>
    </div>
    <div class="stat-card">
      <p class="stat-label">이번 주 수입</p>
      <p class="stat-val blue">{{ weeklyInco }} 원</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">이번 주 지출</p>
      <p class="stat-val red">{{ weekly }} 원</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Home.vue 에서 데이터 받아요
const props = defineProps({
  monthlyIncome: Number,
  monthlyExpense: Number,
  balance: Number,
  weeklyExpense: Array,
  weeklyIncome: Array,
  dayExpense: Number,
});

const formatNum = (n) => n.toLocaleString("ko-KR");

const weekly = computed(() => {
  console.log(props.weeklyExpense)
  return props.weeklyExpense
    .map((week) => {
      return week.amount;
    })
    .reduce((acc, cur) => acc + cur, 0);
});
const weeklyInco = computed(() => {
  return props.weeklyIncome
    .map((week) => {
      return week.amount;
    })
    .reduce((acc, cur) => acc + cur, 0);
});

// console.log(weekly.value)
</script>

<style scoped>
.stat-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 26px;
  flex: 1;
  border: 1px solid #e5e8eb;
}
.stat-label {
  font-size: 17px;
  color: #8b95a1;
  margin-bottom: 8px;
}
.stat-val {
  font-size: 30px;
  font-weight: 700;
}
.blue {
  color: #3182f6;
}
.red {
  color: #f04452;
}
.teal {
  color: #00b493;
}
</style>
