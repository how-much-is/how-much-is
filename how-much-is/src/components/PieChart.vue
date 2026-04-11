<script setup>
import { ref, onMounted, watch } from 'vue';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const props = defineProps(['chartData']);
const chartRef = ref(null);
let chartInstance = null;

const createChart = () => {
  if (!chartRef.value) return;
  if (chartInstance) chartInstance.destroy();

  // 부모가 준 데이터(labels, datasets)를 복사해서 가져옵니다.
  const chartData = { ...props.chartData };

  // 1. 첫 번째 데이터셋에 우리가 원하는 디자인 옵션을 덮어씌웁니다.
  if (chartData.datasets && chartData.datasets.length > 0) {
    chartData.datasets[0] = {
      ...chartData.datasets[0],
      spacing: 3, // 조각 사이 간격 (100은 너무 클 수 있으니 10부터 시작해 보세요!)
      borderRadius: 8, // 모서리 둥글게
      borderWidth: 2, // 구분선 두께
      borderColor: '#ffffff', // 구분선 색상
      hoverOffset: 30, // 마우스 올리면 툭 튀어나오기
    };
  }

  chartInstance = new Chart(chartRef.value, {
    type: 'pie',
    data: chartData, // 옵션이 합쳐진 데이터를 넣습니다.
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500,
        easing: 'easeInOutQuart',
      },
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            font: { size: 14 },
          },
        },
        title: {
          display: true,
          text: '카테고리별 지출 비율',
          font: { size: 18 },
        },
      },
    },
  });
};

onMounted(createChart);

// 데이터 변경 시 부드럽게 업데이트
watch(
  () => props.chartData,
  (newData) => {
    if (chartInstance) {
      chartInstance.data = newData;
      chartInstance.update();
    }
  },
  { deep: true },
);
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  /* 부모 컨테이너 크기에 맞춰 조절하세요 */
  max-width: 500px;
  margin: 0 auto;
  height: 400px;
}
</style>
