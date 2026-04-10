<template>
  <div class="transaction-table">
    <div class="table-header table-row">
      <span>No</span>
      <span>Date</span>
      <span>Description</span>
      <span>Memo</span>
      <span>Category</span>
      <span>Amount</span>
      <span>Type</span>
      <span>Account</span>
    </div>

    <div class="table-row" v-for="list in pagedLists" :key="list.id">
      <span>{{ list.id }}</span>
      <span>{{ list.date }}</span>
      <span>{{ list.title }}</span>
      <span>{{ list.memo }}</span>
      <span>{{ list.categoryIcon }} {{ list.categoryName }}</span>
      <span>{{ list.amount.toLocaleString() }}</span>
      <span
        class="type-badge"
        :class="list.categoryType === 'income' ? 'income' : 'expense'"
      >
        {{ list.categoryType }}
      </span>
      <button @click="openEditModal(list)">수정</button>
    </div>
  </div>
  <!-- 거래 내역 수정 파트 -->
  <ModalFrame
    v-if="onmodal"
    :editData="selectedItem"
    @close="onmodal = false"
    @save="handleUpdate"
  ></ModalFrame>

  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getCategories, monthlyList, pickMonthlyList } from '@/api/monthlyList';
import ModalFrame from '../ModalFrame.vue';
import axios from 'axios';

const lists = ref([]);
const categories = ref([]);

onMounted(async () => {
  try {
    //transactions 거래 내역 api 호출, category가 뭔지 알려고 api 호출함
    const response = await pickMonthlyList('2026-04');
    // const response = await monthlyList();
    const categoryRes = await getCategories();
    lists.value = response;
    categories.value = categoryRes.data;
  } catch (error) {
    console.error('데이터 불러오기 실패', e);
  }
});

// categoryId를 통해서 type과 icon을 받아오는 메소드
const mergedLists = computed(() => {
  // console.log(lists.value)
  return lists.value.map((item) => {
    const category = categories.value.find(
      (c) => Number(c.id) === Number(item.categoryId),
    );
    return {
      ...item,
      categoryName: category?.name ?? '미분류',
      categoryIcon: category?.icon ?? '❓',
      categoryType: category?.type ?? 'unknown',
    };
  });
});

// 페이지네이션 코드
const currentPage = ref(1);
const itemsPerPage = 10;

const pagedLists = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return mergedLists.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(mergedLists.value.length / itemsPerPage);
});

const goToPage = (page) => {
  currentPage.value = page;
};

const onmodal = ref(false);
const selectedItem = ref(null);

const openEditModal = (item) => {
  selectedItem.value = { ...item };
  onmodal.value = true;
};

const handleUpdate = async (updatedData) => {
  try {
    await axios.put(
      `http://localhost:3000/transactions/${updatedData.id}`,
      updatedData,
    );
    const index = lists.value.findIndex((item) => item.id === updatedData.id);
    if (index !== -1) {
      lists.value[index] = { ...updatedData };
    }
    console.log('수정 완료');
    onmodal.value = false;
  } catch {
    error;
    console.error('수정 실패:', error);
    alert('수정 실패');
  }
};
</script>

<style scoped>
.list-card {
  display: flex;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.box1 {
  position: fixed;
  bottom: 10px;
  right: 100px;
  width: 300px;
  height: 100px;
  background-color: red;
}

.card {
  flex: 1;
}
/* 날짜 */
.date {
  color: #888;
}

/* 제목 */
.title {
  font-weight: 500;
}

/* 카테고리 */
.category {
  color: #666;
}

/* 금액 */
.amount {
  text-align: right;
  font-weight: 600;
}

/* 계좌 */
.account {
  color: #999;
  text-align: right;
}

/* 뱃지 */
.type {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  text-align: center;
}

/* 지출 */
.type.expense {
  color: #e74c3c;
  border: 1px solid #e74c3c;
}

/* 수입 */
.type.income {
  color: #2ecc71;
  border: 1px solid #2ecc71;
}

.transaction-table {
  max-width: 1100px; /* 핵심 🔥 */
  margin: 0 auto;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.08),
    0 10px 20px rgba(0, 0, 0, 0.12);
}

.table-row {
  display: grid;
  grid-template-columns: 50px 110px 1.2fr 1.3fr 1fr 100px 90px 1fr;
  align-items: center;
  padding: 16px 16px;
  column-gap: 8px;
  border-bottom: 1px solid #eee;
}

.table-header {
  padding: 12px 16px;
  background: #fff9a6;
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.table-row:not(.table-header) {
  font-size: 14px;
  color: #222;
}

.table-row:not(.table-header):hover {
  background: #fcfcfc;
}

.type-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
}

.type-badge.income {
  color: #1f9d73;
  background: #e7f8f1;
  border: 1px solid #b8ead8;
}

.type-badge.expense {
  color: #e05a7a;
  background: #fff0f4;
  border: 1px solid #f5bfd0;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.pagination button {
  border: 1px solid #ddd;
  background: white;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.pagination button.active {
  background: #222;
  color: white;
  border-color: #222;
}
</style>
