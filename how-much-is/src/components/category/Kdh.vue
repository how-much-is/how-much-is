<template>
  <div class="card">
    <div class="title">2024년 5월</div>
    <div class="subtitle">월별 지출 퍼센트</div>
    <div class="chart-wrap">
      <div class="donut-container">
        <canvas ref="chartRef"></canvas>
        <div class="donut-center">
          <div class="label">총 지출</div>
          <div class="amount">200만원</div>
        </div>
      </div>
      <div class="legend">
        <div v-for="item in items" :key="item.label" class="legend-item">
          <span class="legend-dot" :style="{ background: item.color }"></span>
          <span>{{ item.label }} {{ item.amount }}만원</span>
          <span class="legend-pct">({{ pct(item.amount) }}%)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const chartRef = ref(null);
let chartInstance = null;

const items = [
  { label: '식비', amount: 60, color: '#E24B4A' },
  { label: '숙박비', amount: 40, color: '#378ADD' },
  { label: '쇼핑', amount: 36, color: '#1D9E75' },
  { label: '교통/항공', amount: 34, color: '#BA7517' },
  { label: '일상 지출', amount: 30, color: '#7F77DD' },
];

const total = items.reduce((s, i) => s + i.amount, 0);
const pct = (amount) => Math.round((amount / total) * 100);

onMounted(() => {
  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: items.map((i) => i.label),
      datasets: [
        {
          data: items.map((i) => i.amount),
          backgroundColor: items.map((i) => i.color),
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${ctx.label}: ${ctx.raw}만원 (${pct(ctx.raw)}%)`,
          },
        },
      },
    },
  });
});

onBeforeUnmount(() => {
  chartInstance?.destroy();
});
</script>

<style scoped>
.card {
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  max-width: 640px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: #111;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #888;
  margin-bottom: 2rem;
}

.chart-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.donut-container {
  position: relative;
  width: 260px;
  height: 260px;
  flex-shrink: 0;
}

.donut-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.donut-center .label {
  font-size: 13px;
  color: #999;
}

.donut-center .amount {
  font-size: 20px;
  font-weight: 700;
  color: #111;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #222;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-pct {
  margin-left: auto;
  font-size: 13px;
  color: #999;
}
</style>