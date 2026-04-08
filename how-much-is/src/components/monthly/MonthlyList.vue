<template>
  <ul>
    <li class="list-card" v-for="list in lists" :key="list.id">
      <span class="date">{{ list.date }}</span>
      <span class="title">{{ list.title }}</span>
      <span class="category">{{ list.category }}</span>
      <span class="amount">{{ list.amount }}</span>
      <span class="type expense">Expense</span>
      <span class="account">{{ list.account }}</span>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { monthlyList } from '@/api/monthlyList';

const lists = ref([]);

onMounted(async () => {
  try {
    const response = await monthlyList();
    lists.value = response.data;
  } catch (error) {
    console.error('데이터 불러오기 실패', e);
  }
});
</script>

<style scoped>
.list-card {
  width: 1000px;
  height: 100px;
  background-color: red;
  margin-bottom: 20px;
  border: 1px solid black;
  display: flex;
}
</style>
