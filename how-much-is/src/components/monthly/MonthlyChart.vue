<template>
  <div class="chart-card">
    <div class="chart-wrap">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";
import { monthlyList } from "@/api/monthlyList";

const canvasRef = ref(null);
let chartInstance = null;

onMounted(async () => {
  const lists = await monthlyList()
  console.log(lists)
  chartInstance = new Chart(canvasRef.value, {
    type: "line",
    data: {
      labels: ["1주차", "2주차", "3주차", "4주차"],
      datasets: [
        {
          label: "지출",
          data: [30000, 20000, 28000, 18000],
          borderColor: "#8B3A3A",
          tension: 0.4,
        },
        {
          label: "기준선",
          data: [30000, 30000, 30000, 30000],
          borderColor: "#E0C36E",
          borderDash: [5, 5],
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
    },
  });
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