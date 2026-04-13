<template>
  <div class="day-detail">
    <div v-if="!selectedDate" class="empty-state">
      <p>날짜를 클릭하면 거래 내역이 표시돼요</p>
    </div>

    <div v-if="selectedDate">
      <div class="list-header">
        <h3 class="title">거래 내역</h3>
      </div>

      <div v-if="transactions.length === 0" class="empty-state">
        <p>이 날은 거래 내역이 없어요</p>
      </div>

      <div class="transaction-list" v-else>
        <div v-for="t in transactions" :key="t.id" class="transaction-item">
          <div class="t-left">
            <span class="t-name">{{ t.title || t.name }}</span>
          </div>
          <div class="t-right">
            <span
              class="t-amount"
              :class="t.type === 'income' ? 'income' : 'expense'"
            >
              {{ formatNum(t.amount) }}원
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedDate: String,
  transactions: Array,
});

const formatNum = (n) => n?.toLocaleString('ko-KR') || 0;
</script>

<style scoped>
.day-detail {
  position: relative;
  background: #fff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.day-detail::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #fde047;
}

.list-header {
  margin-bottom: 20px;
}
.title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.empty-state {
  text-align: center;
  color: #9ca3af;
  padding: 30px 0;
  font-size: 15px;
}

.transaction-list {
  display: flex;
  flex-direction: column;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;
}

.transaction-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.t-name {
  font-weight: 500;
  color: #374151;
  font-size: 15px;
}
.t-amount {
  font-weight: 600;
  color: #111827;
  font-size: 15px;
}
.income {
  color: #3182f6; /* 파란색 */
}
.expense {
  color: #f04452; /* 빨간색 */
}
</style>
