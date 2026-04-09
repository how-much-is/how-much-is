<template lang="">
  <div>
    <h1>Setting</h1>
    <button @click="saveUser">저장</button>
    <button @click="resetUser">취소</button>
    <button >로그인하기</button><br />
    <div class="">
    <label for="username">사용자 이름</label><br />
    <input id="username" type="text" v-model="user.username" />
    </div>
    <hr />
    <div class="">
    <label for="password">비밀번호</label><br />
    <input id="password" type="text" v-model="user.password">
    </div>
    <div class="">
    <label for="email">email</label><br/>
    <input id="email" type="text" name="email" v-model="user.email"></input>
    </div>
    <div class="">
      <label for="user_memo">Memo</label><br/>
      <input id="user_memo" type="text" name="user_memo"></input>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from "vue";

const user = ref({
  username:"",
  password:"",
  email:""
})

const originalUser = ref({})

onMounted(async()=> {
  const res = await axios.get("")

  user.value = res.data;
  originalUser.value = {...res.data}
})

const saveUser = async() => {
  await axios.put("", user.value)

  originalUser.value = {...user.value}

  alert('저장 완료')
}

const resetUser = () => {
  user.value = {...originalUser.value}
}
</script>

<style lang=""></style>
