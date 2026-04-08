<template>
  <header class="header">
    <div class="header-container">
      <div class="logo">
        <h1>얼마남았조</h1>
      </div>

      <nav class="nav">
        <ul>
          <li><a href="#" class="nav-item">Home</a></li>
          <li><a href="#" class="nav-item">월간리포트</a></li>
          <li><a href="#" class="nav-item">카테고리</a></li>
          <li><a href="#" class="nav-item">Settings</a></li>
        </ul>
      </nav>

      <div class="header-right"></div>
    </div>
  </header>
</template>

<script setup>
/**
 * KB 스켈레톤 가이드의 프로젝트 주제인 '가계부 서비스 앱'을 위한 헤더입니다[cite: 5, 10].
 * 2026년 상반기 K-디지털 트레이닝 과정의 일환으로 제작되었습니다[cite: 4].
 */
</script>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  border-bottom: 2px solid #f2d457; /* KB금융그룹 시그니처 옐로우 포인트 [cite: 2] */
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  width: 90%;
  max-width: 1440px; /* 요청하신 이미지의 가로 폭 반영 */
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center; /* 메뉴를 가운데로 정렬 */
  position: relative; /* 로고의 절대 위치 기준 */
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

/* 네비게이션 메뉴 스타일 */
.nav ul {
  list-style: none;
  display: flex;
  gap: 40px; /* 메뉴 사이 간격을 조금 더 넓게 조정 */
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

/* 마우스 호버 및 활성화 포인트 */
.nav-item:hover {
  color: #f2d457;
}

.header-right {
  position: absolute;
  right: 0;
  display: flex;
  gap: 15px;
}

/* 반응형 웹 대응 [cite: 34] */
@media (max-width: 1024px) {
  .nav ul {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .header-container {
    justify-content: flex-end; /* 모바일에서는 로고 옆으로 메뉴 이동 */
  }

  .logo {
    position: static; /* 모바일에서는 순서대로 배치 */
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
