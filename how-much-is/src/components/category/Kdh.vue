<template>
  <div class="page" @click="closeDropdown">
    <div class="card">
      <div class="header">
        <div class="header-left">
          <div class="title-row">
            <div class="title">{{ selectedYear }}년 {{ selectedMonth }}월</div>
            <div class="btn-wrap" @click.stop>
              <button class="icon-btn" @click="toggleDropdown">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="28" rx="6" fill="#F5B800"/>
                  <rect x="7" y="8" width="14" height="3" rx="1.5" fill="white"/>
                  <rect x="7" y="13" width="10" height="3" rx="1.5" fill="white"/>
                  <rect x="7" y="18" width="12" height="3" rx="1.5" fill="white"/>
                </svg>
              </button>
              <div v-if="showDropdown" class="dropdown">
                <div class="dropdown-label">년도</div>
                <div class="dropdown-options">
                  <button
                    v-for="y in years"
                    :key="y"
                    class="option-btn"
                    :class="{ active: selectedYear === y }"
                    @click="selectedYear = y"
                  >{{ y }}년</button>
                </div>
                <div class="dropdown-divider"></div>
                <div class="dropdown-label">월</div>
                <div class="dropdown-options">
                  <button
                    v-for="m in 12"
                    :key="m"
                    class="option-btn"
                    :class="{ active: selectedMonth === m }"
                    @click="selectedMonth = m"
                  >{{ m }}월</button>
                </div>
              </div>
            </div>
          </div>
          <div class="subtitle">월별 지출 퍼센트</div>
        </div>
      </div>
 
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
            <span class="legend-label">{{ item.label }} {{ item.amount }}만원</span>
            <span class="legend-pct">({{ pct(item.amount) }}%)</span>
          </div>
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
 
const now = new Date();
const selectedYear = ref(now.getFullYear());
const selectedMonth = ref(now.getMonth() + 1);
const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - 4 + i);
const showDropdown = ref(false);
 
const toggleDropdown = () => { showDropdown.value = !showDropdown.value; };
const closeDropdown = () => { showDropdown.value = false; };
 
const items = [
  { label: '식비', amount: 60, color: '#F5B800' },
  { label: '숙박비', amount: 40, color: '#F5D000' },
  { label: '쇼핑', amount: 36, color: '#E8A000' },
  { label: '교통/항공', amount: 34, color: '#C47F00' },
  { label: '일상 지출', amount: 30, color: '#FFE566' },
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
          hoverOffset: 10,
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
 
html, body, #app {
  width: 100%;
  height: 100%;
}
 
.page {
  width: 100%;
  height: 100vh;
  padding: 2rem;
  background: #FFFBF0;
}
 
.card {
  font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;
  background: #fff;
  border-radius: 20px;
  padding: 2.5rem;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 24px rgba(245, 184, 0, 0.15);
  border: 1px solid #FFE999;
  display: flex;
  flex-direction: column;
}
 
.header {
  margin-bottom: 2rem;
}
 
.header-left {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
 
.title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
 
.title {
  font-size: 22px;
  font-weight: 700;
  color: #111;
}
 
.btn-wrap {
  position: relative;
}
 
.icon-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: opacity 0.15s;
}
 
.icon-btn:hover {
  opacity: 0.8;
}
 
.dropdown {
  position: absolute;
  top: 36px;
  left: 0;
  background: #fff;
  border: 1px solid #FFE999;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 8px 24px rgba(245, 184, 0, 0.2);
  z-index: 100;
  min-width: 220px;
}
 
.dropdown-label {
  font-size: 12px;
  color: #B8860B;
  margin-bottom: 8px;
  font-weight: 500;
}
 
.dropdown-divider {
  height: 1px;
  background: #FFF3C0;
  margin: 12px 0;
}
 
.dropdown-options {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
 
.option-btn {
  padding: 5px 12px;
  border: 1px solid #FFE999;
  border-radius: 20px;
  font-size: 13px;
  color: #555;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s;
}
 
.option-btn:hover {
  border-color: #F5B800;
  color: #B8860B;
}
 
.option-btn.active {
  background: #F5B800;
  border-color: #F5B800;
  color: #fff;
}
 
.subtitle {
  font-size: 20px;
  font-weight: 500;
  color: #B8860B;
}
 
.chart-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  flex: 1;
}
 
.donut-container {
  position: relative;
  width: 460px;
  height: 460px;
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
  font-size: 15px;
  color: #999;
}
 
.donut-center .amount {
  font-size: 26px;
  font-weight: 700;
  color: #111;
}
 
.legend {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 220px;
}
 
.legend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  color: #222;
}
 
.legend-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
}
 
.legend-label {
  flex: 1;
}
 
.legend-pct {
  font-size: 14px;
  color: #999;
  min-width: 48px;
  text-align: right;
}
</style>