<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3>4월 수입 / 지출 리포트</h3>
    </div>

    <div class="chart-wrap">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import { pickMonthlyList } from '@/api/monthlyList';

const canvasRef = ref(null);
let chartInstance = null;

const getWeekRanges = (year, month) => {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const lastDate = new Date(year, month, 0).getDate();

  const ranges = [];
  let week = 1;
  let start = 1;
  let end = 7 - firstDay;
  ranges.push({ week, start, end: Math.min(end, lastDate) });
  week++;
  start = end + 1;
  while (start <= lastDate) {
    end = start + 6;
    ranges.push({ week, start, end: Math.min(end, lastDate) });
    start = end + 1;
    week++;
  }
  return ranges;
};

const getWeeklyExpenseTotals = (response, year, month, conditionFn) => {
  const weekRanges = getWeekRanges(year, month);
  return weekRanges.map((range) => {
    return response.filter((u) => {
      const date = new Date(u.date);
      const itemDay = date.getDate();
      if (range.start <= itemDay && range.end >= itemDay && conditionFn(u)) {
        return u.amount;
      }
      return 0;
    });
  });
};

const realIncome = (arr) => {
  return arr.map((week) => {
    return week.reduce((sum, item) => sum + item.amount, 0);
  });
};

onMounted(async () => {
  try {
    const selectedMonth = '2026-04';
    const [year, month] = selectedMonth.split('-').map(Number);

    const response = await pickMonthlyList(selectedMonth);

    // 지출 데이터
    const weeklyData = getWeeklyExpenseTotals(
      response,
      year,
      month,
      (u) => u.categoryId <= 5,
    );
    // 수입 데이터
    const weeklyIncome = getWeeklyExpenseTotals(
      response,
      year,
      month,
      (u) => u.categoryId >= 6,
    );

    const weeklyDatas = realIncome(weeklyData);
    const weeklyIncomeDatas = realIncome(weeklyIncome);
    const labels = weeklyDatas.map((u, i) => `${i + 1}주차`);

    chartInstance = new Chart(canvasRef.value, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '지출',
            data: weeklyDatas,
            backgroundColor: '#fff0f4',
            borderColor: '#e05a7a',
            borderWidth: 2,
            borderRadius: 6,
            maxBarThickness: 50,
          },
          {
            label: '수입',
            data: weeklyIncomeDatas,
            backgroundColor: '#fef7d9',
            borderColor: '#f2d457',
            borderWidth: 2,
            borderRadius: 6,
            maxBarThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}원`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#f0f0f0', // y축 배경 가이드라인을 아주 연하게 표시
            },
            border: { display: false },
            ticks: {
              stepSize: 40000,
              callback: function (value) {
                return value.toLocaleString() + '원';
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error('차트 데이터 불러오기 실패:', error);
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
.chart-card {
  width: 100%;
  height: 100%;
  max-width: 900px;
  padding: 30px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
}

.chart-header {
  margin-bottom: 24px;
}

.chart-header h3 {
  font-size: 18px;
  color: #333;
  font-weight: 700;
  margin: 0;
}

.chart-wrap {
  position: relative;
  height: 380px;
  width: 100%;
}
</style>
