<template>
  <div class="register-container">
    <header class="register-header">
      <p>회원가입 화면</p>
    </header>

    <main class="register-card">
      <div class="title-section">
        <h2>회원가입</h2>
        <p class="subtitle">정보를 입력하여 가입을 진행해 주세요</p>
        <div class="yellow-underline"></div>
      </div>

      <form class="register-form">
        <div class="input-group">
          <label for="name">이름</label>
          <input
            type="text"
            id="name"
            v-model="userName"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div class="input-group">
          <label for="email">이메일 주소</label>
          <input
            type="email"
            id="email"
            v-model="userEmail"
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div class="input-group">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            v-model="userPassword"
            @input="handleNumberOnly"
            placeholder="비밀번호를 입력하세요"
            inputmode="numeric"
          />
        </div>

        <button type="button" class="register-button" @click="handleRegister">
          가입하기
        </button>

        <p class="login-text">
          이미 계정이 있으신가요? <a href="#" class="login-link">로그인</a>
        </p>
      </form>
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 20px;
}

.register-header {
  margin-bottom: 20px;
  color: #999;
  font-size: 18px;
}

.register-card {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 40px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.title-section {
  text-align: center;
  margin-bottom: 30px;
}

.title-section h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 8px;
  font-weight: 700;
}

.subtitle {
  color: #888;
  font-size: 14px;
  margin-bottom: 15px;
}

.yellow-underline {
  width: 60px;
  height: 3px;
  background-color: #f2d457;
  margin: 0 auto;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-group label {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  text-align: left;
}

.input-group input {
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
}

.input-group input:focus {
  border-color: #f2d457;
}

/* 회원가입 버튼 */
.register-button {
  margin-top: 10px;
  height: 55px;
  background-color: #f2d457;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
}

.login-text {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #888;
}

.login-link {
  color: #f2d457;
  text-decoration: none;
  font-weight: 700;
  margin-left: 5px;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
