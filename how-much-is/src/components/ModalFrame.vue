<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-container">
      <h3>거래 내역 수정</h3>
      <TransactionEditForm
        :initialData="editData"
        @submit="$emit('save', $event)"
      />

      <button @click="$emit('close')">닫기</button>
    </div>
  </div>
</template>

<script setup>
import TransactionEditForm from './TransactionEditForm.vue';

defineProps(['editData']);
defineEmits(['close', 'save']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  min-width: 400px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
