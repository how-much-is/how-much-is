import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useDatePickerStore = defineStore('datepicker', () => {
  const currentDate = ref(new Date());

  const year = computed(() => currentDate.value.getFullYear());
  const month = computed(() => currentDate.value.getMonth() + 1);

  // const doubleCount = computed(() => count.value * 2)

  // function increment() {
  //   count.value++
  // }

  return { currentDate, year, month };
});
