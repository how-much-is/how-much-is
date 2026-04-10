<template>
  <div class="info-box">
    <div class="summary-card total">
      <p class="label">💰 이번 달 총 지출</p>
      <h3 class="value">{{ props.totalExpense.toLocaleString() }}원</h3>
    </div>
    <div v-for="item in summaryList" :key="item.name" class="summary-card">
      <div
        class="color-indicator"
        :style="{ backgroundColor: item.color }"
      ></div>
      <div class="text">
        <p class="label">{{ item.name }} ({{ item.percent }}%)</p>
        <h3 class="value">{{ item.amount.toLocaleString() }}원</h3>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  summaryList: Object,
  totalExpense: Number,
});
</script>
<style lang=""></style>
