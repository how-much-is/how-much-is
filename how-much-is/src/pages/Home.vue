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
import { ref, computed } from 'vue';
import StatCard from '@/components/home/StatCard.vue';
import CalendarView from '@/components/home/CalendarView.vue';
import DayDetail from '@/components/home/DayDetail.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

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



const selectedDate = ref(null);
const transactions = ref([
  { date: '2026-04-01', amount: -12000, name: '점심', type: 'expense' },
  { date: '2026-04-02', amount: -8500, name: '교통', type: 'expense' },
  { date: '2026-04-03', amount: -23000, name: '저녁', type: 'expense' },
  { date: '2026-04-08', amount: -15000, name: '배달', type: 'expense' },
  { date: '2026-04-08', amount: 15000, name: '주식', type: 'income' },
  { date: '2026-04-10', amount: 105000, name: '주식', type: 'income' },
  { date: '2026-04-24', amount: 2000000, name: '급여', type: 'income' },
]);

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

const submitForm = () => {
  if (!form.value.name || !form.value.amount) return;
  transactions.value.push({
    date: form.value.date,
    name: form.value.name,
    amount:
      form.value.type === 'expense'
        ? -Math.abs(Number(form.value.amount))
        : Math.abs(Number(form.value.amount)),
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
