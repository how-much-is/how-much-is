<template>
  <div v-for="list in lists" :key="list.id">
    {{ list.id }}
  </div>
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

<style scoped></style>
