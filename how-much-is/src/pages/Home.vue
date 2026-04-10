<template>
  <div>
    <!-- 수입/지출/잔액 카드 -->
    <div class="stat-row">
      <div class="stat-card">
        <p class="stat-label">4월 수입</p>
        <p class="stat-val blue">{{ formatNum(monthlyIncome) }} 원</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">4월 지출</p>
        <p class="stat-val red">{{ formatNum(monthlyExpense) }} 원</p>
      </div>
      <div class="stat-card">
        <p class="stat-label">잔액</p>
        <p class="stat-val" :class="balance >= 0 ? 'teal' : 'red'">
          {{ formatNum(balance) }} 원
        </p>
      </div>
    </div>

    <!-- 캘린더 -->
    <VCalendar :attributes="attrs" @dayclick="onDayClick" />

    <!--거래 내역 박스-->
    <div class="day-detail">
      <!-- 날짜 클릭 안 했을 때 -->
      <p v-if="!selectedDate">날짜를 클릭하면 거래 내역이 표시돼요</p>

      <!-- 날짜 클릭 했을 때 -->
      <div v-if="selectedDate">
        <h3>거래 내역</h3>

        <!-- 거래 없을 때 -->
        <p v-if="selectedDayTransactions.length === 0">거래 내역이 없어요</p>

        <!-- 거래 목록 -->
        <div v-for="t in selectedDayTransactions" :key="t.name">
          <span>{{ t.name }}</span>
          <span>{{ formatNum(t.amount) }} 원</span>
        </div>
      </div>
    </div>

    <button class="fab" @click="openModal">+</button>
    <!-- 모달 -->

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>거래 추가</h3>

        <!-- 지출/수입 선택-->
        <div>
          <button @click="form.type = 'expense'">지출</button>
          <button @click="form.type = 'income'">수입</button>
        </div>

        <!--빠른 추가-->
        <p>빠른 추가</p>
        <div>
          <button v-for="q in quickItems" :key="q" @click="form.name = q">
            {{ q }}
          </button>
        </div>

        <!--거래명-->
        <p>거래명</p>
        <input v-model="form.name" placeholder="거래명을 입력하세요" />

        <!--금액-->
        <p>금액</p>
        <input
          v-model="form.amount"
          type="number"
          placeholder="금액을 입력하세요"
        />

        <!--날짜-->
        <p>날짜</p>
        <input v-model="form.date" type="date" />

        <!--버튼-->
        <div>
          <button @click="closeModal">취소</button>
          <button @click="submitForm">등록하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
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
//월별 수입 합계
const monthlyIncome = computed(() =>
  transactions.value
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

//월별 지출 합계
const monthlyExpense = computed(() =>
  transactions.value
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0),
);

//잔액 = 수입 + 지출
const balance = computed(() => monthlyIncome.value + monthlyExpense.value);

const formatNum = (n) => n.toLocaleString('ko-KR');

// 모달 열기/닫기 상태
const showModal = ref(false);
const openModal = () => {
  showModal.value = true;
};
const closeModal = () => (showModal.value = false);

// 타입별 빠른 추가 목록
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

// 거래 등록
const submitForm = () => {
  if (!form.value.name || !form.value.amount) return;

  //transctions에 새 거래 추가
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

// 날짜 클릭 함수
const onDayClick = (day) => {
  selectedDate.value = day.id; // '2026-04-01' 형식으로 저장
};
</script>

<style scoped>
/* 카드 3개 가로 배치 */
.stat-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

/* 카드 디자인 */
.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px 26px;
  flex: 1;
  border: 1px solid #e5e8eb;
}

/* 라벨 (작은 글씨) */
.stat-label {
  font-size: 17px;
  color: #8b95a1;
  margin-bottom: 8px;
}

/* 숫자 */
.stat-val {
  font-size: 30px;
  font-weight: 700;
}

/* 색상 */
.blue {
  color: #3182f6;
}
.red {
  color: #f04452;
}
.teal {
  color: #00b493;
}
/* 캘린더 크기 조절 */
:deep(.vc-container) {
  width: 100% !important;
  max-width: 100% !important;
}

:deep(.vc-weeks) {
  padding: 0 16px;
}

:deep(.vc-day) {
  min-height: 80px; /* 날짜 칸 높이 */
  padding: 8px;
}

:deep(.vc-day-content) {
  font-size: 16px; /* 날짜 숫자 크기 */
  font-weight: 600;
}

:deep(.vc-header) {
  padding: 16px;
  font-size: 18px; /* 년월 글씨 크기 */
}
/* 헤더 년월 위치 고정 */
:deep(.vc-title) {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

:deep(.vc-header) {
  position: relative;
  padding: 16px 0 24px;
}
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
/* 어두운 배경 */
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
.day-detail {
  background: #fff;
  border-radius: 16px;
  padding: 24px 32px;
  margin-top: 16px;
  border: 1px solid #e5e8eb;
  min-height: 100px;
}
</style>
