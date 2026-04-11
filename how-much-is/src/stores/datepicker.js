import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDatePickerStore = defineStore("datepicker", () => {
  const currentDate = ref(
    new Date().getFullYear() +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0"),
  );

  // YYYY-MM 형식
  const formattedDate = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = String(currentDate.value.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  });

  // 이전 / 다음 달 이동
  const moveMonth = (diff) => {
    const [year, month] = currentDate.value.split("-").map(Number);

    const newDate = new Date(year, month - 1 + diff);

    const newYear = newDate.getFullYear();
    const newMonth = String(newDate.getMonth() + 1).padStart(2, "0");

    currentDate.value = `${newYear}-${newMonth}`;
    console.log(currentDate.value)
  };

  return {
    currentDate,
    formattedDate,
    moveMonth,
  };
});
