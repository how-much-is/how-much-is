<template lang="">
  <div class="report-container">
    <h2>월이랑 요일 드롭다운</h2>
    <select v-model="selectedMonth">
      <option v-for="month in months" :key="month" :value="month">
        {{ month }}
      </option>
    </select>

    <h1>해당월 transaction 보이는 지 확인용</h1>
    <p>{{ monthlyTransactions }}</p>
    <h1>각 카테고리 당 누적 지출 금액</h1>
    <p>{{ countCategory }}</p>

    <!-- <DonutChart :chartData="chartData">
        <CategorySummary :summaryData="summaryData"> -->
  </div>
</template>

<script setup>
import DonutChart from '@/components/DonutChart.vue';
import CategorySummary from '@/components/CategorySummary.vue';
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';

// db.json에서 해당하는 사용자의 거래 내역 가져올 data 담을 변수
const transactions = ref([]);
// db.json에서 카테고리 가져올 data 담을 변수
const categories = ref([]);
// 사용자가 선택한 month 담을 변수
const selectedMonth = ref('');

onMounted(async () => {
  // db.json 에서 사용자 transaction data 가져오기
  const tRes = await axios.get('http://localhost:3000/transactions');

  // db.json에서 category data 가져오기
  const cRes = await axios.get('http://localhost:3000/categories');

  transactions.value = tRes.data;
  categories.value = cRes.data;

  //   console.log('거래 내역:', transactions.value);
  //   console.log('카테고리 종류:', categories.value);

  //   processData();
});

// 사용자 거래 내역이 있는 month 추출
const months = computed(() => {
  // 중복되는 데이터 존재할 수 있으므로 집합 사용
  const monthSet = new Set();

  // db.json에서 가져온 transaction를 확인
  transactions.value.forEach((t) => {
    // 각 원소에서 속성 date의 YYYY-MM를 추출
    const month = t.date.slice(0, 7);
    // 생성한 집합에 추가
    monthSet.add(month);
  });
  // 사용자 거래 내역이 있는 월을 담아준 집합을 배열로 설정 후
  // 최신 순으로 sort

  return Array.from(monthSet).sort().reverse();
});

// 페이지 이동 후에 보이는 화면은 가장 최신 월 정보
// 사용자 거래 내역 months 가 계산될 때마다 확인
// months 가 비어있지 않다면 selectedMonth를 첫 번째 인덱스 값으로 설정
watch(months, (newMonths) => {
  if (newMonths.length > 0) selectedMonth.value = newMonths[0];
});

// 사용자가 선택한 월의 transaction data를 담은 배열을 return
const monthlyTransactions = computed(() => {
  return transactions.value.filter(
    // transactions 배열을 돌면서 해당 거래가 지출이며
    // 사용자가 선택한 월과 일치하는 것만 걸러 반환
    (t) => t.type === 'expense' && t.date.startsWith(selectedMonth.value),
  );
});

const countCategory = computed(() => {
  // 카테고리 id (정수 1~N으로 구성) 순서대로 지출액 저장
  const count = {};

  // 사용자가 선택한 달이 담긴 배열을 돌며 확인
  for (let i = 0; i < monthlyTransactions.value.length; i++) {
    // 각 거래 내역의 아이디를 temp_id에 할당
    // ( 거래 내역은 id 순서대로 정렬X )
    let temp_id = monthlyTransactions.value[i].categoryId;
    console.log(temp_id);

    // id에 해당하는 배열이 비어있다면
    if (count[temp_id] === undefined) {
      // count 배열의 해당 인덱스에 0을 할당하며 초기화
      count[temp_id] = 0;
    }

    // count 배열의 해당 인덱스에 지출 금액을 누적으로 합해줌
    count[temp_id] += monthlyTransactions.value[i].amount;
  }
  return count;
});

// 카테고리 id를 인덱스라고 했을 때, 카테고리별 금액만 배열로 저장
const donutData = computed(() => {
  const result = [];

  // 카테고리별 누적 금액 배열에서 각 원소 꺼냄
  for (let key in countCategory.value) {
    // 각 누적 금액만 result 배열에 push
    result.push(countCategory.value[key]);
  }

  return result;
});

const donutLabels = computed(() => {
  const labels = [];
  // 객체 ({ 카테고리id_1 : 가격, 카테고리id_2: 가격, ... })에서
  for (let key in countCategory.value) {
    // categoryId로 category 이름 찾기
    const category = categories.value.find((c) => c.id === Number(key));

    if (category) {
      labels.push(category.name);
    }
  }

  return labels;
});

// transaction 카테고리의 이름과 누적 합계된 가격을 객체로 반환
const chartData = computed(() => {
  return {
    labels: donutLabels.value,
    series: donutData.value,
  };
});
</script>
<style lang=""></style>
