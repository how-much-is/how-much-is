<template>
  <div>
    <!-- 수입/지출/잔액 카드 -->
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

    <!-- 캘린더 -->
    <VCalendar :attributes="attrs" v-model="selectedDate" />
    <p>선택한 날짜: {{ selectedDate }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const selectedDate = ref(null);
const transactions = ref([
  { date: '2026-04-01', amount: -12000, name: '점심' },
  { date: '2026-04-02', amount: -8500, name: '교통' },
  { date: '2026-04-03', amount: -23000, name: '저녁' },
  { date: '2026-04-08', amount: -15000, name: '배달' },
]);
const attrs = computed(() =>
  transactions.value.map((t) => ({
    dates: new Date(t.date),
    dot: true,
    popover: { label: `${t.name} ${t.amount.toLocaleString()}원` },
  })),
);
//월별 수입 합계
const monthlyIncome = computed(() =>
  transactions.value
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

//월별 지출 합계
const monthlyExpense = computed(() =>
  transactions.value
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

//잔액 = 수입 + 지출
const balance = computed(() => monthlyIncome.value + monthlyExpense.value);

const formatNum = (n) => n.toLocaleString('ko-KR');

// 모달 열기/닫기 상태
const showModal = ref(false);
const opneModal = () => (showModal.value = true);
const closeModael = () => (showModal.value = false);
</script>

<style scoped>
/* 카드 3개 가로 배치 */
.stat-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

/* 카드 디자인 */
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 28px;
  flex: 1;
}

/* 라벨 (작은 글씨) */
.stat-label {
  font-size: 13px;
  color: #8b95a1;
  margin-bottom: 8px;
}

/* 숫자 */
.stat-val {
  font-size: 26px;
  font-weight: 700;
}

/* 색상 */
.blue {
  color: #3182f6;
}
.red {
  color: #f04452;
}
.teal {
  color: #00b493;
}
/* 캘린더 크기 조절 */
:deep(.vc-container) {
  width: 100% !important;
  max-width: 100% !important;
}

:deep(.vc-weeks) {
  padding: 0 16px;
}

:deep(.vc-day) {
  min-height: 80px; /* 날짜 칸 높이 */
  padding: 8px;
}

:deep(.vc-day-content) {
  font-size: 16px; /* 날짜 숫자 크기 */
  font-weight: 600;
}

:deep(.vc-header) {
  padding: 16px;
  font-size: 18px; /* 년월 글씨 크기 */
}
/* 헤더 년월 위치 고정 */
:deep(.vc-title) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

:deep(.vc-header) {
  position: relative;
  padding: 16px 0 24px;
}
</style>
