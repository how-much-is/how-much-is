<template setup>
  <div class="edit-form">
    <div class="field">
      <label>제목</label>
      <input v-model="localItem.title" type="text" />
    </div>
    <div class="field">
      <label>금액</label>
      <input v-model.number="localItem.amount" type="number" />
    </div>
    <div class="field">
      <label>메모</label>
      <textarea v-model="localItem.memo"></textarea>
    </div>
    <button @click="$emit('submit', localItem)">수정 완료</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps(['initialData']);
const emit = defineEmits(['submit']);

// 원본 데이터 복사 (원본 훼손 방지)
const localItem = ref({
  title: '',
  amount: 0,
  memo: '',
});

watch(
  () => props.initialData,
  (newVal) => {
    localItem.value = { ...newVal };
  },
  { immediate: true },
);
</script>
