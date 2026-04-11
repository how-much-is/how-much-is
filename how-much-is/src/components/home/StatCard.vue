<template>
  <div class="stat-row">
    <div class="stat-card">
      <p class="stat-label">4월 수입</p>
      <p class="stat-val blue">{{ formatNum(monthlyIncome) }} 원</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">4월 지출</p>
      <p class="stat-val red">{{ formatNum(monthlyExpense) }} 원</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">잔액</p>
      <p class="stat-val" :class="balance >= 0 ? 'teal' : 'red'">
        {{ formatNum(balance) }} 원
      </p>
    </div>
  </div>
</template>

<script setup>
// Home.vue 에서 데이터 받아요
defineProps({
  monthlyIncome: Number,
  monthlyExpense: Number,
  balance: Number,
});

const formatNum = (n) => (n ?? 0).toLocaleString('ko-KR');
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
