<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <h1>얼마남았조</h1>
      </div>

      <nav class="nav">
        <ul>
          <li>
            <router-link to="/" class="nav-item">Home</router-link>
          </li>
          <li>
            <router-link to="/monthly" class="nav-item">월간리포트</router-link>
          </li>
          <li>
            <router-link to="/login" class="nav-item">카테고리</router-link>
          </li>
          <li>
            <router-link to="/transaction" class="nav-item"
              >거래 내역</router-link
            >
          </li>
          <li>
            <router-link to="/settings" class="nav-item">Settings</router-link>
          </li>
        </ul>
      </nav>

      <div class="header-right"></div>
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  border-bottom: 2px solid #f2d457;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  width: 90%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo {
  position: absolute;
  left: 0;
}

.logo h1 {
  font-size: 24px;
  font-weight: 800;
  color: #333;
  margin: 0;
  cursor: pointer;
}

.logo h1::after {
  content: '.';
  color: #f2d457;
}

.nav ul {
  list-style: none;
  display: flex;
  gap: 40px;
  margin: 0;
  padding: 0;
}

.nav-item {
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  color: #555;
  transition: all 0.2s ease;
  padding: 10px 5px;
}

.nav-item:hover {
  color: #f2d457;
}

.header-right {
  position: absolute;
  right: 0;
  display: flex;
  gap: 15px;
}

@media (max-width: 1024px) {
  .nav ul {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .header-container {
    justify-content: flex-end;
  }

  .logo {
    position: static;
  }

  .nav {
    margin-left: auto;
  }

  .nav ul {
    gap: 10px;
  }

  .nav-item {
    font-size: 13px;
  }
}
</style>
