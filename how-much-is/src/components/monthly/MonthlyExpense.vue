<template>
  <div class="card">
    <div class="card-header">
      <span class="title">한달 지출</span>
      <div class="icon">💰</div>
    </div>

    <div class="amount">
      ₩
      {{
        expenseList
          .reduce((acc, cur) => {
            return acc + cur;
          }, 0)
          .toLocaleString()
      }}
    </div>

    <div class="info">
      <span class="percent">+12.8%</span>
      <span class="desc">지난달 대비</span>
    </div>
  </div>
</template>

<script setup>
import { monthlyList, pickMonthlyList } from '@/api/monthlyList';
import { useDatePickerStore } from '@/stores/datepicker';
import { computed, onMounted, ref } from 'vue';
const store = useDatePickerStore()
const expense = ref([]);

onMounted(async () => {

  const nowDate = store.currentDate
  try {
    const response = await monthlyList();
    const response1 = await pickMonthlyList(nowDate);
    expense.value = response1;
  } catch (error) {
    console.log(error);
  }
});

const expenseList = computed(() => {
  return expense.value.map((list) => {
    if (list.categoryId <= 5) {
      return list.amount;
    }
    return 0;
  });
});
</script>

<style scoped>
.card {
  width: 260px;
  padding: 20px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(42, 42, 42, 0.25);
  font-family: Pretendard, sans-serif;
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: #888;
  font-size: 14px;
}

.icon {
  background: #ffe8e8;
  padding: 8px;
  border-radius: 10px;
  font-size: 18px;
}

.amount {
  margin-top: 10px;
  font-size: 26px;
  font-weight: bold;
}

.info {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.percent {
  background: #e6f9f0;
  color: #00a86b;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
}

.desc {
  font-size: 12px;
  color: #999;
}
</style>
