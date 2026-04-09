<template>
  <div class="chart-card">
    <div class="chart-wrap">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import Chart from 'chart.js/auto';
import { pickMonthlyList } from '@/api/monthlyList';

const mi = [0];
const me = [0];
const canvasRef = ref(null);
let chartInstance = null;

// 해당 월의 주차 범위 구하기
const getWeekRanges = (year, month) => {
  // month: 1~12
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0:일 ~ 6:토
  const lastDate = new Date(year, month, 0).getDate(); // 해당 달 마지막 날짜

  const ranges = [];

  let week = 1;
  let start = 1;
  let end = 7 - firstDay;

  ranges.push({
    week,
    start,
    end: Math.min(end, lastDate),
  });

  week++;
  start = end + 1;

  while (start <= lastDate) {
    end = start + 6;

    ranges.push({
      week,
      start,
      end: Math.min(end, lastDate),
    });

    start = end + 1;
    week++;
  }

  return ranges;
};

// 주차별 지출 합계 구하기
const getWeeklyExpenseTotals = (list, year, month) => {
  const weekRanges = getWeekRanges(year, month);
  console.log(weekRanges);
  return weekRanges.map((range) => {
    return list.filter((item) => {
      console.log(item);
      const date = new Date(item.date);
      const itemDay = date.getDate();
      if (itemDay >= range.start && itemDay <= range.end) {
        if(item.categoryID <= 5){
          
        }
      }
    }).reduce((sum, item) => sum + item.amount, 0);
  });
};

// const getWeeklyExpenseTotals = (list, year, month) => {
//   const weekRanges = getWeekRanges(year, month);
//   console.log(weekRanges);
//   return weekRanges.map((range) => {
//     const total = list
//       .filter((item) => {
//         console.log(item);
//         const date = new Date(item.date);
//         const itemDay = date.getDate();
//         if(itemDay >=range.start && itemDay <= range.end){
//           console.log("good");
//         }
//         const itemYear = date.getFullYear();
//         const itemMonth = date.getMonth() + 1;

//         return (
//           itemYear === year &&
//           itemMonth === month &&
//           item.type === 'expense' &&
//           itemDay >= range.start &&
//           itemDay <= range.end
//         );
//       })
//       .reduce((sum, item) => sum + item.amount, 0);

//     return {
//       label: `${range.week}주차`,
//       total,
//     };
//   });
// };

onMounted(async () => {
  try {
    const selectedMonth = '2026-04';
    const [year, month] = selectedMonth.split('-').map(Number);

    const response = await pickMonthlyList(selectedMonth);

    const weeklyData = getWeeklyExpenseTotals(response, year, month);

    const labels = weeklyData.map((item) => item.label);
    const totals = weeklyData.map((item) => item.total);

    chartInstance = new Chart(canvasRef.value, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '월 지출',
            data: totals,
            backgroundColor: 'rgba(139, 69, 69, 0.7)',
            borderColor: 'rgba(139, 69, 69, 1)',
            borderWidth: 1,
            borderRadius: 8,
            barThickness: 60,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
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
  max-width: 900px;
  padding: 24px;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.chart-wrap {
  position: relative;
  height: 380px;
}
</style>
