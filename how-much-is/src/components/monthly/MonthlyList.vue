<template>
  <ul>
    <li class="list-card" v-for="list in mergedLists" :key="list.id">
      <span class="date card">{{ list.date }}</span>
      <span class="title card">{{ list.title }}</span>
      <span class="title card">{{ list.memo }}</span>
      <span class="category card">{{ list.categoryIcon  }}</span>
      <span class="amount card">{{ list.amount }}</span>
      <span class="type expense card">{{ list.categoryType }}</span>
      <span class="account card">{{ list.account }}</span>
    </li>
  </ul>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { getCategories, monthlyList } from '@/api/monthlyList';

const lists = ref([]);
const categories = ref([]);

onMounted(async () => {
  try {
    //transactions 거래 내역 api 호출, category가 뭔지 알려고 api 호출함
    const response = await monthlyList();
    const categoryRes = await getCategories();
    lists.value = response.data;
    categories.value = categoryRes.data;
  } catch (error) {
    console.error('데이터 불러오기 실패', e);
  }
});

// categoryId를 통해서 type과 icon을 받아오는 메소드
const mergedLists = computed(() => {
  return lists.value.map((item) => {
    const category = categories.value.find((c) => c.id === item.categoryId);

    return {
      ...item,
      categoryName: category?.name ?? '미분류',
      categoryIcon: category?.icon ?? '❓',
      categoryType: category?.type ?? 'unknown',
    };
  });
});
</script>

<style scoped>
.list-card {
  display: flex;
  /* grid-template-columns: 120px 1fr 120px 120px 100px 180px; */
  /* align-items: center; */

  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.card {
  flex: 1;
  /* display: inline-block; */
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
</style>
