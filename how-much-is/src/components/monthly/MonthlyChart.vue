<template>
  <div class="chart-card">
    <div class="chart-header">
      <h3>{{ mtcomputed }}월 / 지출 리포트</h3>
    </div>

    <div class="chart-wrap">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
import Chart from "chart.js/auto";
import { getWeekRanges, pickMonthlyList, getWeeklyExpenseTotals } from "@/api/monthlyList";
import { useDatePickerStore } from "@/stores/datepicker";

const store = useDatePickerStore();
const selected = store.currentDate;

const mtcomputed = computed(() => {
  const arr =  selected.split("-");
  return Number(arr[1])
});

const canvasRef = ref(null);
let chartInstance = null;

// const getWeeklyExpenseTotals = (response, year, month, conditionFn) => {
//   const weekRanges = getWeekRanges(year, month);
//   return weekRanges.map((range) => {
//     return response.filter((u) => {
//       const date = new Date(u.date);
//       const itemDay = date.getDate();
//       if (range.start <= itemDay && range.end >= itemDay && conditionFn(u)) {
//         return u.amount;
//       }
//       return 0;
//     });
//   });
// };

const realIncome = (arr) => {
  return arr.map((week) => {
    return week.reduce((sum, item) => sum + item.amount, 0);
  });
};

onMounted(async () => {
  try {
    const selectedMonth = selected;
    const [year, month] = selectedMonth.split("-").map(Number);

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
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "지출",
            data: weeklyDatas,
            backgroundColor: "#fccfdb",
            // borderColor: '#e05a7a',
            // borderWidth: 1,
            borderRadius: 9,
            maxBarThickness: 50,
          },
          {
            label: "수입",
            data: weeklyIncomeDatas,
            backgroundColor: "#ffed94",
            // borderColor: '#f2d457',
            // borderWidth: 1,
            borderRadius: 9,
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
            position: "top",
            align: "end",
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
              color: "#f0f0f0", // y축 배경 가이드라인을 아주 연하게 표시
            },
            border: { display: false },
            ticks: {
              stepSize: 40000,
              callback: function (value) {
                return value.toLocaleString() + "원";
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("차트 데이터 불러오기 실패:", error);
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
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05); */
  box-shadow: 0 4px 12px rgba(42, 42, 42, 0.25);
  border: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
}

.chart-header {
  padding-bottom: 20px;
  margin-bottom: 24px;
  border-bottom: 1px solid #dbdada;

  margin-left: -30px;
  margin-right: -30px;

  padding-left: 30px;
  padding-right: 30px;
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
