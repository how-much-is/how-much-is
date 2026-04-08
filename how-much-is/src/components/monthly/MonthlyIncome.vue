<template>
  <div>
    {{ incomeList }}
  </div>
</template>

<script setup>
import { monthlyList } from '@/api/monthlyList';
import { computed, onMounted, ref } from 'vue';

const income = ref([])


onMounted(async () => {
  try {
    const response = await monthlyList()
    income.value = response.data
  } catch (error) {
    console.log(error);
  }
});

const incomeList = computed(() => {
    return income.value.map(u => {
        Number(u.categoryId) >= 6   
    })
})
</script>

<style scoped></style>
