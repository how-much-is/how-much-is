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
        {{ list.categoryType === 'income' ? '수입' : '지출' }}
      </span>
      <button class="edit-btn" @click="openEditModal(list)">수정</button>
    </div>
  </div>

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

  <div class="modal-overlay" v-if="onmodal">
    <div class="modal-box">
      <h3 class="modal-title">거래 내역 수정</h3>

      <div class="modal-input-group">
        <label>내역</label>
        <input
          type="text"
          v-model="selectedItem.title"
          placeholder="내역을 입력하세요"
        />
      </div>

      <div class="modal-input-group">
        <label>메모</label>
        <input
          type="text"
          v-model="selectedItem.memo"
          placeholder="메모를 입력하세요"
        />
      </div>

      <div class="modal-input-group">
        <label>금액</label>
        <input
          type="number"
          v-model="selectedItem.amount"
          placeholder="금액을 입력하세요"
        />
      </div>

      <div class="modal-buttons">
        <button class="cancel-btn" @click="onmodal = false">취소</button>
        <button class="save-btn" @click="handleUpdate(selectedItem)">
          저장
        </button>
      </div>
    </div>
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
    console.error('데이터 불러오기 실패', error);
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

    onmodal.value = false;
  } catch (error) {
    console.error('수정 실패:', error);
    alert('수정 실패');
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-box {
  background: #ffffff;
  width: 380px;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-title {
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.modal-input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.modal-input-group label {
  font-size: 13px;
  font-weight: 600;
  color: #666;
}

.modal-input-group input {
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.modal-input-group input:focus {
  border-color: #f2d457;
  box-shadow: 0 0 0 3px rgba(242, 212, 87, 0.2);
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.cancel-btn {
  padding: 10px 16px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  color: #666;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.save-btn {
  padding: 10px 20px;
  background: #f2d457;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.save-btn:hover {
  opacity: 0.8;
}

.transaction-table {
  max-width: 1100px;
  margin: 30px auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.table-row {
  display: grid;
  grid-template-columns: 50px 110px 1.2fr 1.3fr 1fr 100px 90px 80px;
  align-items: center;
  padding: 10px 20px;
  column-gap: 10px;
  border-bottom: 1px solid #f5f5f5;
}

.table-header {
  background: #fffdf5;
  border-top: 4px solid #f2d457;
  border-bottom: 1px solid #eaeaea;
  font-weight: 700;
  color: #444;
  font-size: 14px;
}

.table-row:not(.table-header) {
  font-size: 14px;
  color: #333;
  transition: background 0.2s ease;
}

.table-row:not(.table-header):hover {
  background: #f0f0f0;
}

.type-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
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

.edit-btn {
  padding: 6px 12px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #666;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn:hover {
  border-color: #f2d457;
  color: #d8b217;
  background: #fffdf5;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.pagination button {
  border: 1px solid #eee;
  background: white;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  cursor: pointer;
  color: #666;
  font-weight: 600;
  transition: all 0.2s ease;
}

.pagination button:hover {
  background: #f9f9f9;
}

.pagination button.active {
  background: #f2d457;
  color: #fff;
  border-color: #f2d457;
  box-shadow: 0 2px 8px rgba(242, 212, 87, 0.4);
}
</style>
