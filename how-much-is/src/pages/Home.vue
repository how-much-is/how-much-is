<template>
  <div>
    <!-- StatCard 컴포넌트에 데이터 내려보내기 -->
    <StatCard
      :monthlyIncome="monthlyIncome"
      :monthlyExpense="monthlyExpense"
      :balance="balance"
    />

    <!-- Calendar 컴포넌트에 데이터 내려보내고 이벤트 받기 -->
    <CalendarView :attrs="attrs" @dayclick="onDayClick" />

    <!-- DayDetail 컴포넌트에 데이터 내려보내기 -->
    <DayDetail
      :selectedDate="selectedDate"
      :transactions="selectedDayTransactions"
      @delete="removeTransaction"
    />

    <!-- + 버튼 -->
    <button class="fab" @click="openModal">+</button>

    <!-- 모달 -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>거래 추가</h3>

        <div>
          <button @click="form.type = 'expense'">지출</button>
          <button @click="form.type = 'income'">수입</button>
        </div>

        <p>빠른 추가</p>
        <div>
          <button v-for="q in quickItems" :key="q" @click="form.name = q">
            {{ q }}
          </button>
        </div>

        <p>거래명</p>
        <input v-model="form.name" placeholder="거래명을 입력하세요" />

        <p>금액</p>
        <input
          v-model="form.amount"
          type="number"
          placeholder="금액을 입력하세요"
        />

        <p>날짜</p>
        <input v-model="form.date" type="date" />

        <div>
          <button @click="closeModal">취소</button>
          <button @click="submitForm">등록하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDatePickerStore } from '@/stores/datepicker';
import { ref, computed, onMounted } from 'vue';

import StatCard from '@/components/home/StatCard.vue';
import CalendarView from '@/components/home/CalendarView.vue';
import DayDetail from '@/components/home/DayDetail.vue';
import {
  getTransactions,
  getCategories,
  postTransactions,
  putTransaction,
  deleteTransaction,
} from '@/api/CalendarDetail.js';

const selectedDate = ref(null);
const transactions = ref([]);

onMounted(async () => {
  const categoriesData = await getCategories();

  const transData = await getTransactions();

  const result = [];
  for (const t of transData) {
    const category = categoriesData.find((c) => c.id === t.categoryId);

    result.push({
      id: t.id,
      date: t.date,
      amount:
        category?.type === 'expense'
          ? -Math.abs(t.amount) // 지출이면 음수로 변환
          : Math.abs(t.amount), // 수입이면 양수 유지
      name: t.title,
      type: category ? category.type : 'expense',
    });
  }
  transactions.value = result;
});

const attrs = computed(() =>
  transactions.value.map((t) => ({
    dates: new Date(t.date),
    dot: { color: t.type === 'expense' ? 'red' : 'blue' },
    popover: { label: `${t.name} ${t.amount.toLocaleString()}원` },
  })),
);

const monthlyIncome = computed(() =>
  transactions.value
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

const monthlyExpense = computed(() =>
  transactions.value
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

const balance = computed(() => monthlyIncome.value + monthlyExpense.value);

const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
};
const closeModal = () => (showModal.value = false);

const quickItemsMap = {
  expense: ['식비', '교통', '쇼핑', '문화생활', '여행', '기타'],
  income: ['급여', '투자', '기타'],
};
const quickItems = computed(() => quickItemsMap[form.value.type]);

const form = ref({
  type: 'expense',
  name: '',
  amount: '',
  date: '',
});

const submitForm = async () => {
  if (!form.value.name || !form.value.amount) return;
  const newData = {
    userId: 1,
    amount: Number(form.value.amount),
    categoryId: form.value.type === 'expense' ? 1 : 6,
    title: form.value.name,
    memo: '',
    date: form.value.date,
  };
  const saved = await postTransactions(newData);
  transactions.value.push({
    id: saved.id,
    date: saved.date,
    name: saved.title,
    amount: form.value.type === 'expense' ? -saved.amount : saved.amount,
    type: form.value.type,
  });
  form.value = { type: 'expense', name: '', amount: '', date: '' };
  closeModal();
};

const selectedDayTransactions = computed(() => {
  if (!selectedDate.value) return [];
  return transactions.value.filter((t) => t.date === selectedDate.value);
});

const onDayClick = (dateId) => {
  selectedDate.value = dateId;
};

const removeTransaction = async (id) => {
  await deleteTransaction(id);
  transactions.value = transactions.value.filter((t) => t.id !== id);
};
</script>
<style scoped>
/* + 버튼 */
.fab {
  position: fixed;
  width: 56px;
  height: 56px;
  background-color: #3182f6;
  border-radius: 50%;
  bottom: 30px;
  right: 30px;
  border: none;
  cursor: pointer;
  font-size: 28px;
  color: #fff;
  z-index: 50;
}

/* 모달 배경 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

/* 모달 박스 */
.modal {
  background: #fff;
  border-radius: 16px;
  width: 460px;
  padding: 32px;
}
</style>
