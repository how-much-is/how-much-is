<template>
  <div class="report-container">
    <div class="report-header-nav">
      <button @click="store.moveMonth(-1)" class="nav-btn">&lt;</button>
      <h1 class="month-title">{{ store.formattedDate }}</h1>
      <button @click="store.moveMonth(1)" class="nav-btn">&gt;</button>
    </div>

    <div class="dashboard-wrapper">
      <div v-if="monthlyTransactions.length === 0" class="no-data">
        <p>해당 월의 지출 내역이 없습니다. 💸</p>
      </div>

      <template v-else>
        <div class="chart-box">
          <PieChart :chartData="chartData" />
        </div>
        <div class="summary-box">
          <CategorySummary
            :summaryList="summaryList"
            :totalExpense="totalExpense"
            :animate="animate"
          />
        </div>
      </template>
    </div>
    <!-- <div style="background: #eee; padding: 10px; margin: 20px 0">
      <p>현재 스토어 날짜: {{ selectedMonth }}</p>
      <p>전체 거래 데이터 개수: {{ transactions.length }}개</p>
      <p>이번 달 거래 데이터 개수: {{ monthlyTransactions.length }}개</p>
    </div> -->
  </div>
</template>

<script setup>
import PieChart from '@/components/PieChart.vue';
import CategorySummary from '@/components/CategorySummary.vue';
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import axios from 'axios';
import { useDatePickerStore } from '@/stores/datepicker';

const store = useDatePickerStore();
const transactions = ref([]);
const categories = ref([]);
const animate = ref(false);

// 필터링 기준이 되는 스토어의 날짜
const selectedMonth = computed(() => store.currentDate);

onMounted(async () => {
  const [tRes, cRes] = await Promise.all([
    axios.get('http://localhost:3000/transactions'),
    axios.get('http://localhost:3000/categories'),
  ]);
  transactions.value = tRes.data;
  categories.value = cRes.data.filter((t) => t.type == 'expense');

  await nextTick();
  setTimeout(() => {
    animate.value = true;
  }, 50);
});

// 날짜 변경 시 애니메이션 재작동
watch(selectedMonth, async () => {
  animate.value = false;
  await nextTick();
  setTimeout(() => {
    animate.value = true;
  }, 50);
});

// 현재 선택된 월의 지출 데이터만 필터링
const monthlyTransactions = computed(() => {
  console.log('selectedMonth:', selectedMonth.value);
  console.log('sample transaction:', transactions.value[0]);

  return transactions.value.filter((t) => {
    return t.date.startsWith(selectedMonth.value) && Number(t.categoryId) <= 5;
  });
});

// 카테고리별 합계 계산
const countCategory = computed(() => {
  const count = {};

  monthlyTransactions.value.forEach((t) => {
    const id = String(t.categoryId);

    if (count[id] === undefined) {
      count[id] = 0;
    }
    count[id] += Number(t.amount); // 금액도 숫자로 변환
  });

  console.log('계산된 카테고리별 통계:', count); // 브라우저 콘솔 확인용
  return count;
});

const totalExpense = computed(() => {
  return Object.values(countCategory.value).reduce((sum, val) => sum + val, 0);
});

// 차트 데이터 변환
const chartData = computed(() => {
  const labels = [];
  const data = [];

  for (let id in countCategory.value) {
    const category = categories.value.find((c) => Number(c.id) === Number(id));
    if (category) {
      labels.push(category.name);
      data.push(countCategory.value[id]);
    }
  }

  return {
    labels,
    datasets: [
      {
        label: '지출 금액',
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };
});

// 요약 리스트 변환
const summaryList = computed(() => {
  if (!chartData.value.labels.length) return [];
  return chartData.value.labels.map((label, i) => ({
    name: label,
    amount: chartData.value.datasets[0].data[i],
    color: chartData.value.datasets[0].backgroundColor[i],
    percent: Math.round(
      (chartData.value.datasets[0].data[i] / totalExpense.value) * 100,
    ),
  }));
});
</script>

<style scoped>
/* 버튼 인터페이스 스타일 */
.report-header-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.month-title {
  font-size: 28px;
  font-weight: bold;
  min-width: 200px;
  text-align: center;
}

.nav-btn {
  padding: 8px 16px;
  font-size: 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover {
  background: #f8f9fa;
  border-color: #36a2eb;
  color: #36a2eb;
}

.no-data {
  width: 100%;
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #888;
}

/* 기존 대시보드 스타일 유지 */
.dashboard-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 32px;
}
.chart-box {
  flex: 1.2;
  min-width: 0;
  min-height: 400px;
}
.summary-box {
  flex: 1;
}

@media (max-width: 768px) {
  .dashboard-wrapper {
    flex-direction: column;
  }
}
</style>
