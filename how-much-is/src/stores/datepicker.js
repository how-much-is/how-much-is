import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useDatePickerStore = defineStore('datepicker', () => {
  const currentDate = ref(
    new Date().getFullYear() +
      '-' +
      String(new Date().getMonth() + 1).padStart(2, '0'),
  );

  // YYYY-MM 형식
  const formattedDate = computed(() => {
    const [year, month] = currentDate.value.split('-');
    return `${year}년 ${month}월`;
  });

  // 이전 / 다음 달 이동
  const moveMonth = (diff) => {
    const [year, month] = currentDate.value.split('-').map(Number);

    const newDate = new Date(year, month - 1 + diff);

    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, '0');

    currentDate.value = `${newYear}-${newMonth}`;
  };

  return {
    currentDate,
    formattedDate,
    moveMonth,
  };
});
