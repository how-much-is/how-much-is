<template>
<<<<<<< HEAD
  <div class="settings__container">
    <header class="settings__header">
      <p>설정 화면</p>
    </header>

    <main class="settings__card">
      <div class="title__section">
        <h2>사용자 정보 수정</h2>
        <div class="yellow__underline"></div>
      </div>
=======
  <div>
    <h1>Setting</h1>
    <button @click="saveUser">저장</button>
    <button @click="resetUser">취소</button>
    <button>로그인하기</button><br />
    <div class="">
      <label for="username">사용자 이름</label><br />
      <input id="username" type="text" v-model="user.username" />
    </div>
    <hr />
>>>>>>> 69e779148eb11540dedb19b9adafb75f572c28d0

      <div class="settings__form">
        <div class="input__group">
          <label for="username">사용자 이름</label>
          <input
            id="username"
            type="text"
            v-model="user.name"
            :placeholder="originalUser.name"
          />
        </div>

        <div class="input__group">
          <label for="password">비밀번호</label>
          <input
            id="password"
            type="text"
            v-model="user.password"
            :placeholder="originalUser.password"
          />
        </div>

        <div class="input__group">
          <label for="email">이메일 주소</label>
          <input
            id="email"
            type="email"
            v-model="user.email"
            :placeholder="originalUser.email"
          />
        </div>

        <div class="button__group">
          <button type="button" class="save__button" @click="saveUser">
            저장하기
          </button>
          <button type="button" class="reset__button" @click="resetUser">
            취소
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const user = ref({ name: '', password: '', email: '' });
const originalUser = ref({ name: '', password: '', email: '' });
const selectedUser = 3;

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/users');
    const found = res.data.find((u) => u.id === selectedUser);

    if (found) {
      originalUser.value = { ...found };
      user.value = { ...found };
    }
  } catch (error) {
    console.error('로드 실패', error);
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

<style scoped>
/* 전체 컨테이너 (로그인 화면과 동일) */
.settings__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Noto Sans KR', sans-serif;
}

.settings__header {
  margin-bottom: 20px;
  color: #999;
  font-size: 18px;
}

/* 카드 레이아웃 */
.settings__card {
  width: 90%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.title__section {
  text-align: center;
  margin-bottom: 30px;
}

.title__section h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 700;
}

.yellow__underline {
  width: 60px;
  height: 3px;
  background-color: #f2d457;
  margin: 0 auto;
}

/* 폼 요소 */
.settings__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input__group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input__group label {
  font-size: 14px;
  font-weight: bold;
  color: #666;
}

.input__group input {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input__group input:focus {
  border-color: #f2d457;
}

/* 버튼 그룹 */
.button__group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.save__button {
  flex: 2;
  height: 50px;
  background-color: #f2d457;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  transition: opacity 0.2s;
}

.reset__button {
  flex: 1;
  height: 50px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.save__button:hover {
  opacity: 0.9;
}

.reset__button:hover {
  background-color: #e5e7eb;
}
</style>
