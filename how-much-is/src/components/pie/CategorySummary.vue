<template>
  <div class="summary-box">
    <div class="summary-card total">
      <div class="total-left">
        <span class="label">이번 달 총 지출</span>
        <span class="value">{{ props.totalExpense.toLocaleString() }}원</span>
      </div>
      <div class="total-icon">💰</div>
    </div>

    <div
      v-for="item in props.summaryList"
      :key="item.name"
      class="summary-card item"
    >
      <div class="card-row">
        <div class="color-dot" :style="{ background: item.color }"></div>
        <span class="category-name">{{ item.name }}</span>
        <span class="category-amount"
          >{{ item.amount.toLocaleString() }}원</span
        >
        <span class="percent-badge" :style="badgeStyle(item.color)"
          >{{ item.percent }}%</span
        >
      </div>
      <div class="progress-container">
        <div
          class="progress-fill"
          :style="{
            width: props.animate ? item.percent + '%' : '0%',
            background: item.color,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  summaryList: Array,
  totalExpense: Number,
  animate: Boolean,
});

const badgeColorMap = {
  '#FF6384': { bg: '#FBEAF0', text: '#993556' },
  '#36A2EB': { bg: '#E6F1FB', text: '#185FA5' },
  '#FFCE56': { bg: '#FAEEDA', text: '#854F0B' },
  '#4BC0C0': { bg: '#E1F5EE', text: '#0F6E56' },
  '#9966FF': { bg: '#EEEDFE', text: '#534AB7' },
};

function badgeStyle(color) {
  const c = badgeColorMap[color] ?? { bg: '#F1EFE8', text: '#5F5E5A' };
  return { background: c.bg, color: c.text };
}
</script>

<style scoped>
.summary-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.summary-card {
  border-radius: 12px;
}

.summary-card.total {
  /* background: #545045; */
  background: #ffffff;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: none; */
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}
.total-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.label {
  font-size: 13px;
  /* color: #d6d4d0; */
  color: #64748b;
}
.value {
  font-size: 22px;
  /* font-weight: 500; */
  font-weight: 600;
  /* color: #fff; */
  color: #1e293b;
}
.total-icon {
  width: 40px;
  height: 40px;
  /* background: rgba(255, 255, 255, 0.18); */
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.summary-card.item {
  background: #fff;
  border: 1px solid #f1f3f5;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.category-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  flex: 1;
}
.category-amount {
  font-size: 14px;
  color: #495057;
  white-space: nowrap;
}
.percent-badge {
  font-size: 12px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 99px;
  white-space: nowrap;
}

.progress-container {
  width: 100%;
  height: 6px;
  background-color: #e9ecef;
  border-radius: 99px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
