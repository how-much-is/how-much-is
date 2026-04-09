<template>
  <div>
    <h1>Setting</h1>
    <button @click="saveUser">저장</button>
    <button @click="resetUser">취소</button>

    <hr />

    <div class="input-group">
      <label for="username">사용자 이름</label><br />
      <input id="username" type="text" v-model="user.name" />
    </div>

    <div class="input-group">
      <label for="password">비밀번호</label><br />
      <input id="password" type="text" v-model="user.password" />
    </div>

    <div class="input-group">
      <label for="email">Email</label><br />
      <input id="email" type="text" v-model="user.email" />
    </div>

    <hr />
    <p><strong>현재 입력 중인 데이터:</strong> {{ user }}</p>
    <p><strong>DB 저장 데이터 (원본):</strong> {{ originalUser }}</p>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// 선택된 사용자의 정보 담기
const user = ref({ name: '', password: '', email: '' });

// 저장 취소 대비해서 기존 정보 저장
const originalUser = ref({ name: '', password: '', email: '' });

const selectedUser = 3;

onMounted(async () => {
  const res = await axios.get('http://localhost:3000/users');
  const found = res.data.find((u) => u.id === selectedUser);

  if (found) {
    originalUser.value = { ...found };
    user.value = { ...found };
  }
});

const saveUser = async () => {
  try {
    await axios.put(`http://localhost:3000/users/${selectedUser}`, user.value);

    originalUser.value = { ...user.value };
    alert('저장 완료');
  } catch (error) {
    console.error('저장 실패', error);
  }
};

const resetUser = () => {
  user.value = { ...originalUser.value };
  alert('수정 취소');
};
</script>
