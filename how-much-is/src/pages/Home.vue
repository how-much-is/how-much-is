<template>
  <div class="home-wrapper">
    <div class="home-container">
      <div class="right-section">
        <!-- StatCard 컴포넌트에 데이터 내려보내기 -->
        <StatCard
          :monthlyIncome="monthlyIncome"
          :monthlyExpense="monthlyExpense"
          :balance="balance"
          :weeklyExpense="weeklyExpense"
          :weeklyIncome="weeklyIncome"
          :dayExpense="dayExpense"
        />
        <!-- DayDetail 컴포넌트에 데이터 내려보내기 -->
        <DayDetail
          :selectedDate="selectedDate"
          :transactions="selectedDayTransactions"
        />
      </div>
      <div class="left-section">
        <!-- Calendar 컴포넌트에 데이터 내려보내고 이벤트 받기 -->
        <CalendarView :attrs="attrs" @dayclick="onDayClick" />
      </div>

      <!-- + 버튼 -->
      <button class="fab" @click="openModal">+</button>
      <!-- 모달 -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h3>거래 추가</h3>
          </div>

          <div class="type-toggle">
            <button
              :class="{ active: form.type === 'expense' }"
              @click="form.type = 'expense'"
            >
              지출
            </button>
            <button
              :class="{ active: form.type === 'income' }"
              @click="form.type = 'income'"
            >
              수입
            </button>
          </div>

          <div class="form-group">
            <label>빠른 추가</label>
            <div class="quick-tags">
              <button
                v-for="q in quickItems"
                :key="q"
                @click="form.name = q"
                class="tag-btn"
              >
                {{ q }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>거래명</label>
            <input
              v-model="form.name"
              placeholder="거래명을 입력하세요"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>금액</label>
            <input
              v-model="form.amount"
              type="number"
              placeholder="금액을 입력하세요"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label>날짜</label>
            <input v-model="form.date" type="date" class="form-input" />
          </div>

          <div class="modal-actions">
            <button class="btn-cancel" @click="closeModal">취소</button>
            <button class="btn-submit" @click="submitForm">저장하기</button>
          </div>
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
} from '@/api/CalendarDetail.js';
import {
  getWeekRanges,
  getWeeklyDay,
  getWeeklyExpenseTotals,
  pickMonthlyList,
} from '@/api/monthlyList';

const store = useDatePickerStore();
const selected = store.currentDate;

const selectedDate = ref(null);
const transactions = ref([]);
const weeklyExpense = ref([]);
const weeklyIncome = ref([]);
const dayExpense = ref();

const date = new Date();

const year1 = date.getFullYear();
const month1 = date.getMonth() + 1;
const nowDate =
  new Date().getFullYear() +
  '-' +
  String(new Date().getMonth() + 1).padStart(2, '0');

onMounted(async () => {
  //현재 달 문제는 좌우버튼을 누르면 달력값이 변함...
  const selectedMonth = selected;
  //그 값의 연월을 가져옴
  const [year, month] = selectedMonth.split('-').map(Number);

  //1,2,3일 그런거 말함
  const day = new Date().getDate();
  // console.log(new Date())
  const categoriesData = await getCategories();

  const transData = await getTransactions();

  //[{week:1, start:1, end:4},{week:2 ...}]
  const weekRanges = getWeekRanges(year1, month1);

  //[{id: '1', userId: 1, amount: 9000, categoryId: 2, title: '주유', …},{id: '2', userId: 1, amount: 9000, categoryId: 2, title: '주유', …}] 내가 선택한 달의 모든 내역 가져옴
  const response = await pickMonthlyList(selectedMonth);
  const response1 = await pickMonthlyList(nowDate);
  dayExpense.value = getWeeklyDay(response1);

  const weeklyData = getWeeklyExpenseTotals(
    response1,
    year1,
    month1,
    (u) => u.categoryId <= 5,
  );

  const weeklyex = getWeeklyExpenseTotals(
    response1,
    year1,
    month1,
    (u) => u.categoryId >= 6,
  );
  const pickMonth = computed(() => {
    //오늘 4월12일이면 day = 12
    const week = weekRanges.find((w) => w.start <= day && w.end >= day);
    console.log(week)
    return week?.week; // 주차 반환
  });
  // console.log(weeklyData)
  // console.log(pickMonth.value)
  console.log(pickMonth.value)

  weeklyExpense.value = weeklyData[pickMonth.value];
  weeklyIncome.value = weeklyex[pickMonth.value];

  // console.log( weeklyExpense.value)

  const result = [];
  for (const t of transData) {
    const category = categoriesData.find((c) => c.id === t.categoryId);

    result.push({
      id: t.id,
      date: t.date,
      amount: t.amount,
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

// const monthlyIncome = computed(() =>
//   transactions.value
//     .filter((t) => t.amount > 0)
//     .reduce((sum, t) => sum + t.amount, 0),
// );

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
.home-wrapper {
  width: 100%;
  background-color: #f8f9fa;
  min-height: calc(100vh - 80px);
}

.home-container {
  display: flex;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  align-items: flex-start;
}

.left-section {
  flex: 1.4;
  min-width: 0;
}

.right-section {
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .home-container {
    flex-direction: column;
    gap: 32px;
  }
  .right-section {
    width: 100%;
  }
}

/* + 버튼 */
.fab {
  position: fixed;
  width: 56px;
  height: 56px;
  background-color: #f2d457;
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
  background: rgba(15, 23, 42, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(2px);
}

/* 모달 박스 */
.modal {
  background: #fff;
  border-radius: 20px;
  width: 400px;
  padding: 40px 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.modal-header h3 {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  position: relative;
  padding-bottom: 12px;
}
.modal-header h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background-color: #f2d457;
  border-radius: 2px;
}

/* 지출/수입 스위치 */
.type-toggle {
  display: flex;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 4px;
}
.type-toggle button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s;
}
.type-toggle button.active {
  background: #fff;
  color: #1e293b;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* 폼 그룹 (라벨 + 인풋) */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
}

/* 세팅 페이지 스타일 인풋 박스 */
.form-input {
  width: 100%;
  box-sizing: border-box;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 15px;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: #fde047;
}

/* 빠른 추가 둥근 태그 버튼 */
.quick-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-btn {
  padding: 8px 14px;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
}
.tag-btn:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

/* 취소 / 저장하기 버튼 */
.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}
.modal-actions button {
  flex: 1;
  padding: 14px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.modal-actions button:hover {
  opacity: 0.9;
}
.btn-cancel {
  background: #f1f5f9;
  color: #64748b;
}
.btn-submit {
  background: #f2d457;
  color: #854f0b;
}
</style>
