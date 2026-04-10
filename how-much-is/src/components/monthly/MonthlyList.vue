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
      <button class="edit-btn">수정</button>
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

  <div class="box1" v-if="onmodal">
    <input type="text" />
    <input type="text" />
    <input type="text" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getCategories, monthlyList, pickMonthlyList } from '@/api/monthlyList';

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
</script>

<style scoped>
.box1 {
  position: fixed;
  bottom: 10px;
  right: 100px;
  width: 300px;
  height: 100px;
  background-color: red;
}

/* 테이블 전체 컨테이너 */
.transaction-table {
  max-width: 1100px;
  margin: 30px auto;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

/* 테이블 행(줄) 공통 레이아웃 */
.table-row {
  display: grid;
  grid-template-columns: 50px 110px 1.2fr 1.3fr 1fr 100px 90px 80px;
  align-items: center;
  padding: 10px 20px;
  column-gap: 10px;
  border-bottom: 1px solid #f5f5f5;
}

/* 테이블 헤더 */
.table-header {
  background: #fffdf5;
  border-top: 4px solid #f2d457;
  border-bottom: 1px solid #eaeaea;
  font-weight: 700;
  color: #444;
  font-size: 14px;
}

/* 일반 리스트 디자인 */
.table-row:not(.table-header) {
  font-size: 14px;
  color: #333;
  transition: background 0.2s ease;
}

/* 리스트에 마우스 올렸을 때 효과 */
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

/*수정 버튼 디자인*/
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

/* 수정 버튼에 마우스 올렸을 때 컬러 */
.edit-btn:hover {
  border-color: #f2d457;
  color: #d8b217;
  background: #fffdf5;
}

/* 페이지 번호 */
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
  box-shadow: 0 2px 8px rgba(242, 212, 87, 0.4); /* 노란색 빛 번짐 효과 */
}
</style>
