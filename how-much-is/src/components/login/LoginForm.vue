<template>
  <div class="login__container">
    <!-- <header class="login__header">
      <p>로그인 화면</p>
    </header> -->
    <main class="login__card">
      <div class="title__section">
        <h2>로그인</h2>
        <div class="yellow__underline"></div>
      </div>

      <form class="login__form">
        <div class="input__group">
          <label for="email">이메일 주소</label>
          <input
            type="email"
            id="email"
            v-model="userEmail"
            placeholder="이메일 주소를 입력하세요"
          />
        </div>

        <div class="input__group">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            v-model="userPassword"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button type="button" class="login__button" @click="handleLogin">
          Login
        </button>

        <p class="register__text">
          계정이 없으신가요?
          <!-- <a href="#" class="register__link">회원가입</a> -->
          <router-link to="/registerform" class="register__link"
            >회원가입</router-link
          >
        </p>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useLoginStore } from '@/stores/login';
import { useRouter } from 'vue-router';

const userEmail = ref('');
const userPassword = ref('');

const router = useRouter();
const loginStore = useLoginStore();
const userInputId = ref('');

// const handleNumberOnly = (event) => {
//   const onlyNumbers = event.target.value.replace(/[^0-9]/g, '');
//   userPassword.value = onlyNumbers;
//   event.target.value = onlyNumbers;
// };

const handleLogin = async () => {
  // 1. 둘 다 비어있을 때
  if (!userEmail.value && !userPassword.value) {
    alert('이메일과 비밀번호를 모두 입력해 주세요!');
    return;
  }

  // 2. 이메일만 비어있을 때
  if (!userEmail.value) {
    alert('이메일 주소를 입력해 주세요!');
    return;
  }

  // 3. 비밀번호만 비어있을 때
  if (!userPassword.value) {
    alert('비밀번호를 입력해 주세요!');
    return;
  }

  // 4. 둘 다 입력되었을 때
  try {
    // 이메일과 비밀번호가 모두 일치하는 사람 찾기
    const response = await axios.get(
      `http://localhost:3000/users?email=${userEmail.value}&password=${userPassword.value}`,
    );

    if (response.data.length > 0) {
      // 일치하는 사람이 있다면 로그인
      const loggedInUser = response.data[0];
      alert('로그인 성공');

      loginStore.login(loggedInUser.email);
      router.push('/'); // 메인 페이지로 이동
    } else {
      alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  } catch (e) {
    console.error('에러');
  }
};
</script>

<style scoped>
.login__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Noto Sans KR', sans-serif;
}

.login__header {
  margin-bottom: 20px;
  color: #999;
  font-size: 18px;
}

.login__card {
  width: 90%;
  max-width: 350px;
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.title__section {
  text-align: center;
  margin-bottom: 40px;
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

.login__form {
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
}

.input__group input[type='password'] {
  border-color: #e5e7eb;
}

.login__button {
  margin-top: 10px;
  height: 50px;
  background-color: #f2d457;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
}

.register__text {
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  color: #9ca3af;
}

.register__link {
  color: #f2d457;
  text-decoration: none;
  font-weight: bold;
  margin-left: 5px;
}

.register__link:hover {
  text-decoration: underline;
}
</style>
