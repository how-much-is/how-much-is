<template>
  <div class="calendar-wrap">
    <VCalendar class="my-calendar" :attributes="attrs" @dayclick="onDayClick">
      <template #header-prev-button="{ move, disabled }">
        <button type="button" :disabled="disabled" @click="moveMonth(-1)">
          ◀
        </button>
      </template>

      <template #header-title="{ title }">
        <span>{{ title }}</span>
      </template>

      <template #header-next-button="{ move, disabled }">
        <button type="button" :disabled="disabled" @click="moveMonth(1)">
          ▶
        </button>
      </template>
    </VCalendar>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
console.log(new Date());
// const datastore = useDatePickerStore()
const moveMonth = (diff) => {
  const year = Number(route.query.year) || new Date().getFullYear();
  const month = Number(route.query.month) || new Date().getMonth() + 1;

  const newDate = new Date(year, month - 1 + diff);
  router.push({
    path: '/',
    query: {
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
    },
  });
};

// Home.vue 에서 데이터 받아요
defineProps({
  attrs: Array,
});

// 날짜 클릭하면 Home.vue 로 전달해요
const emit = defineEmits(['dayclick']);



const onDayClick = (day) => {
  emit('dayclick', day.id);
};
</script>

<style scoped>
:deep(.vc-container) {
  width: 100% !important;
  max-width: 100% !important;
}

:deep(.vc-weeks) {
  padding: 0 16px;
}

:deep(.vc-day) {
  min-height: 80px;
  padding: 8px;
}

:deep(.vc-day-content) {
  font-size: 16px;
  font-weight: 600;
}

:deep(.vc-header) {
  position: relative;
  padding: 16px 0 24px;
  font-size: 18px;
}

:deep(.vc-title) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

:deep(.vc-arrow) {
  width: 40px !important;
  height: 40px !important;
  font-size: 20px !important;
  border-radius: 10px !important;
  background: #f2f4f6 !important;
  position: relative;
  z-index: 2;
  pointer-events: auto;
}

:deep(.vc-weekday) {
  font-size: 14px !important;
  font-weight: 700 !important;
  padding: 10px 0 !important;
}
v.calendar-wrap {
  width: 100%;
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 16px;
}
</style>
