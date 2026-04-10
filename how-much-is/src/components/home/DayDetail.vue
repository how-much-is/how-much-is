<template>
  <div class="day-detail">
    <!-- 날짜 클릭 안 했을 때 -->
    <p v-if="!selectedDate">날짜를 클릭하면 거래 내역이 표시돼요</p>

    <!-- 날짜 클릭 했을 때 -->
    <div v-if="selectedDate">
      <h3>거래 내역</h3>

      <!-- 거래 없을 때 -->
      <p v-if="transactions.length === 0">거래 내역이 없어요</p>

      <!-- 거래 목록 -->
      <div v-for="t in transactions" :key="t.id">
        <span>{{ t.name }}</span>
        <span>{{ formatNum(t.amount) }} 원</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Home.vue 에서 데이터 받아요
defineProps({
  selectedDate: String,
  transactions: Array,
});

const formatNum = (n) => n.toLocaleString('ko-KR');
</script>

<style scoped>
.day-detail {
  background: #fff;
  border-radius: 16px;
  padding: 24px 32px;
  margin-top: 16px;
  border: 1px solid #e5e8eb;
  min-height: 100px;
}
</style>
